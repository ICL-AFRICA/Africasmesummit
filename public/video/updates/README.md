# public/video/updates/

Clips for the /press activity feed (`SUMMIT_UPDATES` in `lib/event.ts`).

**How to add one:**
1. Drop the clip in this folder as `.mp4` (H.264) — the format every
   browser plays natively, no extra library needed.
2. Drop a still frame from the same clip in this folder too (`.webp` or
   `.jpg`) — this is the `poster`, what shows before anyone presses play.
   Without it the card shows a black box until the video is clicked.
3. In `lib/event.ts`, add a `media` field to the relevant entry in
   `SUMMIT_UPDATES`:
   ```ts
   media: {
     type: "video",
     src: "/video/updates/your-clip.mp4",
     poster: "/video/updates/your-clip-poster.webp",
   },
   ```

**Sizing:** this is a static-export site with no video transcoding step, so
what you drop here is exactly what ships. Keep clips short (well under a
minute) and compressed — a phone visitor is paying for every megabyte on
mobile data. If a clip is much bigger than a few MB, compress it before
adding it here rather than after.
