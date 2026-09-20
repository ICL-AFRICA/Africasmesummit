# public/img/updates/

Photos for the /press activity feed (`SUMMIT_UPDATES` in `lib/event.ts`).

**How to add one:**
1. Drop the photo file in this folder — `.webp` preferred (matches the rest
   of the site), `.jpg` is fine too.
2. In `lib/event.ts`, add a `media` field to the relevant entry in
   `SUMMIT_UPDATES`:
   ```ts
   media: { type: "image", src: "/img/updates/your-file.webp", alt: "Describe what's in the photo" },
   ```
3. Always write real `alt` text — it's the only description a screen
   reader gets, and it's what shows if the image fails to load.

**Sizing:** cards render the photo at a fixed 16:9 box, so crop or pick
photos that read fine cropped that way. Keep files reasonably small (under
~150KB, same range as the hero photography) so the page stays fast — the
`img/hero/*.webp` files are a good size reference.
