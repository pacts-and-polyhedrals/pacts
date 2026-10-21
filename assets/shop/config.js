/* PUBLIC CONFIGURATION ONLY: the API endpoint is not a secret.
   Set after deploying your Cloudflare Worker:
   window.PACTS_STORE_API = 'https://pacts-digital-store-test.YOUR-SUBDOMAIN.workers.dev';
   Never place Stripe, Resend, Cloudflare R2 or admin keys in this file. */
window.PACTS_STORE_API = '';

/* VISUAL ONLY: public launch announcement stays closed until explicitly changed.
   Actual payment authorization is enforced by CHECKOUT_ENABLED=false on the Worker. */
window.PACTS_STORE_COMING_SOON = true;
