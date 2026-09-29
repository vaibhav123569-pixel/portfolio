const profile = window.portfolioProfile;
// EDIT HINT: Contact submission uses our server; the browser never receives Twilio secrets.
document.querySelector('#contact-form').addEventListener('submit',async event=>{
  event.preventDefault();const form=event.currentTarget,button=form.querySelector('button[type="submit"]'),status=document.querySelector('#form-status');
  if(button.disabled)return;
  const data=new FormData(form);button.disabled=true;button.firstChild.textContent='Submitting… ';status.textContent='Submitting your message securely…';
  try{
    const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({firstName:data.get('firstName'),lastName:data.get('lastName'),email:data.get('email'),message:data.get('message'),website:data.get('website'),consent:data.get('consent')==='on'}),signal:AbortSignal.timeout(15000)});
    let result;try{result=await response.json();}catch{throw new Error('Contact service unavailable. Please use the email link in the footer.');}
    if(!response.ok)throw new Error(result.error||'Your message was not accepted. Please try email instead.');
    status.textContent=result.message;form.reset();
  }catch(error){status.textContent=error.name==='TimeoutError'?'No delivery confirmation was received. Please email instead of resubmitting.':error.message||'Unable to connect. Please email instead.';}
  finally{button.disabled=false;button.firstChild.textContent='Send to WhatsApp ';}
});
const safeURL = value => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } };
// EDIT HINT: External links are built only after verification in profile.js. No guessed usernames.
for (const [label, value] of [['LinkedIn',profile.linkedin],['GitHub',profile.github]]) {
  const url = safeURL(value); if (!url) continue;
  const link = document.createElement('a'); link.href=url; link.textContent=label+' ↗'; link.target='_blank'; link.rel='noopener noreferrer'; document.querySelector('#social-links').append(link);
}
document.querySelector('#year').textContent=new Date().getFullYear();
if(profile.email){const emailLink=document.createElement('a');emailLink.href='mailto:'+profile.email;emailLink.textContent='Email ↗';document.querySelector('#social-links').append(emailLink);}
const navLinks=[...document.querySelectorAll('nav a')];
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){navLinks.forEach(link=>{const current=link.hash==='#'+entry.target.id;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -60% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});});
const projectDialog=document.querySelector('#project-dialog');
document.querySelector('.dialog-done').addEventListener('click',()=>projectDialog.close());
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const project=profile.projects[button.dataset.project];
  document.querySelector('#dialog-category').textContent=project.category;
  document.querySelector('#dialog-title').textContent=project.title;
  document.querySelector('#dialog-description').textContent=project.description;
  const list=document.querySelector('#dialog-features');list.replaceChildren();project.features.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item);});
  const links=document.querySelector('#dialog-links');links.replaceChildren();
  for(const [label,value] of [['Source code',project.repository],['Live project',project.live]]){const url=safeURL(value);if(url){const link=document.createElement('a');link.href=url;link.textContent=label+' ↗';link.target='_blank';link.rel='noopener noreferrer';links.append(link);}}
  projectDialog.showModal();
}));

// EDIT HINT: Set EXPERIENCE_INTERVAL_MS to change the auto-scroll delay.
// No duplicate cards: one real event (two images) plus two future entries.
const experienceTrack=document.querySelector('#experience-track');
if(experienceTrack){
  const cards=[...experienceTrack.querySelectorAll('.experience-card')];
  const pauseButton=document.querySelector('#experience-pause');
  const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const EXPERIENCE_INTERVAL_MS=6000;
  let paused=motionPreference.matches,hovered=false,focused=false,visible=false,timer;
  const positions=()=>cards.map(card=>Math.min(experienceTrack.scrollWidth-experienceTrack.clientWidth,Math.max(0,card.offsetLeft-cards[0].offsetLeft)));
  function move(direction){const stops=positions();let current=0;stops.forEach((stop,i)=>{if(Math.abs(stop-experienceTrack.scrollLeft)<Math.abs(stops[current]-experienceTrack.scrollLeft))current=i;});const next=(current+direction+cards.length)%cards.length;experienceTrack.scrollTo({left:stops[next],behavior:motionPreference.matches?'auto':'smooth'});}
  function sync(){clearInterval(timer);pauseButton.textContent=paused?'Play scrolling':'Pause scrolling';pauseButton.setAttribute('aria-pressed',String(paused));if(!paused&&!hovered&&!focused&&visible&&!document.hidden)timer=setInterval(()=>move(1),EXPERIENCE_INTERVAL_MS);}
  pauseButton.addEventListener('click',()=>{paused=!paused;sync();});
  for(const [id,direction] of [['#experience-prev',-1],['#experience-next',1]])document.querySelector(id).addEventListener('click',()=>{paused=true;move(direction);sync();});
  experienceTrack.addEventListener('mouseenter',()=>{hovered=true;sync();});
  experienceTrack.addEventListener('mouseleave',()=>{hovered=false;sync();});
  experienceTrack.addEventListener('focusin',()=>{focused=true;sync();});
  experienceTrack.addEventListener('focusout',event=>{focused=experienceTrack.contains(event.relatedTarget);sync();});
  experienceTrack.addEventListener('pointerdown',()=>{paused=true;sync();},{passive:true});
  experienceTrack.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();paused=true;move(event.key==='ArrowRight'?1:-1);sync();}});
  document.addEventListener('visibilitychange',sync);
  motionPreference.addEventListener('change',()=>{paused=motionPreference.matches;sync();});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.15}).observe(experienceTrack);
  sync();
}
