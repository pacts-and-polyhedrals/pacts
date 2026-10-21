# Storefront static site — deploy with caution

This folder is the full Pacts & Polyhedrals website (not just a fragment). Upload its **contents** to the root of the public GitHub repository `pacts-and-polyhedrals/pacts` to preserve existing pages/products.

Added public pages: `the-smoke.html`, `library.html`, `thanks.html`, `feedback.html`, `admin.html` and draft `legal/*.html`; public styles and scripts in `assets/shop/`. All original `assets/` have been retained. The Smoke brand files are public promotional images only, not the commercial Foundry ZIP.

**Important:** `assets/shop/config.js` deliberately has a blank `window.PACTS_STORE_API`. Once your test Cloudflare Worker has been deployed, set this variable to the Worker `https://<name>.<account>.workers.dev` URL (never insert Stripe/Resend/Cloudflare secrets). Without it the purchase button remains disabled. Admin UI is publicly viewable HTML but its actions require BOTH a verified allowlisted backend identity and a separate secret; HTML cannot grant rights by itself.

Keep Stripe test keys, signing secrets and email keys in Cloudflare Worker Secrets, **not GitHub Pages**. Verify `LICENSE-COVENANT.txt` rights, beta/refund terms, tax duties, and actual Foundry/Forge compatibility before enabling paid orders. Do not publicise untested protected auto-updates.

The full-source ZIP contains `docs/01-DEPLOYMENT-GUIDE.md`, `docs/04-ACCEPTANCE-REPORT.md` and a separate Worker project.
