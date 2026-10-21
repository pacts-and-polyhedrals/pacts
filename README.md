# THE SMOKE - Pacts & Polyhedrals Website v1.5

A **standalone six-page website dedicated exclusively to The Smoke** tabletop roleplaying game.

The Smoke is created by **Pacts & Polyhedrals**, with game design by Benjamin Vale. This website uses actual vector faction emblems, illustrated London maps, venue maps, player rulebook and game data from the supplied **The Smoke v0.5.6 Foundry development package** and the **Homebrewery v0.5.0 player book**.

## Opening locally

Unzip the folder. Double-click `index.html`. The whole public site works as static HTML/CSS/JS with no build system, analytics or external dependencies. Links to the existing GitHub project and to real radio station homepages need an internet connection.

If your browser restricts local files, serve the directory in a terminal:

```
python -m http.server 8080
```

Then visit http://localhost:8080

## Deploying

Upload the *contents* of this folder (the file `index.html` at the repository root) to a new dedicated GitHub Pages repository or any static host (Cloudflare Pages, Netlify, etc.). **Do not upload this website into the Foundry system distribution repository unless you deliberately want to mix releases and web content.**

GitHub Pages example: create a new repository named `the-smoke-website`, upload all files, then under Settings → Pages choose Deploy from a branch → `main` → `/ (root)`.

There is **no invented signup backend**, no user login, no purchases, no database, no radio stream bundled, and no claims that a local Foundry build is already published. The Blower is an informational demo.

## New official visual branding (website v1.3)

The site now uses the **approved diamond logo** from the website and complete editable branding pack created for The Smoke, not the older placeholder mark. The correct mint-outlined diamond, zigzag route and pink diamond appear in the header, footer and favicon. All logo variants and the three promotional SVG graphics have been copied to `assets/brand/`, together with PNG export versions for printing/social use.

- `assets/brand/logos/` — symbol-only, horizontal and stacked lockups, wordmark-only, one-colour variant and corrected favicon, each as SVG and PNG.
- `assets/brand/graphics/` — 01 *The City Is the Board* (landscape), 02 *Nick a Bike, Make a Name* (portrait), 03 *The Blower* (square), each as SVG and PNG.
- Header: symbol-only + wordmark; footer: official full horizontal logo; browser tab: corrected favicon.
- Homepage: three clickable illustrations lead to city, missions and play.
- City, missions and play pages: each features its corresponding illustration with a contextual link or working interactive Blower preview.

The website is **v1.5**. Its gameplay data was sourced from the Foundry **v0.5.6** development package; Foundry **v0.5.7** is a separate, newer beta build in the project archive. Images are served locally from the same folder, with no external fonts, image CDN or third-party scripts required.

## Pages

- `index.html` — branded landing page, 3-image interactive campaign artwork, city/crew overview, interactive Heat demo.
- `city.html` — actual 20-zone interactive atlas, official city branding graphic and venue interiors.
- `factions.html` — twelve genuine faction emblems, descriptions, patrons and dossier overlays.
- `rules.html` — stats, exact d6 Effort + exploding stat die test roll and outcomes, driving/Heat/Rep primer, taxi and GM travel options.
- `missions.html` — The Chainring graphic and publicly safe teaser board (15 selected jobs), without GM-only campaign spoilers.
- `play.html` — The Blower branding graphic and interactive Blower preview, player book resource, Foundry project and compatibility notes.

## Travel in The Smoke

There is **no blanket ban on fast travel**. Characters can travel across the connected streets on foot, by bicycle, in their own vehicle, or by taking a taxi. The GM has control of **fast travel for any vehicle** and can choose to move a journey along when playing out every road section is unnecessary. When a journey is played in detail, the connected streets, sat nav, vehicle rules and pursuits still matter. The public website describes these options rather than implying every trip must be simulated.

## Editing

- Main visual styles: `css/site.css`.
- Interactions: `js/site.js`.
- Game data: `js/content.js` (generated from the game, but human-editable JavaScript).
- Copy and page structure: the six HTML files.
- Game artwork: `assets/`. The original city/faction art is supplied as web-sized exports from Foundry; official branding SVGs and large PNGs are kept intact in `assets/brand/`.
- Source player book: `downloads/The-Smoke-Player-Rulebook-Homebrewery.txt`.

## Disclosure / versioning

The local Foundry **v0.5.6** ZIP used as a source for this site was described as release-ready but *not yet confirmed published or live-tested*. The project has since produced a separate **v0.5.7 beta** build; this website does not claim that either version is published. The website links to the GitHub **releases listing** instead of claiming that version is installed. The public player book remains the **v0.5.0 Homebrewery edition**.

The currently shipped Foundry self-play mode requires an **online active GM client** for world state. The site does not imply autonomous online hosting or fully automatic NPC conversations. `125` jobs counts 12 opening + 93 further faction commissions + 20 local cases.

## Legal / credits

The Smoke: Created by Pacts & Polyhedrals. Game design: Benjamin Vale. Covenant Dice System © 2026 Dracouroboros Ltd., Benjamin Vale and Paige Kibodeaux; all rights reserved. Foundry VTT is a trademark of Foundry Gaming LLC. Icon artwork includes game-icons.net contributions under CC BY 3.0 when used. Radio links point to independent broadcasters; no stream is bundled.

All real location names and geography are used in an invented tabletop game; venue interiors, companies and crimes are fictional and do not describe real locations or organisations.

Only player-facing material is intentionally in the deployable site. **Do not publicly add or link the GM-only Campaign Book or GM journal datasets** if you want players to discover the mystery in play.


## v1.4 website update
- Added recreated Blower and London watch interface assets to the website.
- New PNG assets live in `assets/brand/graphics/04-The-Blower-Live-Dashboard.png` and `assets/brand/graphics/05-The-Smoke-Watch-Display.png`.
- Homepage and `play.html` now showcase these interface visuals in relevant sections.


## v1.5 - Beta testing status and official studio links

- The Smoke is **currently in beta testing**. Every page carries a visible beta status notice linking to the dedicated explanation on `play.html#beta-status`. The homepage, major page introductions, player resource copy, Foundry release card, player FAQ and search/social descriptions reflect the same status.
- Beta copy does **not** claim that the game is finished or that every release is published. GitHub release availability must be checked at the source. The website and the promotional assets remain independent of the Foundry runtime.
- The footer of all six pages now links to the official [Pacts & Polyhedrals website](https://pacts-and-polyhedrals.github.io/pacts) and [DM Asmo's StartPlaying GM profile](https://startplaying.games/gm/dmasmo). The latter is a general GM profile; no Smoke beta session availability is implied.
- The new website archive is version **v1.5**; the previous **v1.4** folder is preserved unchanged.


## v1.6 — Founders Beta storefront handoff
The public Smoke website remains a separate six-page promotional site. A persistent beta offer strip, header link, homepage CTA, Get Playing feature and footer link now lead to the official Pacts & Polyhedrals product page at https://pacts-and-polyhedrals.github.io/pacts/the-smoke.html. This site does not contain payment credentials, paid release ZIPs, buyer data or entitlement logic. Pricing and availability are determined by the secure Worker, never the marketing site. Do not publish the Founders Beta as live before the studio approves licensing/terms/testing.
