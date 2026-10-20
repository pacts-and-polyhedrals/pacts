THE SMOKE - PACTS WEBSITE PRODUCT UPDATE

The connected GitHub account currently lacks write permission for pacts-and-polyhedrals/pacts.
The GitHub API rejected an update with HTTP 403. No live website files were changed.

To update:
1. Download index.html from https://github.com/pacts-and-polyhedrals/pacts
2. Put index.html next to apply_smoke.py in a folder.
3. Run: python apply_smoke.py
4. The script writes updated index.html and keeps index.html.backup.
5. Upload the updated index.html back to the root of the pacts repository on its main branch.

Change summary:
- Adds The Smoke as a fourth product using the existing styling.
- Links its 'Explore The Smoke' button to https://pacts-and-polyhedrals.github.io/the-smoke-web/
- Uses a balanced 2-column products grid on desktop (existing responsive mobile layout retained).
- Updates metadata, products heading, intro copy, and useful links.

The updater expects the version of index.html inspected on October 19, 2026.
If the file has changed since then, the updater will stop without modifying it rather than risk a bad change.
