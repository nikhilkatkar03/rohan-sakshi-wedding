/* ======================================================== */
const $=id=>document.getElementById(id), C=CONFIG;
const TARGET=new Date(C.start).getTime();
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const url=()=>C.siteUrl||location.href.split('#')[0];

/* Details */
$('cDate').textContent=C.dateLabel; $('cTime').textContent=C.timeLabel;
$('cVenue').textContent=C.venueName||'Venue'; $('cLoc').textContent=C.address||C.area;
$('vName').textContent=C.venueName||'Venue name to be announced';
$('vAddr').textContent=C.address||C.area;
const q=encodeURIComponent(C.mapQuery||[C.venueName,C.address,C.area].filter(Boolean).join(', '));
$('map').src='https://www.google.com/maps?q='+q+'&output=embed';
$('mapNote').textContent=(C.venueName||C.address)?'':'The exact venue will be shared soon. This map shows the general area only.';
const dir='https://www.google.com/maps/dir/?api=1&destination='+q;
$('dirBtn').href=dir; $('dir2').href=dir;

/* Calendar */
const f=t=>new Date(t).toISOString().replace(/[-:]|\.\d{3}/g,'');
const wedLoc=[C.venueName,C.address||C.area].filter(Boolean).join(', ');
$('calBtn').href='https://calendar.google.com/calendar/render?action=TEMPLATE&text='+encodeURIComponent(C.groom+' & '+C.bride+' Wedding')
 +'&dates='+f(TARGET)+'/'+f(TARGET+C.durationMinutes*6e4)+'&ctz=Asia/Kolkata&location='+encodeURIComponent(wedLoc)
 +'&details='+encodeURIComponent('Wedding ceremony of '+C.groom+' & '+C.bride+'.');

/* Copy / share */
async function copy(t,el,ok){try{await navigator.clipboard.writeText(t);el.textContent=ok}catch{el.textContent='Copy failed. Please select and copy manually.'}}
$('copyAddr').onclick=()=>copy(wedLoc,$('copyMsg'),'Address copied.');
const msg='You are warmly invited to celebrate the wedding of '+C.groom+' & '+C.bride+' on 2 December 2026 at 12:30 PM in Parali, Beed. We look forward to celebrating this special day with you!';
$('waBtn').href='https://wa.me/?text='+encodeURIComponent(msg+'\n'+url());
$('linkBtn').onclick=()=>copy(url(),$('shareMsg'),'Link copied.');
$('shareBtn').onclick=async()=>{
  if(navigator.share){try{await navigator.share({title:C.groom+' & '+C.bride+' | Wedding Invitation',text:msg,url:url()})}catch{}}
  else copy(msg+' '+url(),$('shareMsg'),'Invitation message and link copied. Paste it anywhere to share.');
};

/* Reception (only if supplied) */
if(C.reception){const r=C.reception,d=document.createElement('div');d.className='card';
 d.innerHTML='<h3></h3><p></p>';d.firstChild.textContent=r.title||'Reception';
 d.lastChild.textContent=[r.date,r.time,r.venue].filter(Boolean).join(' · ');$('reception').append(d)}

/* Story / gallery (only if supplied) */
if(C.story.length){$('story').classList.remove('hide');C.story.forEach(s=>{const a=document.createElement('article');
 const h=document.createElement('h3');h.textContent=s.title;const p=document.createElement('p');p.textContent=s.text;a.append(h,p);$('tl').append(a)})}
if(C.gallery.length){$('gallery').classList.remove('hide');C.gallery.forEach(g=>{const i=document.createElement('img');
 i.src=g.src;i.alt=g.alt||'';i.loading='lazy';i.tabIndex=0;
 const open=()=>{const b=$('lb');b.querySelector('img').src=g.src;b.querySelector('img').alt=g.alt||'';b.classList.add('on');$('lbX').focus()};
 i.onclick=open;i.onkeydown=e=>{if(e.key==='Enter')open()};$('grid').append(i)})}
const closeLb=()=>$('lb').classList.remove('on');
$('lbX').onclick=closeLb;$('lb').onclick=e=>{if(e.target.id==='lb')closeLb()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});

/* RSVP */
if(C.rsvpEndpoint){$('rsvp').classList.remove('hide');
$('rsvpForm').onsubmit=async e=>{e.preventDefault();const m=$('fmsg'),fd=new FormData(e.target);
 m.className='';
 if(!fd.get('name').trim()){m.className='err';m.textContent='Please enter your name.';return}
 if(!fd.get('attending')){m.className='err';m.textContent='Please choose Joyfully Accept or Regretfully Decline.';return}
 const g=+fd.get('guests');if(!(g>=1&&g<=10)){m.className='err';m.textContent='Guests must be between 1 and 10.';return}
 m.textContent='Sending…';
 try{const r=await fetch(C.rsvpEndpoint,{method:'POST',body:fd,headers:{Accept:'application/json'}});
  if(!r.ok)throw 0;m.className='ok';m.textContent='Thank you! Your RSVP was received.';e.target.reset()}
 catch{m.className='err';m.textContent='Your RSVP could not be sent. Please try again.'}}}

/* Countdown (IST target, independent of visitor time zone) */
const ist=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata'});
const pad=n=>String(n).padStart(2,'0'), last={};
function set(k,v){if(last[k]!==v){last[k]=v;const e=$(k);e.textContent=v;if(!reduce&&last.ready){e.classList.remove('tick');void e.offsetWidth;e.classList.add('tick')}}}
function tick(){
  const now=Date.now(),diff=TARGET-now,msg=$('cdMsg');
  if(diff>0){const t=Math.floor(diff/1000);
    set('d',pad(Math.floor(t/86400)));set('h',pad(Math.floor(t%86400/3600)));set('m',pad(Math.floor(t%3600/60)));set('s',pad(t%60));
    $('cd').classList.remove('hide');$('cdLead').classList.remove('hide');msg.classList.add('hide');last.ready=1;return}
  $('cd').classList.add('hide');$('cdLead').classList.add('hide');msg.classList.remove('hide');
  msg.textContent=ist.format(now)===ist.format(TARGET)?'Today is the Wedding Day! Join us in celebrating '+C.groom+' & '+C.bride+'.':'A beautiful beginning. A love that lasts forever.';
}
tick();setInterval(tick,1000);

/* Opening */
$('openBtn').onclick=()=>{$('gate').classList.add('open');document.body.classList.add('in');document.body.classList.remove('locked');
 scrollTo(0,0);setTimeout(()=>$('gate').remove(),1700);reveal()};
function reveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}}),{threshold:.15});
 document.querySelectorAll('.rev').forEach(el=>io.observe(el))}

/* Petals */
if(!reduce){const p=$('petals');for(let i=0;i<10;i++){const s=document.createElement('i');s.className='petal';
 s.style.left=Math.random()*100+'%';s.style.animationDuration=(14+Math.random()*12)+'s';s.style.animationDelay=(-Math.random()*20)+'s';p.append(s)}}

/* Music (user-initiated only) */
if(C.musicUrl){const a=$('aud'),b=$('music');a.src=C.musicUrl;b.classList.remove('hide');
 b.onclick=async()=>{try{if(a.paused){await a.play();b.setAttribute('aria-pressed','true');b.textContent='❚❚';b.setAttribute('aria-label','Pause music')}
  else{a.pause();b.setAttribute('aria-pressed','false');b.textContent='♪';b.setAttribute('aria-label','Play background music')}}catch{b.setAttribute('aria-label','Music could not be played')}}}
