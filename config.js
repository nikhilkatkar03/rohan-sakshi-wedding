/* ============ EDIT YOUR WEDDING DETAILS HERE ============ */
const CONFIG = {
  groom: "Rohan", bride: "Sakshi",
  start: "2026-12-02T12:30:00+05:30",   // ceremony, IST (UTC+05:30)
  dateLabel: "Wednesday, 2 December 2026",
  timeLabel: "12:30 PM IST",
  venueName: "",                         // e.g. "Hall name" — leave empty until confirmed
  address: "",                           // full street address — leave empty until confirmed
  area: "Parali, Beed, Maharashtra, India",
  mapQuery: "",                          // optional exact Google Maps search; empty = general area search
  durationMinutes: 120,                  // calendar block only; not a confirmed end time
  siteUrl: "",                           // published URL; empty = current page address
  musicUrl: "",                          // path/URL of an audio file; empty = no player
  rsvpEndpoint: "",                      // form service URL (e.g. Formspree); empty = RSVP hidden
  reception: null,                       // e.g. {title:"Reception", date:"…", time:"…", venue:"…"}
  story: [],                             // [{title:"How we met", text:"…"}, …]
  gallery: []                            // [{src:"photos/1.jpg", alt:"Engagement"}, …]
};
