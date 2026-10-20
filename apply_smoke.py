from pathlib import Path
import sys

path = Path(sys.argv[1]) if len(sys.argv)>1 else Path('index.html')
text = path.read_text(encoding='utf-8')
replacements = [
('Pacts & Polyhedrals by DM Asmo — Wyvern Chess, DM LM Pro, Downtime Master, premium online D&D games', 'Pacts & Polyhedrals by DM Asmo — The Smoke, Wyvern Chess, DM LM Pro, Downtime Master, premium online D&D games'),
('Pacts and Polyhedrals, DM Asmo, Wyvern Chess, DM LM Pro', 'Pacts and Polyhedrals, DM Asmo, The Smoke, London crime TTRPG, Wyvern Chess, DM LM Pro'),
('Home of Wyvern Chess, DM LM Pro, Downtime Master, professional online D&D games', 'Home of The Smoke, Wyvern Chess, DM LM Pro, Downtime Master, professional online D&D games'),
('<p>Explore the released Pacts & Polyhedrals projects: a browser-playable fantasy strategy game, a Foundry VTT lighting control centre, and a complete D&D 5e downtime system.</p>', '<p>Explore original tabletop and browser games alongside GM-ready Foundry VTT tools, including The Smoke, Wyvern Chess, DM LM Pro, and Downtime Master.</p>'),
('<section class="section" id="products">\n      <div class="wrap">\n        <div class="section-head">\n          <h2>Finished products</h2>', '<section class="section" id="products">\n      <div class="wrap">\n        <div class="section-head">\n          <h2>Games &amp; products</h2>'),
('        <div class="grid3">\n          <article class="service"><div class="icon">♞</div><h3>Wyvern Chess</h3>', '        <div class="grid2">\n          <article class="service"><div class="icon">♞</div><h3>Wyvern Chess</h3>'),
('''<article class="service"><div class="icon">⏳</div><h3>Downtime Master</h3><p>A comprehensive downtime management system for D&D 5e in Foundry VTT, built to keep players engaged between sessions while giving GMs review, sync, and world-management tools.</p><ul class="list"><li>Requests, crafting, training, resources, and history</li><li>37+ factions, 90+ harvesting tables, and 799 blueprints</li><li>Install from Foundry's module search or paste the manifest URL from the README.</li></ul><br><button class="btn ghost" type="button" data-readme="downtime">Read Downtime Master README</button></article>''', '''<article class="service"><div class="icon">⏳</div><h3>Downtime Master</h3><p>A comprehensive downtime management system for D&D 5e in Foundry VTT, built to keep players engaged between sessions while giving GMs review, sync, and world-management tools.</p><ul class="list"><li>Requests, crafting, training, resources, and history</li><li>37+ factions, 90+ harvesting tables, and 799 blueprints</li><li>Install from Foundry's module search or paste the manifest URL from the README.</li></ul><br><button class="btn ghost" type="button" data-readme="downtime">Read Downtime Master README</button></article>
          <article class="service"><div class="icon" aria-hidden="true">🚕</div><h3>The Smoke</h3><p>A gritty, open-world London crime TTRPG where even the smallest job can reshape the city. Take on risky work, build your street reputation, choose your allegiances, and stay ahead of the police.</p><ul class="list"><li>125 missions across 12 rival factions</li><li>20 connected London street maps, vehicle chases, and police Heat</li><li>Player rules, city atlas, and Foundry VTT resources</li></ul><br><a class="btn ghost" href="https://pacts-and-polyhedrals.github.io/the-smoke-web/" target="_blank" rel="noopener noreferrer">Explore The Smoke</a></article>'''),
('home to <strong>Wyvern Chess</strong>, <strong>DM LM Pro</strong>, and <strong>Downtime Master</strong>.', 'home to <strong>The Smoke</strong>, <strong>Wyvern Chess</strong>, <strong>DM LM Pro</strong>, and <strong>Downtime Master</strong>.'),
('<li><a href="https://pacts-and-polyhedrals.github.io/wyvern-chess/" target="_blank" rel="noopener">Play: Wyvern Chess</a></li>', '<li><a href="https://pacts-and-polyhedrals.github.io/wyvern-chess/" target="_blank" rel="noopener">Play: Wyvern Chess</a></li>\n            <li><a href="https://pacts-and-polyhedrals.github.io/the-smoke-web/" target="_blank" rel="noopener noreferrer">Explore: The Smoke</a></li>')
]
if 'id="products"' not in text:
    raise SystemExit('Error: this is not the expected site index.html')
if 'Explore The Smoke</a>' in text:
    raise SystemExit('The Smoke is already present; no changes made.')
for i,(old,new) in enumerate(replacements,1):
    if text.count(old) != 1:
        raise SystemExit(f'Update stopped: expected one match for change {i}, found {text.count(old)}. No file was modified.')
    text=text.replace(old,new,1)
path.with_suffix('.html.backup').write_text(path.read_text(encoding='utf-8'),encoding='utf-8')
path.write_text(text,encoding='utf-8')
print(f'Updated {path} and saved backup.')
