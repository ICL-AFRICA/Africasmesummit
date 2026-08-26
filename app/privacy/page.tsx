import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { EVENT } from "@/lib/event";

export const metadata: Metadata = {
  title: `Privacy — ${EVENT.name} ${EVENT.year}`,
  description: "How the Africa SME Summit collects, uses and stores the information you send through this site, and how to ask us to correct or delete it.",
  alternates: { canonical: "https://africasmesummit.com/privacy" },
};

/* A privacy page is not optional once you run Google or Meta ads — both
   platforms require one before they will approve a campaign. This is a
   plain-language draft and should be reviewed by ICL before launch.

   REWRITTEN 26 AUGUST 2026, when the Meta Pixel was added. Before that the
   site made no third-party requests at all and this page could say so. It
   cannot now, and the sections below have to keep pace with what the site
   actually loads — if a tracker is ever added or removed, this text changes
   in the same commit. A privacy notice that describes the wrong site is
   worse than a short one. */
const SECTIONS = [
  {
    h: "What we collect",
    p: `When you fill in a form on this site we receive what you typed into it — your name, your email, a phone number, an organisation or institution where the form asks for one, and your message. Separately, an advertising tool described below records that a page was visited. Beyond those two things, this website collects nothing about you.`,
  },
  {
    h: "Advertising and measurement",
    p: `This site loads the Meta Pixel, a piece of Facebook's advertising technology. It tells Meta which pages were viewed and sets cookies in your browser so that Meta can recognise the same browser again. We use it to measure whether our advertising is reaching people and to show the summit to people like those already interested. It runs on every page. You can stop it: block third-party cookies or trackers in your browser, use an ad or tracker blocker, or adjust what Meta is allowed to do with your activity in your Facebook or Instagram ad settings. Nothing on this site stops working if you do.`,
  },
  {
    h: "What we do with it",
    p: `We use what you send us to reply to you and to organise the summit. If you register for a ticket, that transaction happens on TikoHub under its own terms and we receive your name and contact details for the delegate list. Payment details never reach this website.`,
  },
  {
    h: "Who else sees it",
    p: `Three companies process information on our behalf, all of them outside Kenya: Formspree receives form submissions, Vercel hosts the site and keeps standard server logs including IP addresses, and Meta receives the page-view information described above. Ticketing is handled by TikoHub.`,
  },
  {
    h: "What we do not do",
    p: "We do not sell your information and we do not pass it to sponsors, exhibitors or partners without asking you first.",
  },
  {
    h: "How long we keep it",
    p: "Enquiry messages are kept for two years so we can pick up a conversation where it left off. Ask us to delete yours at any time and we will.",
  },
  {
    h: "Photography at the summit",
    p: "The summit is photographed and filmed for reporting and future promotion. If you would prefer not to appear, tell the registration desk on the day and we will note it.",
  },
  {
    h: "Getting in touch",
    p: `Email ${EVENT.email} with any question about your information, including a request to see it, correct it, or have it deleted.`,
  },
];

export default function Privacy() {
  return (
    <PageShell
      current="/privacy"
      eyebrow="Privacy"
      title="What we do with your information"
      lede="Short version: we use it to reply to you and to run the summit, and we do not sell it."
    >
      <section>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 py-16 sm:py-20">
          <div className="max-w-3xl border-t border-line">
            {SECTIONS.map((s) => (
              <div key={s.h} className="py-8 border-b border-line">
                <h2 className="h-sm text-white text-xl">{s.h}</h2>
                <p className="lede mt-3 text-[17px] text-white">{s.p}</p>
              </div>
            ))}
            <p className="mt-8 font-mono text-[12px] text-white">
              Draft — to be reviewed by {EVENT.host} before launch.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
