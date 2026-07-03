(function(){
  const readmes = {
    dmlm: {
      title: 'DM LM Pro README',
      html: `
        <article class="readme">
          <h2>DM LM Pro — Light Manager</h2>
          <p><strong>A Foundry VTT Module for Dynamic Lighting</strong></p>
          <p><strong>Created by DM Asmo — Pacts & Polyhedrals</strong></p>
          <p>Free to use. Made with love for the TTRPG community.</p>

          <h3>What is DM LM Pro?</h3>
          <p>DM LM Pro (Light Manager) is a <strong>GM-only</strong> lighting control centre for Foundry VTT. It puts scene mood, token lights, and ambient light placement into one floating, draggable panel so you can change the entire feel of a map mid-session without ever opening the lighting layer or a config sheet.</p>

          <h3>Features</h3>
          <h4>Scene Mood</h4>
          <ul>
            <li><strong>11 Scene Presets</strong> — Daylight, Dawn, Dusk, Moonlight, Night, Dungeon, Storm, Hellfire, Fey Glow, Arcane, Horror</li>
            <li><strong>Smooth Fades</strong> — Shift-click any preset to fade over a configurable duration instead of snapping</li>
            <li><strong>Darkness Control</strong> — set any exact darkness with a synced slider + rotary knob and Apply</li>
            <li><strong>Global Light Toggle</strong> — flip scene-wide illumination independently</li>
            <li><strong>Blackout / Restore</strong> — drop to total darkness and bring it all back in one click</li>
            <li><strong>Reset to Day</strong> — instant return to bright, globally-lit</li>
          </ul>

          <h4>Token Lights</h4>
          <ul>
            <li><strong>5 Token Presets</strong> — Torch, Light, Lantern, Candle, Safe Darkness</li>
            <li><strong>Save & Restore</strong> — SEL ON/OFF and ALL ON/OFF remember each token's previous light via Foundry flags</li>
            <li><strong>Custom Token Light</strong> — build any light from scratch with rotary knobs for Bright, Dim, Alpha, Luminosity, colour, animation, speed, intensity, and reverse</li>
            <li><strong>4 Custom Slots</strong> — save and recall your own token-light builds</li>
          </ul>

          <h4>Ambient Lights</h4>
          <ul>
            <li><strong>14 Ambient Presets</strong> — Candle, Torch, Lantern, Campfire, Bonfire, Moonbeam, Holy, Infernal, Fey, Arcane, Portal, Darkness Zone, Void, and Lightning Flash</li>
            <li><strong>Click-to-Place</strong> — pick a preset, then click the map exactly where the light goes. Shift snaps to grid; Esc or right-click cancels.</li>
            <li><strong>Auto-Flash</strong> — Lightning drops instantly and removes itself after a beat</li>
            <li><strong>Delete All</strong> — clear every ambient light at once</li>
          </ul>

          <h4>Memory & Export</h4>
          <ul>
            <li><strong>3 Scene Memory Slots (A/B/C)</strong> — capture darkness, global light, and all ambient lights with positions</li>
            <li><strong>JSON Export</strong> — download a full backup of your presets and memory</li>
          </ul>

          <h3>Installation</h3>
          <p><strong>Method 1 — Manifest URL (recommended)</strong></p>
          <code>https://github.com/pacts-and-polyhedrals/dm-lm-pro/releases/latest/download/module.json</code>
          <p>Paste this into Foundry's <strong>Install Module</strong> dialog.</p>
          <p><strong>Method 2 — Manual</strong></p>
          <p>Download <strong>dm-lm-pro.zip</strong> from the latest release and unzip the <strong>dm-lm-pro/</strong> folder into your Foundry <strong>Data/modules/</strong> directory.</p>
          <p>Once enabled, GMs get a <strong>lightbulb</strong> button in the Lighting scene-control group. It can also be toggled from a macro or the console with:</p>
          <code>DMLM.toggle()</code>

          <h3>Requirements</h3>
          <ul>
            <li>Foundry VTT v13-v14 (verified on 14.359)</li>
            <li>Any game system — lighting is system-agnostic</li>
          </ul>

          <h3>Support & Community</h3>
          <p>This module is <strong>free</strong> and always will be. If you enjoy it and want to support continued development, support Pacts & Polyhedrals on Patreon or book one of DM Asmo's campaigns on StartPlaying.games.</p>

          <h3>Credits</h3>
          <p>Built by <strong>DM Asmo</strong> for the Pacts & Polyhedrals community. Companion module: <strong>DM DJ Pro</strong> — both panels can be open at once, each with its own toolbar button.</p>
          <p><em>Pacts & Polyhedrals is not affiliated with Wizards of the Coast.</em></p>

          <div class="readme-actions">
            <a class="btn gold" href="https://github.com/pacts-and-polyhedrals/dm-lm-pro/releases/latest" target="_blank" rel="noopener">Latest Release</a>
            <a class="btn ghost" href="https://github.com/pacts-and-polyhedrals/dm-lm-pro/issues" target="_blank" rel="noopener">Report an Issue</a>
            <a class="btn ghost" href="https://www.patreon.com/cw/pactsandpolyhedrals" target="_blank" rel="noopener">Patreon</a>
          </div>
        </article>
      `
    },
    downtime: {
      title: 'Downtime Master README',
      html: `
        <article class="readme">
          <h2>Downtime Master</h2>
          <p><strong>A Foundry VTT Module for D&D 5e</strong></p>
          <p><strong>Created by DM Asmo — Pacts & Polyhedrals</strong></p>
          <p>Free to use. Made with love for the TTRPG community.</p>

          <h3>What is Downtime Master?</h3>
          <p>Downtime Master is a comprehensive downtime management system for D&D 5e in Foundry VTT. It replaces the basic Xanathar's Guide downtime rules with a rich, interactive system that keeps players engaged between sessions.</p>

          <h3>Features</h3>
          <h4>Player Tools</h4>
          <ul>
            <li><strong>Request System</strong> — players submit downtime requests for GM review</li>
            <li><strong>Crafting Workbench</strong> — blueprint-based crafting with progress tracking, skill levels, and GM approval for magic items</li>
            <li><strong>Training Tracker</strong> — track proficiency and language training over time</li>
            <li><strong>Resource Ledger</strong> — manage crafting materials, monster parts, and ingredients</li>
            <li><strong>Faction Relations</strong> — track standing with 37+ factions including full lore entries</li>
            <li><strong>Monster Harvesting</strong> — tiered harvesting tables for 90+ creatures</li>
            <li><strong>History Log</strong> — full audit trail of all downtime activities</li>
            <li><strong>Boons & Awards</strong> — custom rewards from the GM</li>
            <li><strong>Scribing</strong> — spell scroll creation with proper DC/cost scaling</li>
            <li><strong>Crafting Skills</strong> — per-affinity skill progression such as Smithing and Alchemy</li>
          </ul>

          <h4>GM Tools</h4>
          <ul>
            <li><strong>Request Dashboard</strong> — review and adjudicate all player requests</li>
            <li><strong>Star Tracker</strong> — award downtime stars to players</li>
            <li><strong>Blueprint Maker</strong> — create custom item blueprints</li>
            <li><strong>Magic Item Creator</strong> — player-facing tool with full GM review/edit before items enter crafting</li>
            <li><strong>Treasure Generator</strong> — tier-based loot with interactive distribution chest</li>
            <li><strong>Shop Generator</strong> — procedural magic shops, resource shops, and taverns with compendium descriptions</li>
            <li><strong>Weekly Summary</strong> — overview of all player activity</li>
            <li><strong>Sync System</strong> — push panels to player screens</li>
          </ul>

          <h4>World Tools</h4>
          <ul>
            <li>37 FR factions with full lore: overview, goals, methods, reputation, and notes</li>
            <li>Custom world factions available to all player trackers</li>
            <li>799 item blueprints across all crafting affinities</li>
            <li>2,955 catalogue materials with use/source/value data</li>
            <li>Tier-based coin tables and resource drops for treasure</li>
            <li>Full Steinhardt's Guide & 3rd-party compendium pricing support</li>
          </ul>

          <h3>Installation</h3>
          <p><strong>Method 1 — Manifest URL (recommended)</strong></p>
          <code>https://github.com/pacts-and-polyhedrals/downtime-master/releases/latest/download/module.json</code>
          <p>Paste this into Foundry's <strong>Install Module</strong> dialog.</p>
          <p><strong>Method 2 — Foundry Module Search</strong></p>
          <p>Open Foundry's <strong>Install Module</strong> dialog, search for <strong>Downtime Master</strong>, and install it directly from the official Foundry VTT module listing.</p>

          <h3>Requirements</h3>
          <ul>
            <li>Foundry VTT v12-v14</li>
            <li>D&D 5e system v3.0.0+</li>
          </ul>

          <h3>Support & Community</h3>
          <p>This module is <strong>free</strong> and always will be. If you enjoy it and want to support continued development, support Pacts & Polyhedrals on Patreon or book one of DM Asmo's campaigns on StartPlaying.games.</p>

          <h3>Credits</h3>
          <p>Built by <strong>DM Asmo</strong> for the Pacts & Polyhedrals community.</p>
          <p>Pricing references: Sane Magic Item Prices community standard, PHB/XGtE scribing tables, DMG hoard tables.</p>
          <p>Faction lore: Forgotten Realms Campaign Setting, Waterdeep: Dragon Heist, Acquisitions Incorporated, and original campaign material.</p>
          <p><em>Pacts & Polyhedrals is not affiliated with Wizards of the Coast.</em></p>

          <div class="readme-actions">
            <a class="btn gold" href="https://github.com/pacts-and-polyhedrals/downtime-master/releases/latest" target="_blank" rel="noopener">Latest Release</a>
            <a class="btn ghost" href="https://github.com/pacts-and-polyhedrals/downtime-master/issues" target="_blank" rel="noopener">Report an Issue</a>
            <a class="btn ghost" href="https://www.patreon.com/cw/pactsandpolyhedrals" target="_blank" rel="noopener">Patreon</a>
          </div>
        </article>
      `
    }
  };

  const modal = document.getElementById('readmeModal');
  const title = document.getElementById('readmeModalTitle');
  const body = document.getElementById('readmeModalBody');
  const closeButton = modal ? modal.querySelector('[data-readme-close]') : null;
  let previousFocus = null;

  function openReadme(key){
    const readme = readmes[key];
    if(!modal || !title || !body || !readme) return;
    previousFocus = document.activeElement;
    title.textContent = readme.title;
    body.innerHTML = readme.html;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if(closeButton) closeButton.focus();
  }

  function closeReadme(){
    if(!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if(previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  document.querySelectorAll('[data-readme]').forEach(function(button){
    button.addEventListener('click', function(){
      openReadme(button.getAttribute('data-readme'));
    });
  });

  if(closeButton) closeButton.addEventListener('click', closeReadme);
  if(modal){
    modal.addEventListener('click', function(event){
      if(event.target === modal) closeReadme();
    });
  }
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape' && modal && modal.classList.contains('open')) closeReadme();
  });
})();
