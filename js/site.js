/* THE SMOKE — public website interactions. No analytics, trackers, or backend dependencies. */
'use strict';
document.documentElement.classList.add('js-enabled');
const $ = (selector,scope=document)=>scope.querySelector(selector);
const $$ = (selector,scope=document)=>Array.from(scope.querySelectorAll(selector));
const content = window.SMOKE_DATA || {maps:[],factions:[],missions:[],ranks:[]};
const escapeHTML = value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function ready(){
 const menuButton=$('#menu-toggle'), nav=$('#site-nav');
 if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menuButton.textContent=open?'✕':'☰';});
  $$('#site-nav a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));
 }
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:0.08});
  $$('.reveal').forEach(e=>observer.observe(e));
 }else{$$('.reveal').forEach(el=>el.classList.add('visible'));}
 initBlower();initHeat();initAtlas();initFactions();initMissions();initDice();initLightbox();
}

function initBlower(){
 const trigger=$('#blower-toggle'),dock=$('#blower-dock'),close=$('#blower-close');
 if(!trigger||!dock)return;
 const panels=$$('[data-blower-panel]',dock),tabs=$$('[data-blower-tab]',dock);
 const setOpen=open=>{dock.setAttribute('aria-hidden',String(!open));trigger.setAttribute('aria-expanded',String(open));trigger.setAttribute('aria-label',open?'Close the Blower':'Open the Blower');if(open){$('[data-blower-tab]',dock)?.focus();}else{trigger.focus();}};
 trigger.addEventListener('click',()=>setOpen(dock.getAttribute('aria-hidden')==='true'));
 $$('[data-open-blower]').forEach(button=>button.addEventListener('click',()=>{if(dock.getAttribute('aria-hidden')==='true')setOpen(true);else $('[data-blower-tab]',dock)?.focus();}));
 close.addEventListener('click',()=>setOpen(false));
 tabs.forEach((tab,index)=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.setAttribute('aria-selected',String(t===tab)));panels.forEach(p=>p.classList.toggle('active',p.dataset.blowerPanel===tab.dataset.blowerTab));}));
 dock.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false);if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const active=tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');const next=(active+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].click();tabs[next].focus();}});
}

const heatLevels=[
 {label:'CLEAN',title:'Nobody is looking. Yet.',detail:'No active Heat. You are another face on the manor — until somebody sees something they ought not.'},
 {label:'CLOCKED · ★',title:'You have been clocked.',detail:'A patrol has your description. A copper who spots you is likely to stop you.'},
 {label:'WANTED · ★★',title:'The area cars are hunting.',detail:'Patrol cars will give chase on sight. Keep moving, break line of sight and choose the streets carefully.'},
 {label:'INDIA 99 · ★★★',title:'Eyes in the sky.',detail:'The police helicopter joins in. Outside, on this map, there is nowhere easy to disappear.'},
 {label:'TROJANS · ★★★★',title:'Armed response.',detail:'Armed Response Vehicles join the hunt. The danger has moved well beyond a talking-to.'},
 {label:'LOCKDOWN · ★★★★★',title:'Every exit has a roadblock.',detail:'The borough is locked down. Every unit is looking for you and the normal way out is gone.'}
];
function initHeat(){
 $$('[data-heat]').forEach(heat=>{
  const buttons=$$('[data-star]',heat), title=$('[data-heat-title]',heat),detail=$('[data-heat-detail]',heat),label=$('[data-heat-label]',heat);
  let value=Number(heat.dataset.initialHeat||0);
  function update(v){value=v;buttons.forEach(b=>{let active=Number(b.dataset.star)<=value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));b.setAttribute('aria-label','Set Heat to '+b.dataset.star+' star'+(b.dataset.star==='1'?'':'s'));});let item=heatLevels[value];if(title)title.textContent=item.title;if(detail)detail.textContent=item.detail;if(label)label.textContent=item.label;}
  buttons.forEach(button=>button.addEventListener('click',()=>update(Number(button.dataset.star)===value?0:Number(button.dataset.star))));
  update(value);
 });
}

function initAtlas(){
 const explorer=$('#city-explorer');if(!explorer||!content.maps.length)return;
 const grid=$('#atlas-grid'), list=$('#atlas-map-list'),stageImg=$('#city-stage-image'),title=$('#city-stage-title'),meta=$('#city-stage-meta'),code=$('#city-stage-code');
 let selected=7;
 content.maps.forEach((m,i)=>{
  const block=document.createElement('button');block.type='button';block.textContent=String(i+1).padStart(2,'0');block.title=m.name;block.dataset.mapIndex=i;grid.append(block);
  const row=document.createElement('button');row.type='button';row.dataset.mapIndex=i;row.innerHTML='<strong>'+escapeHTML(m.name)+'</strong><span>'+escapeHTML(m.postcode)+'</span>';list.append(row);
 });
 function selectMap(i){selected=(i+content.maps.length)%content.maps.length;const m=content.maps[selected];stageImg.src=m.image;stageImg.alt='The Smoke vector street map: '+m.name;title.textContent=m.name;meta.textContent=(m.borough||'EAST LONDON')+' · '+(m.postcode||'');code.textContent='ZONE '+String(selected+1).padStart(2,'0')+' / 20';$$('[data-map-index]',explorer).forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.mapIndex)===selected)));const lb=$('#lightbox');if(lb)lb.dataset.image=m.image;}
 explorer.addEventListener('click',e=>{const button=e.target.closest('[data-map-index]');if(button)selectMap(Number(button.dataset.mapIndex));if(e.target.closest('#map-prev'))selectMap(selected-1);if(e.target.closest('#map-next'))selectMap(selected+1);});
 selectMap(selected);
}

function initLightbox(){
 const modal=$('#lightbox'),open=$('#map-fullscreen');if(!modal||!open)return;
 const img=$('img',modal),close=$('button',modal);let lastFocus=null;
 const hide=()=>{modal.setAttribute('aria-hidden','true');document.body.classList.remove('dialog-open');lastFocus?.focus();};
 open.addEventListener('click',()=>{lastFocus=document.activeElement;const current=$('#city-stage-image');img.src=current?.src||'';img.alt=current?.alt||'The Smoke map';modal.setAttribute('aria-hidden','false');document.body.classList.add('dialog-open');close.focus();});
 close.addEventListener('click',hide);modal.addEventListener('click',e=>{if(e.target===modal)hide();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.getAttribute('aria-hidden')==='false')hide();});
}

function initFactions(){
 const listing=$('#faction-directory'),dialog=$('#faction-dialog');if(!listing)return;
 let lastFocus=null,activeCategory='all';
 const filters=$$('[data-faction-filter]');
 filters.forEach(btn=>btn.addEventListener('click',()=>{activeCategory=btn.dataset.factionFilter;filters.forEach(x=>x.classList.toggle('active',x===btn));$$('[data-category]',listing).forEach(c=>{c.hidden=activeCategory!=='all'&&c.dataset.category!==activeCategory;});}));
 if(!dialog)return;
 function show(code){const f=content.factions.find(x=>x.code===code);if(!f)return;lastFocus=document.activeElement;dialog.style.setProperty('--dialog-accent',f.color);$('#dialog-mark').src=f.image;$('#dialog-mark').alt=f.name+' emblem';$('#dialog-name').textContent=f.name;$('#dialog-patron').textContent=f.patron;$('#dialog-work').textContent=f.work;$('#dialog-benefits').textContent=f.benefits;$('#dialog-influence').textContent=f.influence;$('#dialog-code').textContent='FILE / '+f.code;dialog.setAttribute('aria-hidden','false');document.body.classList.add('dialog-open');$('#dialog-close').focus();}
 function hide(){dialog.setAttribute('aria-hidden','true');document.body.classList.remove('dialog-open');lastFocus?.focus();}
 listing.addEventListener('click',e=>{const card=e.target.closest('[data-faction-code]');if(card)show(card.dataset.factionCode);});
 $('#dialog-close').addEventListener('click',hide);dialog.addEventListener('click',e=>{if(e.target===dialog)hide();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.getAttribute('aria-hidden')==='false')hide();});
}

function initMissions(){
 const grid=$('#mission-grid');if(!grid)return;
 const filter=$('#mission-filter'),search=$('#mission-search'),counter=$('#mission-counter'),none=$('#mission-none');
 function apply(){const sel=filter.value,q=search.value.trim().toLowerCase();let shown=0;$$('.mission-card',grid).forEach(el=>{const matches=(sel==='all'||el.dataset.faction===sel||sel==='opening'&&el.dataset.kind==='opening')&&(!q||el.dataset.search.includes(q));el.classList.toggle('mission-hidden',!matches);shown+=matches?1:0;});counter.textContent=shown+' public briefings shown';none.style.display=shown?'none':'block';}
 filter.addEventListener('change',apply);search.addEventListener('input',apply);apply();
}

// The interactive demo follows the player's v0.5.0 book: d6 Effort + stat die + modifier,
// highest-face explosions, difficulty TN fixed before Hustle, exact TN succeeds.
const TN={4:{Easy:6,Medium:8,Hard:10,'Long Shot':15},6:{Easy:8,Medium:10,Hard:12,'Long Shot':17},8:{Easy:9,Medium:12,Hard:14,'Long Shot':20},10:{Easy:11,Medium:14,Hard:17,'Long Shot':22},12:{Easy:12,Medium:16,Hard:19,'Long Shot':24},20:{Easy:18,Medium:23,Hard:28,'Long Shot':34}};
const dieMod={4:2,6:3,8:4,10:5,12:6,20:10};
function rollExploding(sides,threshold){const trail=[];let sum=0,explosions=0;for(let i=0;i<60;i++){const value=1+Math.floor(Math.random()*sides);trail.push(value);sum+=value;if(value<threshold)break;explosions++;}return{sum,trail,explosions};}
function initDice(){
 const form=$('#dice-demo');if(!form)return;const stat=$('#demo-stat'),die=$('#demo-die'),difficulty=$('#demo-difficulty'),hustle=$('#demo-hustle');
 const updateTarget=()=>{$('#demo-tn').textContent=TN[Number(die.value)][difficulty.value]};
 die.addEventListener('change',updateTarget);difficulty.addEventListener('change',updateTarget);updateTarget();
 form.addEventListener('submit',event=>{
  event.preventDefault();const d=Number(die.value), tn=TN[d][difficulty.value], mode=hustle.value;
  const effortSides=mode==='step'?8:6, effortCutoff=mode==='roll'?effortSides-1:effortSides,statCutoff=mode==='roll'?d-1:d;
  const a=rollExploding(effortSides,effortCutoff),b=rollExploding(d,statCutoff),mod=dieMod[d],sum=a.sum+b.sum+mod,margin=sum-tn;
  const outcome=margin<=-4?'PROPER MESS':margin<=-1?'BAD LUCK':margin===0?'JUST ABOUT':margin<=3?'SORTED':margin<=7?'SMASHED IT':'LEGENDARY';
  $('#dice-total').textContent=sum;$('#dice-outcome').textContent=outcome;$('#dice-margin').textContent=(margin>=0?'+':'')+margin+' margin';
  $('#dice-breakdown').textContent='Effort d'+effortSides+' ['+a.trail.join(' + ')+'] + '+stat.value+' d'+d+' ['+b.trail.join(' + ')+'] + '+mod+' modifier = '+sum+'. Target '+tn+'. '+(a.explosions+b.explosions)+' explosion(s).';
  $('#dice-description').textContent=outcome==='LEGENDARY'?'An exceptional result. The crew will be talking about this one.':outcome==='SMASHED IT'?'A clean success and a fitting extra benefit.':outcome==='SORTED'?'A clean success. The job goes your way.':outcome==='JUST ABOUT'?'It works — but there is a cost.':outcome==='BAD LUCK'?'You fail, and it costs you.': 'A serious setback. The consequences are coming.';
  $('#dice-result').style.setProperty('--roll-color',margin>=0?'#23736d':'#ca526d');$('#dice-total').style.color='var(--roll-color)';
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
