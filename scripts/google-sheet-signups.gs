/**
 * Africa SME Summit — saves every website form to a Google Sheet.
 *
 * ONE-TIME SETUP (about 5 minutes, signed in to the Google account that should own the data):
 *   1. Go to script.google.com → New project (or open Extensions → Apps Script
 *      from a Google Sheet you already made — either works). Delete what is
 *      there, paste this whole file, and press Save (the disk icon, or Ctrl+S).
 *   2. (Optional) Put the email addresses that should be told about each new
 *      sign-up in NOTIFY_EMAILS below, separated by commas.
 *   3. If the project is NOT attached to a sheet, press Run on the function
 *      "setup" (top bar, pick "setup" in the dropdown first) and approve the
 *      permissions Google asks for ("Advanced → Go to project" is normal for
 *      your own script). It creates the spreadsheet "Africa SME Summit –
 *      sign-ups" in your Google Drive and prints its address in the log.
 *   4. Deploy → New deployment → the gear icon → "Web app".
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      Click Deploy (approve permissions again if asked).
 *   5. Copy the "Web app URL" (it ends in /exec) and send it to whoever
 *      maintains the website: it goes in SIGNUP_ENDPOINT in lib/event.ts.
 *      Opening that URL in a browser should say "...receiver is running".
 *
 * WHAT IT DOES: each form on the site becomes its own tab in the spreadsheet
 * (the ticket sign-up, the contact form, exhibitor and partner enquiries...).
 * The first column is the time received, in Nairobi time; the other columns
 * are the form's own fields. New fields add new columns by themselves. Nothing
 * here ever deletes or overwrites a row.
 *
 * IF YOU CHANGE THIS SCRIPT later: Deploy → Manage deployments → pencil →
 * Version: "New version" → Deploy. The URL stays the same. Saving alone does
 * not update the live copy.
 */
const NOTIFY_EMAILS = ""; // e.g. "sharon@africasmesummit.com, communications@ichooselife.or.ke"

const TIME_COL = "Received (Nairobi)";
const SHEET_NAME = "Africa SME Summit – sign-ups";

/**
 * The spreadsheet the rows go into. If this script was opened from a sheet
 * (Extensions → Apps Script) that sheet is used. Otherwise the script makes its
 * own on first use, remembers it, and keeps using it.
 */
function spreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty("SHEET_ID");
  if (id) return SpreadsheetApp.openById(id);
  const made = SpreadsheetApp.create(SHEET_NAME);
  props.setProperty("SHEET_ID", made.getId());
  return made;
}

/** Run this once by hand (see the setup steps) to create the sheet and see where it is. */
function setup() {
  const ss = spreadsheet_();
  Logger.log("Sign-ups are saved in: " + ss.getUrl());
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return reply_({ ok: false, error: "Could not read the form." });
  }
  if (body._gotcha) return reply_({ ok: true }); // a bot filled the hidden trap field

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const tabName = String(body.form || "Enquiries").replace(/[\[\]*\/\\?:]/g, " ").trim().slice(0, 90) || "Enquiries";
    const values = {};
    Object.keys(body).forEach(function (k) {
      if (k === "form" || k === "_gotcha" || k === "_subject") return;
      const v = body[k];
      values[k] = String(Array.isArray(v) ? v.join(", ") : v == null ? "" : v).slice(0, 2000);
    });

    const ss = spreadsheet_();
    const sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);
    const headers = sheet.getLastColumn() > 0
      ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].filter(String)
      : [TIME_COL];
    if (headers.indexOf(TIME_COL) < 0) headers.unshift(TIME_COL);
    Object.keys(values).forEach(function (k) { if (headers.indexOf(k) < 0) headers.push(k); });

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);

    const row = headers.map(function (h) {
      return h === TIME_COL
        ? Utilities.formatDate(new Date(), "Africa/Nairobi", "yyyy-MM-dd HH:mm:ss")
        : (values[h] === undefined ? "" : values[h]);
    });
    // Plain text, so a phone number like +254717605151 is not turned into a number.
    sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setNumberFormat("@").setValues([row]);

    if (NOTIFY_EMAILS) {
      try {
        MailApp.sendEmail(
          NOTIFY_EMAILS,
          "New " + tabName + ": " + (values["Full name"] || values["Your name"] || values["Name"] || values["Email"] || "website form"),
          headers.map(function (h, i) { return h + ": " + row[i]; }).join("\n") + "\n\nSpreadsheet: " + ss.getUrl()
        );
      } catch (mailErr) { /* the row is saved; a mail problem must not fail the form */ }
    }
    return reply_({ ok: true });
  } catch (err) {
    return reply_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Opening the web app URL in a browser shows this, which is how you check it is live.
function doGet() {
  return ContentService.createTextOutput("Africa SME Summit sign-up receiver is running.");
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
