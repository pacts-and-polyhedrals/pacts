/* Pacts & Polyhedrals customer shop — all authority resides in the Worker.
   Never add Stripe secrets, entitlement flags or private package URLs to this file. */
(() => {
'use strict';
const apiBase=String(window.PACTS_STORE_API||'').trim().replace(/\/$/,'');
const comingSoon=window.PACTS_STORE_COMING_SOON===true;
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const session=()=>sessionStorage.getItem('pacts_session')||'';
const setStatus=(node,message,bad=false)=>{if(!node)return;node.textContent=message;node.className='status'+(bad?' error':'');};
const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=String(text);return e;};
const fmt=d=>new Date(d*1000).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});
async function call(path,{method='GET',body=null,adminKey=''}={}) {
  if(!apiBase)throw new Error('The secure store backend has not been connected yet.');
  const headers={'Accept':'application/json'};
  if(body!==null)headers['Content-Type']='application/json';
  if(session())headers.Authorization='Bearer '+session();
  if(adminKey)headers['X-Admin-Key']=adminKey;
  let res;
  try{res=await fetch(apiBase+path,{method,headers,body:body!==null?JSON.stringify(body):undefined,cache:'no-store',referrerPolicy:'no-referrer'});}
  catch{throw new Error('The store server could not be reached. Please try again later.');}
  const data=await res.json().catch(()=>({}));
  if(!res.ok){if(res.status===401&&session())sessionStorage.removeItem('pacts_session');throw new Error(data.error||`Error ${res.status}`);}
  return data;
}
function handleLoginForms(){
  $$('[data-login-form]').forEach(form=>form.addEventListener('submit',async e=>{
    e.preventDefault();const button=$('button[type=submit]',form),status=$('[data-login-status]',form);
    button.disabled=true;setStatus(status,'Sending a one-use email link…');
    try{await call('/v1/auth/start',{method:'POST',body:{email:$('input[type=email]',form).value}});
      setStatus(status,'Check your inbox for your 15-minute sign-in link. Open it in this browser.');}
    catch(err){setStatus(status,err.message,true);}finally{button.disabled=false;}
  }));
  $$('[data-logout]').forEach(btn=>btn.addEventListener('click',async()=>{
    try{await call('/v1/auth/logout',{method:'POST'});}catch{}
    sessionStorage.removeItem('pacts_session');location.assign('library.html');
  }));
}
async function verifyMagicLink(){
  const m=/#verify=([\w-]{40,80})/.exec(location.hash);
  if(!m)return;
  history.replaceState(null,'',location.pathname+location.search); // Remove token BEFORE any other request.
  const panel=$('[data-login-message]');if(panel)setStatus(panel,'Verifying your one-use sign-in link…');
  try{const data=await call('/v1/auth/verify',{method:'POST',body:{token:m[1]}});
    sessionStorage.setItem('pacts_session',data.session);
    if(panel)setStatus(panel,'Signed in successfully. Opening your library…');
  }catch(err){if(panel)setStatus(panel,err.message,true);}
}
async function setupProduct(){
  const panel=$('[data-checkout-status]'),button=$('[data-start-checkout]');
  if(!button)return;
  const showComingSoon=()=>{button.textContent='COMING SOON — FOUNDERS BETA $5';button.disabled=true;setStatus(panel,'Public sales have not opened. The first 100 Founders will be offered $5 beta access when the game is ready. No payment can be taken now.');};
  const proceed=async()=>{
    button.disabled=true;setStatus(panel,'Opening Stripe Checkout…');
    try{const payment=await call('/v1/checkout',{method:'POST',body:{product_id:'the-smoke',beta_ack:true,terms_ack:true}});
      if(!/^https:\/\/checkout\.stripe\.com\//.test(payment.url))throw new Error('Unexpected checkout redirect.');
      location.assign(payment.url);
    }catch(err){setStatus(panel,err.message,true);button.disabled=false;}
  };
  button.addEventListener('click',async()=>{
    if(!$('#ack-beta')?.checked || !$('#ack-terms')?.checked){setStatus(panel,'Please read and acknowledge both purchase terms first.',true);return;}
    if(!session()){$('[data-login-anchor]')?.scrollIntoView({behavior:'smooth'});setStatus(panel,'Please sign in with your purchase email first.',true);return;}
    await proceed();
  });
  if(!apiBase){if(comingSoon)showComingSoon();else{button.disabled=true;setStatus(panel,'Checkout is being configured. No payments can be taken yet.');}return;}
  try{
    const data=await call('/v1/catalog');const p=data.products?.find(x=>x.id==='the-smoke');
    if(!p)throw new Error('Product not found');
    const names={founders:'FOUNDERS BETA',early:'EXPANDED EARLY ACCESS',full:'FULL RELEASE',paused:'PAUSED'};
    $$('[data-phase]').forEach(e=>e.textContent=names[p.stage]||p.stage);
    $$('[data-price]').forEach(e=>e.textContent=p.price_usd==null?'—':'$'+p.price_usd);
    const sold=$('[data-founder-sold]'),avail=$('[data-founder-available]');
    if(sold)sold.textContent=`${p.founders_sold} of ${p.founder_limit} founding places sold`;
    if(avail)avail.textContent=p.stage==='founders'?`${p.checkout_places_available} checkout places currently available`:'Founders Beta enrolment closed';
    const ackBetaText=$('[data-beta-ack-text]');
    if(ackBetaText){
      if(p.stage==='founders')ackBetaText.textContent='I understand this is a beta purchase and the finished $30 edition is not included. A Founder upgrade will cost another $15.';
      else if(p.stage==='early')ackBetaText.textContent='I understand this is Early Access at $15, with pre-release updates; the eventual full edition requires a separate $15 upgrade.';
      else if(p.stage==='full')ackBetaText.textContent='I understand this is the complete $30 edition (or a personal $15 upgrade for eligible existing beta purchasers).';
      else ackBetaText.textContent='Sales are currently paused.';
    }
    const stageSummary=$('[data-tier-terms]');
    if(stageSummary){
      if(p.stage==='founders')stageSummary.textContent='The $5 purchase does NOT include the finished edition. A Founder pays a further $15 if they choose to upgrade at full release (total $20).';
      else if(p.stage==='early')stageSummary.textContent='Early Access $15 includes beta updates, not the full edition. Customers may purchase a separate $15 full-release upgrade.';
      else if(p.stage==='full')stageSummary.textContent='Full commercial edition $30. Prior beta customers with active entitlements qualify for a server-checked $15 upgrade.';
      else stageSummary.textContent='Purchases are paused by the publisher.';
    }
    if(p.stage==='founders')button.textContent='PURCHASE FOUNDERS BETA — $5';
    if(p.stage==='early')button.textContent='PURCHASE EARLY ACCESS — $15';
    if(p.stage==='full')button.textContent='PURCHASE / UPGRADE — SEE LIBRARY';
    if(comingSoon){showComingSoon();return;}
    if(!p.checkout_enabled||p.stage==='paused'||(p.stage==='founders'&&p.checkout_places_available<=0)){
      button.disabled=true;setStatus(panel,p.stage==='founders'&&p.checkout_places_available===0?'All current founder checkout places are reserved or sold. Please check back.':'Checkout is not activated yet. No payment can be taken.');
    }else setStatus(panel,'Sign in with your purchase email, then use Stripe Checkout securely.');
  }catch(err){if(comingSoon)showComingSoon();else{button.disabled=true;setStatus(panel,err.message,true);}}
}
const container=(target,title)=>{const card=make('section','card');card.append(make('h3','',title));target.append(card);return card;};
function renderListOfOrders(card,orders){
  if(!orders.length){card.append(make('p','','No completed purchases yet.'));return;}
  const table=make('table','data-table');const header=make('tr');
  ['Product','Order','Paid','Date','Status','Receipt'].forEach(t=>header.append(make('th','',t)));
  const head=make('thead');head.append(header);table.append(head);const tbody=make('tbody');
  orders.forEach(o=>{const tr=make('tr');['The Smoke',o.kind,'$'+(o.amount_cents/100).toFixed(2),fmt(o.paid_at),o.status].forEach(v=>tr.append(make('td','',v)));
    if(o.receipt_url && /^https:\/\/(?:pay\.)?stripe\.com\//.test(o.receipt_url)){const td=make('td');const a=make('a','','Stripe receipt ↗');a.href=o.receipt_url;a.target='_blank';a.rel='noopener noreferrer';td.append(a);tr.append(td);}else tr.append(make('td','', 'Stripe receipt by email'));tbody.append(tr);});
  table.append(tbody);card.append(table);
}
async function setupLibrary(){
  const main=$('[data-library]');if(!main)return;
  const loginPanel=$('[data-login-panel]'),content=$('[data-library-content]'),msg=$('[data-library-status]');
  await verifyMagicLink();
  if(!session()) {loginPanel?.classList.remove('hidden');content?.classList.add('hidden');return;}
  try{
    const lib=await call('/v1/library');loginPanel?.classList.add('hidden');content?.classList.remove('hidden');
    $('#library-email').textContent=lib.email;const containerRoot=$('[data-library-panels]');containerRoot.replaceChildren();
    const rights=container(containerRoot,'Your products & access');
    if(!lib.entitlements.length)rights.append(make('p','','No products on this account yet. Purchase The Smoke to open your library.'));
    else lib.entitlements.forEach(e=>{
      const row=make('div','card tight');row.append(make('strong','',`THE SMOKE — ${e.level.toUpperCase()} ACCESS`));
      row.append(make('p','fine',`Origin: ${e.origin} · Entitlement: ${e.status} · since ${fmt(e.created_at)}`));
      if(e.status==='active'){
        const controls=make('div','actions');
        const dl=make('button','pill alt','DOWNLOAD ENTITLED ZIP');dl.type='button';
        dl.addEventListener('click',async()=>{
          dl.disabled=true;try{const data=await call('/v1/library/download',{method:'POST',body:{product_id:e.product_id}});
           location.assign(data.url);setStatus(msg,'A private, one-time download link has been issued.');}
          catch(err){setStatus(msg,err.message,true)}finally{dl.disabled=false;}
        });
        controls.append(dl);
        const install=make('button','pill mint','CREATE PRIVATE MANIFEST LINK');install.type='button';
        const link=make('div','codebox hidden');link.setAttribute('aria-live','polite');
        install.addEventListener('click',async()=>{
          install.disabled=true;try{
            const data=await call('/v1/library/install-token',{method:'POST',body:{product_id:e.product_id}});
            link.textContent=data.manifest;link.classList.remove('hidden');
            const copy=make('button','pill alt','COPY PRIVATE LINK');copy.type='button';
            copy.addEventListener('click',()=>navigator.clipboard.writeText(data.manifest).then(()=>setStatus(msg,'Link copied. Keep it private.')).catch(()=>setStatus(msg,'Copy from the displayed field.',true)));
            const revoke=make('button','pill alt','REVOKE THIS LINK');revoke.type='button';
            revoke.addEventListener('click',async()=>{await call('/v1/library/revoke-token',{method:'POST',body:{token_id:data.id}});link.textContent='This link has been revoked.';revoke.disabled=true;});
            controls.append(link,copy,revoke);
            setStatus(msg,'Private install URL generated. Its update behaviour on Forge is not yet verified.');
          }catch(err){setStatus(msg,err.message,true)}finally{install.disabled=false;}
        });
        controls.append(install);row.append(controls);
      }
      rights.append(row);
    });
    const releases=container(containerRoot,'Available releases and changelogs');
    if(!lib.releases.length)releases.append(make('p','','No private release has been published to this library yet.'));
    lib.releases.forEach(r=>{
      const box=make('div','tight');box.append(make('strong','',`v${r.version} · ${r.channel.toUpperCase()}`));
      box.append(make('p','fine',r.changelog||'No changelog provided.'));releases.append(box);
    });
    const orders=container(containerRoot,'Your receipts and purchase history');renderListOfOrders(orders,lib.orders);
    const notes=container(containerRoot,'Community & beta updates');
    if(!lib.announcements.length)notes.append(make('p','','There are no beta announcements yet.'));
    lib.announcements.forEach(a=>{const wrap=make('div','tight');wrap.append(make('strong','',a.title));wrap.append(make('p','fine',a.body));notes.append(wrap);});
    const tokens=lib.tokens.filter(t=>!t.id.startsWith('dl-'));
    const manageTokens=container(containerRoot,'Your private installation links');
    manageTokens.append(make('p','fine','Never share a personal manifest link. Revoke expired or compromised tokens; only the token ID is shown here, not its secret URL.'));
    if(!tokens.length)manageTokens.append(make('p','fine','No installation links issued yet.'));
    tokens.forEach(t=>{
      const row=make('div','tight');const active=!t.revoked_at&&t.expires_at>Math.floor(Date.now()/1000);
      row.append(make('span','fine',t.id+' · '+(active?'ACTIVE':'EXPIRED / REVOKED')+' · expires '+fmt(t.expires_at)));
      if(active){const revoke=make('button','pill alt','REVOKE LINK');revoke.type='button';revoke.style.marginLeft='10px';
        revoke.addEventListener('click',async()=>{revoke.disabled=true;try{await call('/v1/library/revoke-token',{method:'POST',body:{token_id:t.id}});setStatus(msg,'Installation link revoked.');revoke.textContent='REVOKED';}catch(err){setStatus(msg,err.message,true);revoke.disabled=false;}});
        row.append(revoke);
      }manageTokens.append(row);
    });
    const pref=container(containerRoot,'Email preferences');
    const label=make('label');const check=make('input');check.type='checkbox';check.checked=lib.marketing_opt_in;check.style.width='auto';check.style.display='inline-block';check.style.marginRight='8px';
    label.append(check,document.createTextNode('Send me optional marketing and new-product announcements.'));pref.append(label);
    pref.append(make('p','fine','Essential receipts, access and security emails are sent separately.'));
    const save=make('button','pill alt','SAVE PREFERENCES');pref.append(save);
    save.addEventListener('click',async()=>{try{await call('/v1/me/preferences',{method:'POST',body:{marketing_opt_in:check.checked}});setStatus(msg,'Preferences saved.');}catch(err){setStatus(msg,err.message,true);}});
    const upgrade=await call('/v1/catalog').catch(()=>({products:[]}));const stage=upgrade.products?.find(x=>x.id==='the-smoke')?.stage;
    if(stage==='full' && lib.entitlements.some(e=>e.level==='beta'&&e.status==='active') && !lib.entitlements.some(e=>e.level==='full'&&e.status==='active')){
      const up=container(containerRoot,'Full-release upgrade — $15');up.append(make('p','','Your existing beta purchase qualifies you for a personal $15 upgrade. This is checked server-side; no transferable coupon is used.'));
      const btn=make('button','pill','UPGRADE FOR $15');up.append(btn);
      btn.addEventListener('click',async()=>{btn.disabled=true;try{const s=await call('/v1/checkout',{method:'POST',body:{product_id:'the-smoke',beta_ack:true,terms_ack:true}});location.assign(s.url);}catch(e){setStatus(msg,e.message,true);btn.disabled=false;}});
    }
  }catch(err){setStatus(msg,err.message,true);loginPanel?.classList.remove('hidden');content?.classList.add('hidden');}
}
async function setupThanks(){const notice=$('[data-thanks-status]');if(!notice)return;
  const sessionId=new URLSearchParams(location.search).get('session_id');
  if(!sessionId||!session()){setStatus(notice,'Please sign in to your library using your purchase email. A return from Stripe does not confirm payment.');return;}
  try{const s=await call('/v1/checkout/status',{method:'POST',body:{session_id:sessionId}});
    setStatus(notice,s.status==='paid'?'Payment confirmed and access issued. Open My Library.':`Checkout status: ${s.status}. Your library updates after the Stripe webhook confirms payment.`);
  }catch(e){setStatus(notice,e.message,true);}
}
async function setupFeedback(){const form=$('[data-feedback-form]');if(!form)return;
  form.addEventListener('submit',async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form));const msg=$('[data-feedback-status]');
    try{const r=await call('/v1/feedback',{method:'POST',body:data});setStatus(msg,'Feedback received. Ticket: '+r.ticket);form.reset();}catch(err){setStatus(msg,err.message,true);}});
}
async function setupAdmin(){const root=$('[data-admin]');if(!root)return;
  const keyInput=$('[data-admin-key]'),status=$('[data-admin-status]'),dashboard=$('[data-admin-overview]');
  async function adminCall(path,body=null,method='POST') {return call(path,{method,body,adminKey:keyInput.value});}
  const show=async()=>{try{const data=await adminCall('/v1/admin',null,'GET');
    dashboard.replaceChildren();dashboard.append(make('p','',`Signed in as admin: ${data.admin_email}`));
    const tbl=make('div','cards');const vals=[['Orders',data.orders.length],['Founder reservations',data.founder_slots.filter(s=>s.status==='reserved').reduce((a,v)=>a+v.count,0)],['Founder sold',data.founder_slots.filter(s=>s.status==='sold').reduce((a,v)=>a+v.count,0)]];
    vals.forEach(([k,v])=>{const card=make('div','card');card.append(make('strong','',v),make('p','',k));tbl.append(card);});dashboard.append(tbl);
    const notifications=make('div','card');notifications.append(make('h3','','Queued customer notifications'));
    (data.notification_counts||[]).forEach(n=>notifications.append(make('p','fine',`${n.status}: ${n.count}`)));
    dashboard.append(notifications);
    const list=make('div','card');list.append(make('h3','','Registered releases'));
    data.releases.forEach(r=>list.append(make('p','fine',`${r.product_id} · v${r.version} · ${r.channel} · ${r.published?'PUBLISHED':'WITHDRAWN'} · ${r.archive_bytes} bytes`)));dashboard.append(list);
    const sells=make('div','card');sells.append(make('h3','','Recent orders (verified only)'));
    data.orders.forEach(o=>sells.append(make('p','fine',`${o.email} · ${o.kind} · ${o.status} · $${(o.amount_cents/100).toFixed(2)}`)));dashboard.append(sells);
    const installations=make('div','card');installations.append(make('h3','','Personal installation tokens (ID only)'));
    if(!data.installation_tokens?.length)installations.append(make('p','fine','No installation links issued.'));
    (data.installation_tokens||[]).forEach(t=>{
      const row=make('div','tight');row.append(make('span','fine',`${t.email} · ${t.id} · ${t.revoked_at?'REVOKED':'ACTIVE'} · expires ${fmt(t.expires_at)}`));
      if(!t.revoked_at){const revoke=make('button','pill alt','REVOKE');revoke.type='button';revoke.style.marginLeft='8px';
        revoke.addEventListener('click',async()=>{try{await adminCall('/v1/admin/access/revoke',{token_id:t.id});await show();}catch(err){setStatus(status,err.message,true);}});row.append(revoke);}
      installations.append(row);
    });dashboard.append(installations);
    const failures=make('div','card');failures.append(make('h3','','Download / installation failures'));
    (data.download_failures||[]).forEach(f=>failures.append(make('p','fine',`${f.product_id} · v${f.version} · ${f.status} · via ${f.via} · ${fmt(f.at)}`)));
    if(!data.download_failures?.length)failures.append(make('p','fine','No recorded delivery failures yet.'));
    dashboard.append(failures);
    const feedback=make('div','card');feedback.append(make('h3','','Recent beta feedback'));
    data.feedback.forEach(f=>feedback.append(make('p','fine',`${f.status} · ${f.kind} · ${f.summary} · Foundry ${f.foundry_version} · ${f.email}`)));dashboard.append(feedback);
    setStatus(status,'Admin data loaded. All changes require server-side authorisation.');
  }catch(err){setStatus(status,err.message,true);}};
  $('[data-admin-load]')?.addEventListener('click',show);
  $('[data-notification-batch]')?.addEventListener('click',async ev=>{
    const b=ev.currentTarget;b.disabled=true;
    try{const result=await adminCall('/v1/admin/notifications/send-next',{});
      setStatus(status,`Sent ${result.sent} customer emails. ${result.failed} failed; ${result.remaining} remain queued.`);
      await show();
    }catch(err){setStatus(status,err.message,true);}finally{b.disabled=false;}
  });

  $('[data-private-upload]')?.addEventListener('submit',async ev=>{
    ev.preventDefault();const form=ev.currentTarget;const report=$('[data-upload-status]',form);
    const data=new FormData(form);const file=data.get('archive');
    if(!file||typeof file.size!=='number'||!file.size){setStatus(report,'Choose a ZIP archive first.',true);return;}
    if(file.size>95000000){setStatus(report,'Maximum direct upload 95MB. Use Wrangler for larger ZIPs.',true);return;}
    if(!apiBase||!session()||!keyInput.value){setStatus(report,'Connect the backend and sign in with your admin account and secret first.',true);return;}
    const url=apiBase+'/v1/admin/release/upload?product_id='+encodeURIComponent(data.get('product_id'))+'&version='+encodeURIComponent(data.get('version'));
    const button=$('button[type=submit]',form);button.disabled=true;
    setStatus(report,'Uploading '+Math.round(file.size/1024/1024)+'MB to private R2. Do not close this tab…');
    try{
      const res=await fetch(url,{method:'PUT',headers:{'Authorization':'Bearer '+session(),'X-Admin-Key':keyInput.value,'Content-Type':'application/zip'},body:file,cache:'no-store',referrerPolicy:'no-referrer'});
      const reply=await res.json().catch(()=>({}));
      if(!res.ok)throw new Error(reply.error||'Upload failed with HTTP '+res.status);
      setStatus(report,'Private ZIP uploaded: '+reply.r2_key+' ('+reply.size_bytes+' bytes). Now register the release using its SHA-256 and manifest.');
    }catch(err){setStatus(report,'Upload unsuccessful: '+err.message+' — use Wrangler R2 upload if your plan limits request size.',true);}finally{button.disabled=false;}
  });

  $$('[data-admin-action]').forEach(form=>form.addEventListener('submit',async e=>{
    e.preventDefault();const path=form.dataset.adminAction;
    const fields=Object.fromEntries(new FormData(form));
    if(fields.limit)fields.limit=Number(fields.limit);
    if(fields.published)fields.published=fields.published==='true';
    if(fields.manifest){try{fields.manifest=JSON.parse(fields.manifest);}catch{setStatus(status,'Manifest must be valid JSON.',true);return;}}
    try{const r=await adminCall(path,fields);setStatus(status,'Saved successfully: '+JSON.stringify(r));await show();}
    catch(err){setStatus(status,err.message,true);}
  }));
}
(async()=>{
  handleLoginForms();
  const page=document.body.dataset.page;
  try{
    if(page==='product')await setupProduct();
    if(page==='library')await setupLibrary();
    if(page==='thanks')await setupThanks();
    if(page==='feedback')await setupFeedback();
    if(page==='admin')await setupAdmin();
  }catch(e){console.error('Store initialization error',e.name);}
})();
})();
