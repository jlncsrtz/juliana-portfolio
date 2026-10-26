const projects = [
 {type:'SELECTED CASE STUDY / 001',className:'greensort',watermark:'GS.',sticker:'DESIGNED<br>TO MAKE<br>A DIFFERENCE ✳',title:'GreenSort',summary:'Created Figma wireframes, interactive prototypes, mobile app UI and web admin dashboard; also contributed to frontend development and usability testing.',role:'UI/UX • FRONTEND',url:null,art:`<div class="greensort-visual"><img src="assets/greensort/overview-light.webp" alt="GreenSort admin Overview screenshot with record details obscured" width="1600" height="1000"></div>`},
 {type:'SELECTED CASE STUDY / 002',className:'peakathlete',watermark:'PA.',sticker:'FORM MEETS<br>FUNCTION<br>↗',title:'PeakAthlete',summary:'Designed the UI/UX of an online clothing business website; researched visual approaches aligned with the products and explored e-commerce marketing and website traffic strategies.',role:'E-COMMERCE • UX RESEARCH',url:'https://peakathlete.co',art:`<div class="product-hero"><div class="product-card-back">MOVE<br>DIFFERENT.</div><div class="product-card"><span class="product-brand">PEAK / ATHLETE</span><span class="product-line">BUILT FOR MOVEMENT</span><span class="product-icon">PA.</span><span class="product-footer">THE EVERYDAY ATHLETE COLLECTION →</span></div></div>`},
 {type:'SELECTED CASE STUDY / 003',className:'bherlyn',watermark:'BS.',sticker:'A CLIENT<br>STORY<br>✳',title:'Bherlyn Store',summary:'Created a Shopify-based e-commerce website for a general store client, with attention to website presentation and the online shopping experience.',role:'SHOPIFY • CLIENT WEBSITE',url:'https://bherlynstore.myshopify.com',art:`<div class="store-mock"><div class="store-bar"><span>bherlyn / store</span><span>ALL THINGS EVERYDAY &nbsp; ↗</span></div><div class="store-center"><span class="store-type">Little things.<br><em>Big delight.</em></span><div class="store-baskets"><span></span><span></span><span></span></div></div><div class="store-footer">DISCOVER SOMETHING NEW ↗</div></div>`}
];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const externalLink = document.getElementById('project-external');
const tabs=Array.from(document.querySelectorAll('.archive-tab'));
const stage=document.querySelector('.project-stage');
const stageArt=document.getElementById('stage-art');
function selectProject(i,focus=false){const p=projects[i];if(!p)return;tabs.forEach((tab,n)=>{let selected=n===i;tab.classList.toggle('active',selected);tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1});stage.setAttribute('aria-labelledby',`tab-${i}`);document.getElementById('stage-type').textContent=p.type;document.getElementById('stage-title').textContent=p.title;document.getElementById('stage-summary').textContent=p.summary;document.getElementById('stage-role').textContent=p.role;externalLink.hidden=!p.url;if(p.url)externalLink.href=p.url;stageArt.className=`stage-art ${p.className}`;stageArt.innerHTML=`${p.art}<div class="stage-watermark">${p.watermark}</div><div class="stage-sticker">${p.sticker}</div>`;stageArt.classList.remove('transitioning');document.getElementById('greensort-gallery').hidden=i!==0;if(i===0)updateGreenSortImage(activeGreenSortImage);if(focus)tabs[i].focus()}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectProject(i));tab.addEventListener('keydown',ev=>{if(ev.key==='ArrowRight'||ev.key==='ArrowDown'){ev.preventDefault();selectProject((i+1)%tabs.length,true)}if(ev.key==='ArrowLeft'||ev.key==='ArrowUp'){ev.preventDefault();selectProject((i+tabs.length-1)%tabs.length,true)}if(ev.key==='Home'){ev.preventDefault();selectProject(0,true)}if(ev.key==='End'){ev.preventDefault();selectProject(tabs.length-1,true)}})});

// Lightweight progressive enhancement; core content and navigation work without JS.
const progressBar = document.getElementById('scroll-progress-bar');
let pendingScroll = false;
function updateProgress() {
 const max = document.documentElement.scrollHeight - window.innerHeight;
 progressBar.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY/max)) : 0})`;
 pendingScroll = false;
}
window.addEventListener('scroll', () => { if (!pendingScroll) { pendingScroll = true; requestAnimationFrame(updateProgress); } }, {passive:true});
window.addEventListener('resize', updateProgress, {passive:true});
updateProgress();
const navLinks = document.querySelectorAll('.nav a');
if ('IntersectionObserver' in window) {
 const spy = new IntersectionObserver(entries => {
   entries.forEach(entry => {
     if (!entry.isIntersecting) return;
     navLinks.forEach(a => {
       if (a.getAttribute('href') === '#'+entry.target.id) a.setAttribute('aria-current','location');
       else a.removeAttribute('aria-current');
     });
   });
 },{rootMargin:'-25% 0px -60% 0px'});
 document.querySelectorAll('#work,#story,#contact').forEach(section=>spy.observe(section));
}
// Tabbing into a project is equivalent to clicking it; no hover-only interaction.

// Instant theme change, with no ripple, blocking overlay or animation.
const themeSwitch=document.getElementById('theme-switch');
const prefersDark=window.matchMedia('(prefers-color-scheme: dark)');
let theme;
try {theme=localStorage.getItem('juliana-theme') || (prefersDark.matches?'dark':'light');}
catch(e){theme=prefersDark.matches?'dark':'light';}
function applyTheme(next){
 theme=next;
 document.documentElement.dataset.theme=next;
 themeSwitch.setAttribute('aria-pressed',String(next==='dark'));
 themeSwitch.setAttribute('aria-label',`Switch to ${next==='dark'?'light':'dark'} mode`);
 themeSwitch.querySelector('.theme-icon').textContent=next==='dark'?'☀':'☾';
 themeSwitch.querySelector('.theme-label').textContent=next==='dark'?'Light':'Dark';
 document.querySelector('meta[name="theme-color"]').content=next==='dark'?'#160b25':'#f6f2ed';
}
applyTheme(theme);
themeSwitch.addEventListener('click',()=>{
 const next=theme==='light'?'dark':'light';
 applyTheme(next);
 try {localStorage.setItem('juliana-theme',next);} catch(e){}
});
// Case study quick previews without implying a finished case study.
const dialog=document.getElementById('project-dialog');
document.getElementById('quick-view').addEventListener('click',()=>{
 const p=projects[tabs.findIndex(t=>t.getAttribute('aria-selected')==='true')] || projects[0];
 document.getElementById('dialog-title').textContent=p.title;
 document.getElementById('dialog-role').textContent=p.role;
 document.getElementById('dialog-description').textContent=p.summary;
 const link=document.getElementById('dialog-link');link.hidden=!p.url;if(p.url)link.href=p.url;
 dialog.showModal();
});
document.getElementById('dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
// Small, accessible controls.
const toast=document.getElementById('toast');let toastTimeout;
function showToast(msg){toast.textContent=msg;toast.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('visible'),2400)}
document.getElementById('copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('Julicasortiz@gmail.com');showToast('Email copied to clipboard')}catch{showToast('Email: Julicasortiz@gmail.com')}});
const backTop=document.getElementById('back-top');
const updateBackTop=()=>backTop.classList.toggle('visible',scrollY>450);
window.addEventListener('scroll',updateBackTop,{passive:true});updateBackTop();
backTop.addEventListener('click',()=>scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'}));
document.querySelectorAll('.skill-filter').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;
 document.querySelectorAll('.skill-filter').forEach(b=>{const current=b===button;b.classList.toggle('is-active',current);b.setAttribute('aria-pressed',String(current))});
 document.querySelectorAll('[data-skill]').forEach(tag=>tag.hidden=filter!=='all'&&tag.dataset.skill!==filter);
}));
// Kinetic text is driven by scroll with one RAF, disabled for reduced motion.
const kinetic=document.querySelector('.kinetic-inner');let kineticPending=false;
window.addEventListener('scroll',()=>{if(kineticPending||reducedMotion.matches)return;kineticPending=true;requestAnimationFrame(()=>{const rect=kinetic.parentElement.getBoundingClientRect();if(rect.top<innerHeight&&rect.bottom>0){const shift=(innerHeight-rect.top)*-.12;kinetic.style.transform=`translate3d(${shift}px,0,0)`}kineticPending=false})},{passive:true});

// Highlight the visible section to make navigation state easier to understand.
const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const watchedSections = sectionLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const active = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if (!active) return;
    sectionLinks.forEach(a => { if (a.getAttribute('href') === '#'+active.target.id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
  }, {rootMargin:'-25% 0px -55% 0px',threshold:[0,.1,.4]});
  watchedSections.forEach(section => observer.observe(section));
}

// Real screenshot gallery for GreenSort. No layout shifts when changing projects.
const greensortSources={
 'overview-light':['overview-light','GreenSort admin Overview, light mode'],
 'overview-dark':['overview-dark','GreenSort admin Overview, dark mode'],
 'surrender-logs':['surrender-logs','GreenSort Surrender Logs screen'],
 'accounting':['accounting','GreenSort Accounting screen']
};
let activeGreenSortImage='overview-light';
function updateGreenSortImage(key){
 const item=greensortSources[key];if(!item)return;
 activeGreenSortImage=key;
 const img=stageArt.querySelector('.greensort-visual img');
 if(img){img.src=`assets/greensort/${item[0]}.webp`;img.alt=`${item[1]}; record details obscured`;}
 document.querySelectorAll('.gallery-choice').forEach(b=>{let on=b.dataset.img===key;b.classList.toggle('is-current',on);b.setAttribute('aria-pressed',String(on));});
}
document.querySelectorAll('.gallery-choice').forEach(b=>b.addEventListener('click',()=>updateGreenSortImage(b.dataset.img)));
