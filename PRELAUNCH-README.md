# The Smoke — Coming Soon public websites

Upload the **contents** of `pacts/` and `smoke-site/` to their respective existing GitHub repositories, preserving the Smoke website `CNAME` file if already configured. This is a content and checkout-button state adjustment, not a live payment activation.

- The main store is planned to be $5 for the first 100 Founders but public sales are not open.
- The promotional site now consistently links to the product information page without inviting an immediate purchase.
- `pacts/assets/shop/config.js` contains `window.PACTS_STORE_COMING_SOON = true;`. Keep it set to `true` while the game remains unreleased.
- **Critical server-side safety:** Cloudflare Worker `CHECKOUT_ENABLED = "false"` remains the authoritative control. The browser flag is only for presentation and is not security.
- To open public sales later you must review licensing/legal/tax, test Stripe and the real release, set the browser flag to `false`, AND explicitly enable payments server-side with the correct environment and keys. Do not flip either flag now.
- This package contains no paid Foundry ZIP and no private keys.
