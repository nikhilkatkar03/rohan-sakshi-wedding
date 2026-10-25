# Rohan & Sakshi wedding invitation

Static site: no build step.

## Files
- index.html  page structure
- styles.css  design
- config.js   ALL wedding details (edit this)
- app.js      countdown, calendar, sharing, RSVP, music
- cover.jpg   (add yourself) link-preview image, 1200x630
- photos/     (add yourself) gallery images

## Run locally
python3 -m http.server 8000   # then open http://localhost:8000

## Deploy to Cloudflare Pages
npx wrangler pages deploy . --project-name=rohan-sakshi
(or drag this folder into Workers & Pages > Pages > Upload assets)

## Change details (config.js)
venueName, address, mapQuery, siteUrl, musicUrl, rsvpEndpoint,
reception, story, gallery. Leave empty to keep sections hidden.
