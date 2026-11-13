/* Rewind & Renew — site configuration.
   Edit this file to reuse the site each year. */
window.RR_CONFIG = {
  // The year being reflected on. Leave null to use the current year
  // (during January 1–14 it keeps showing the year that just ended).
  year: null,

  // When the experience opens (month is 0-based: 11 = December).
  opens: { month: 11, day: 29 },

  // Shown in copy as the "end of the year" moment.
  newYearsEve: { month: 11, day: 31 },

  // If true, before the opening date the Begin button is replaced by an
  // "opens on…" notice, with a quiet "Take an early look" option.
  enforceOpenDate: true,

  // Optional: URL of a writing service (see README). When null, stories are
  // written on this device from the person's own words and nothing is sent anywhere.
  aiEndpoint: null,

  // The founder's note that appears once, the first time someone opens the site each year.
  // Add your name and role to sign it. If name is null it is signed "The Rewind & Renew team".
  founder: { enabled: true, name: null, role: 'Founder' },

  // Shown on the Privacy Policy and Terms pages.
  operatorName: 'Rewind & Renew',
  ownerName: 'Kevin Jojo',        // the person responsible for this site; shown in the Privacy Policy and Terms
  siteAddress: 'kevinjojo.in/Rewind/', // where the site is hosted
  hostName: 'Netlify',            // the company that serves the site (named in the Privacy Policy). Set null if unknown.
  governingLaw: 'India',          // used in the Terms. Ask a lawyer to confirm the wording. Set null to omit.
  contactEmail: null,            // e.g. 'hello@yourdomain.com'. Leave null to omit a contact line.
  policyUpdated: 'November 11, 2026',

  // Optional AI images via ElevenLabs. Served by server.js, which keeps your API key
  // secret. When the server has a key, AI images are used automatically (with a visible
  // notice and a "use a drawn image instead" choice). If the server has no key, or this
  // site is hosted statically, the feature stays hidden and the drawn images are used.
  // Set null to remove the feature and its privacy wording completely.
  imageEndpoint: null,   // relative, so it also works when the site lives in a folder such as /Rewind/

  storageKey: 'rewind-and-renew'
};
