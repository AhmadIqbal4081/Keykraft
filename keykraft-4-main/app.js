/* Keykraft static site \u2014 vanilla JS animation layer (no framework) */
(function(){
  'use strict'
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var $ = function(s,c){return (c||document).querySelector(s)}
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}
  function on(el,ev,fn,o){ if(el) el.addEventListener(ev,fn,o||false) }

  /* ---------- Home intro ---------- */
  function homeIntro(){
    var app = $('.app.intro-pending'); if(!app) return
    var t = reduce?40:2900
    setTimeout(function(){ app.classList.remove('intro-pending'); app.classList.add('intro-complete') }, t)
  }

  /* ---------- IntersectionObserver reveals ---------- */
  function revealer(sel, cls, threshold){
    var els = $$(sel); if(!els.length) return
    if(reduce || !('IntersectionObserver' in window)){ els.forEach(function(e){e.classList.add(cls)}); return }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add(cls); io.unobserve(en.target) } })
    }, {threshold: threshold})
    els.forEach(function(e){ io.observe(e) })
  }

  /* ---------- CountUp ---------- */
  function countUps(){
    var els = $$('.countup'); if(!els.length) return
    function run(el){
      var end = parseFloat(el.getAttribute('data-end'))||0
      var suffix = el.getAttribute('data-suffix')||''
      if(reduce){ el.textContent = end+suffix; return }
      var dur=1600, start=null
      function step(ts){ if(!start)start=ts; var p=Math.min((ts-start)/dur,1); var ease=1-Math.pow(1-p,3); el.textContent=Math.floor(ease*end)+suffix; if(p<1)requestAnimationFrame(step); else el.textContent=end+suffix }
      requestAnimationFrame(step)
    }
    if(!('IntersectionObserver' in window)){ els.forEach(run); return }
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){run(en.target);io.unobserve(en.target)}})},{threshold:0.4})
    els.forEach(function(e){io.observe(e)})
  }

  /* ---------- FAQ ---------- */
  function faqs(){
    $$('.faq').forEach(function(wrap){
      var items=$$('.faq-item',wrap)
      items.forEach(function(item){
        var q=$('.faq-q',item)
        on(q,'click',function(){
          var isOpen=item.classList.contains('open')
          items.forEach(function(it){ it.classList.remove('open'); var b=$('.faq-q',it); if(b)b.setAttribute('aria-expanded','false') })
          if(!isOpen){ item.classList.add('open'); q.setAttribute('aria-expanded','true') }
        })
      })
    })
  }

  /* ---------- Navbar scroll + mobile menu ---------- */
  function nav(){
    var navbar=$('#navbar')
    function onScroll(){ if(!navbar)return; if(window.scrollY>40)navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled') }
    onScroll(); on(window,'scroll',onScroll,{passive:true})
    var toggle=$('[data-menu-toggle]'), menu=$('[data-menu]')
    function setOpen(open){
      if(!toggle||!menu)return
      toggle.classList.toggle('sm-toggle-open',open)
      toggle.setAttribute('aria-expanded',open?'true':'false')
      menu.classList.toggle('sm-open',open)
      menu.setAttribute('aria-hidden',open?'false':'true')
      document.body.style.overflow=open?'hidden':''
    }
    on(toggle,'click',function(){ setOpen(!menu.classList.contains('sm-open')) })
    $$('[data-menu-link]').forEach(function(l){ on(l,'click',function(){ setOpen(false) }) })
    on(document,'keydown',function(e){ if(e.key==='Escape')setOpen(false) })
  }

  /* ---------- Smooth-scroll for in-page anchors & data-scrollto ---------- */
  function smoothScroll(){
    function go(id){ var t=document.getElementById(id); if(t)t.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}) }
    $$('[data-scrollto]').forEach(function(el){ on(el,'click',function(e){ e.preventDefault(); go(el.getAttribute('data-scrollto')) }) })
    $$('a[href^="#"]').forEach(function(a){
      var href=a.getAttribute('href'); if(href.length<2)return
      on(a,'click',function(e){ var id=href.slice(1); var t=document.getElementById(id); if(t){ e.preventDefault(); go(id) } })
    })
  }

  /* ---------- Magnetic buttons ---------- */
  function magnetic(){
    if(reduce)return
    $$('[data-magnetic]').forEach(function(btn){
      on(btn,'mousemove',function(e){ var r=btn.getBoundingClientRect(); var x=e.clientX-r.left-r.width/2; var y=e.clientY-r.top-r.height/2; btn.style.transform='translate('+(x*0.28)+'px,'+(y*0.4)+'px)' })
      on(btn,'mouseleave',function(){ btn.style.transform='' })
    })
  }

  /* ---------- Spotlight cards ---------- */
  function spotlight(){
    $$('[data-spotlight]').forEach(function(card){
      on(card,'mousemove',function(e){ var r=card.getBoundingClientRect(); card.style.setProperty('--mx',(e.clientX-r.left)+'px'); card.style.setProperty('--my',(e.clientY-r.top)+'px') })
    })
  }

  /* ---------- Tilt cards ---------- */
  function tilt(){
    if(reduce)return
    $$('[data-tilt]').forEach(function(card){
      on(card,'mousemove',function(e){ var r=card.getBoundingClientRect(); var px=(e.clientX-r.left)/r.width-0.5; var py=(e.clientY-r.top)/r.height-0.5; card.style.transform='perspective(800px) rotateY('+(px*10)+'deg) rotateX('+(-py*10)+'deg) translateY(-4px)' })
      on(card,'mouseleave',function(){ card.style.transform='' })
    })
  }

  /* ---------- Stat cards (tilt + spotlight) ---------- */
  function statCards(){
    $$('[data-statcard]').forEach(function(card){
      on(card,'mousemove',function(e){ var r=card.getBoundingClientRect(); var px=(e.clientX-r.left)/r.width-0.5; var py=(e.clientY-r.top)/r.height-0.5; card.style.setProperty('--mx',(e.clientX-r.left)+'px'); card.style.setProperty('--my',(e.clientY-r.top)+'px'); if(!reduce)card.style.transform='perspective(700px) rotateY('+(px*8)+'deg) rotateX('+(-py*8)+'deg)' })
      on(card,'mouseleave',function(){ card.style.transform='' })
    })
  }

  /* ---------- LogoLoop ---------- */
  function logoLoop(){
    $$('[data-logoloop]').forEach(function(loop){
      var track=$('.logoloop__track',loop); if(!track)return
      var speed=parseFloat(loop.getAttribute('data-speed'))||55
      var first=$('.logoloop__list',track); if(!first)return
      var seq=first.getBoundingClientRect().width
      var offset=0, last=null, paused=false
      on(loop,'mouseenter',function(){paused=true}); on(loop,'mouseleave',function(){paused=false})
      if(reduce)return
      function frame(ts){ if(last===null)last=ts; var dt=(ts-last)/1000; last=ts; if(!paused){ offset-=speed*dt; if(seq>0&&-offset>=seq)offset+=seq; track.style.transform='translateX('+offset+'px)' } requestAnimationFrame(frame) }
      requestAnimationFrame(frame)
      on(window,'resize',function(){ var f=$('.logoloop__list',track); if(f)seq=f.getBoundingClientRect().width })
    })
  }

  /* ---------- TrendChart re-animate ---------- */
  function clampS(v){return Math.max(6,Math.min(96,v))}
  function trendCharts(){
    if(reduce)return
    $$('[data-trend]').forEach(function(svg){
      var seed=parseInt(svg.getAttribute('data-seed'),10)||1
      var line=$('.trend-line',svg), area=$('.trend-area',svg)
      var W=260,H=72,N=22
      function series(){ var a=[],v=26+((seed*17)%40); for(var i=0;i<N;i++){ v=clampS(v+Math.sin(i*0.55+seed)*6+(Math.random()-0.45)*8); a.push(v) } return a }
      function draw(){ var p=series(),max=Math.max.apply(null,p),min=Math.min.apply(null,p),span=(max-min)||1; var d=''; for(var i=0;i<p.length;i++){ var x=(i/(p.length-1))*W; var y=H-((p[i]-min)/span)*(H-8)-4; d+=(i===0?'M':'L')+x.toFixed(1)+','+y.toFixed(1)+' ' } if(line)line.setAttribute('d',d.trim()); if(area)area.setAttribute('d',d.trim()+' L'+W+','+H+' L0,'+H+' Z') }
      setInterval(draw,1500)
    })
  }

  /* ---------- RcmSpiral live ---------- */
  function rcmSpiral(){
    $$('.mp-spiral').forEach(function(sp){
      if(reduce||!('IntersectionObserver' in window)){ sp.classList.add('live'); return }
      var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('live');io.unobserve(en.target)}})},{threshold:0.2})
      io.observe(sp)
    })
  }

  /* ---------- Stepper (WebDev process) ---------- */
  function steppers(){
    $$('[data-stepper]').forEach(function(st){
      var count=parseInt(st.getAttribute('data-count'),10)||1
      var dots=$$('[data-step-dot]',st), slides=$$('[data-step-slide]',st), bars=$$('[data-step-bar]',st)
      var prog=$('[data-step-progress]',st), prev=$('[data-step-prev]',st), next=$('[data-step-next]',st)
      var active=0
      function render(){
        dots.forEach(function(d,i){ d.classList.toggle('active',i===active); d.classList.toggle('done',i<=active) })
        slides.forEach(function(s,i){ s.classList.toggle('on',i===active); var v=$('.stepper-video',s); if(v){ if(i===active){ try{v.play()}catch(e){} } else { v.pause() } } })
        bars.forEach(function(b,i){ b.classList.toggle('on',i<=active) })
        if(prog)prog.style.width=(count>1?(active/(count-1))*100:0)+'%'
        if(prev)prev.disabled=active===0
        if(next)next.disabled=active===count-1
      }
      dots.forEach(function(d,i){ on(d,'click',function(){ active=i; render() }) })
      on(prev,'click',function(){ if(active>0){active--;render()} })
      on(next,'click',function(){ if(active<count-1){active++;render()} })
      render()
    })
  }

  /* ---------- Reviews marquee pause ---------- */
  function reviewMarquee(){
    $$('[data-review-marquee]').forEach(function(sec){
      var track=$('.bm-review-track',sec); if(!track)return
      on(sec,'mouseenter',function(){track.classList.add('paused')})
      on(sec,'mouseleave',function(){track.classList.remove('paused')})
    })
  }

  /* ---------- Forms ---------- */
  function forms(){
    var cf=$('[data-contact-form]')
    if(cf){ on(cf,'submit',function(e){ e.preventDefault(); var btn=$('.ct-submit',cf); if(btn){ btn.textContent='Request submitted'; btn.disabled=true }
      var note=$('.ct-sent',cf); if(!note){ note=document.createElement('p'); note.className='ct-sent'; note.textContent='Thanks! We\u2019ll be in touch within one business day.'; cf.appendChild(note) }
      cf.reset(); setTimeout(function(){ if(btn){btn.textContent='Send request';btn.disabled=false} if(note&&note.parentNode)note.parentNode.removeChild(note) },5000) }) }
    var nf=$('[data-newsletter]')
    if(nf){ on(nf,'submit',function(e){ e.preventDefault(); var btn=$('button',nf); if(btn)btn.textContent='Subscribed'; nf.reset(); setTimeout(function(){ if(btn)btn.textContent='Subscribe' },5000) }) }
  }

  /* ---------- ClickSpark ---------- */
  function clickSpark(){
    var cv=$('[data-clickspark]'); if(!cv||reduce)return
    var ctx=cv.getContext('2d'), dpr=window.devicePixelRatio||1, sparks=[]
    var color=cv.getAttribute('data-color')||'#76b900'
    function resize(){ cv.width=window.innerWidth*dpr; cv.height=window.innerHeight*dpr; cv.style.width=window.innerWidth+'px'; cv.style.height=window.innerHeight+'px'; ctx.setTransform(dpr,0,0,dpr,0,0) }
    resize(); on(window,'resize',resize)
    on(window,'click',function(e){ var n=8,size=20; for(var i=0;i<n;i++){ var ang=(2*Math.PI*i)/n; sparks.push({x:e.clientX,y:e.clientY,ang:ang,start:performance.now(),size:size}) } })
    function frame(now){ ctx.clearRect(0,0,cv.width,cv.height); var dur=420; sparks=sparks.filter(function(s){return now-s.start<dur}); ctx.strokeStyle=color; ctx.lineWidth=2; ctx.lineCap='round'
      sparks.forEach(function(s){ var p=(now-s.start)/dur; var ease=1-Math.pow(1-p,3); var d=s.size*ease; var x1=s.x+Math.cos(s.ang)*d, y1=s.y+Math.sin(s.ang)*d; var x2=s.x+Math.cos(s.ang)*(d+8*(1-p)), y2=s.y+Math.sin(s.ang)*(d+8*(1-p)); ctx.globalAlpha=1-p; ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke() }); ctx.globalAlpha=1; requestAnimationFrame(frame) }
    requestAnimationFrame(frame)
  }

  /* ---------- DotGrid ---------- */
  function dotGrid(){
    var cv=$('[data-dotgrid]'); if(!cv)return
    var ctx=cv.getContext('2d'), dpr=window.devicePixelRatio||1, gap=34, mouse={x:-9999,y:-9999}
    function resize(){ var p=cv.parentElement, r=p.getBoundingClientRect(); cv.width=r.width*dpr; cv.height=r.height*dpr; cv.style.width=r.width+'px'; cv.style.height=r.height+'px'; ctx.setTransform(dpr,0,0,dpr,0,0) }
    resize(); on(window,'resize',resize)
    on(cv.parentElement,'mousemove',function(e){ var r=cv.getBoundingClientRect(); mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top })
    on(cv.parentElement,'mouseleave',function(){ mouse.x=-9999; mouse.y=-9999 })
    function frame(){ var w=cv.width/dpr,h=cv.height/dpr; ctx.clearRect(0,0,w,h)
      for(var x=gap;x<w;x+=gap){ for(var y=gap;y<h;y+=gap){ var dx=x-mouse.x,dy=y-mouse.y,dist=Math.sqrt(dx*dx+dy*dy); var near=Math.max(0,1-dist/140); var r=1+near*2.2
        ctx.beginPath(); ctx.arc(x,y,r,0,6.283); ctx.fillStyle=near>0.02?'rgba(118,185,0,'+(0.25+near*0.75)+')':'rgba(255,255,255,0.10)'; ctx.fill() } } if(!reduce)requestAnimationFrame(frame) }
    if(reduce){ frame() } else { requestAnimationFrame(frame) }
  }

  /* ---------- DarkVeil (simplified animated gradient) ---------- */
  function darkVeil(){
    $$('[data-darkveil]').forEach(function(cv){
      var ctx=cv.getContext('2d'), dpr=Math.min(window.devicePixelRatio||1,1.5), t=0
      function resize(){ var p=cv.parentElement||document.body, r=(cv.parentElement?cv.parentElement.getBoundingClientRect():{width:window.innerWidth,height:window.innerHeight}); cv.width=r.width*dpr; cv.height=r.height*dpr; cv.style.width=r.width+'px'; cv.style.height=r.height+'px'; ctx.setTransform(dpr,0,0,dpr,0,0) }
      resize(); on(window,'resize',resize)
      function frame(){ var w=cv.width/dpr,h=cv.height/dpr; ctx.clearRect(0,0,w,h)
        for(var i=0;i<3;i++){ var cx=w*(0.3+0.4*Math.sin(t*0.0004+i*2)); var cy=h*(0.4+0.3*Math.cos(t*0.0005+i*1.7)); var rad=Math.max(w,h)*0.5; var g=ctx.createRadialGradient(cx,cy,0,cx,cy,rad); var a=i===0?0.22:0.12; g.addColorStop(0,'rgba(118,185,0,'+a+')'); g.addColorStop(1,'rgba(118,185,0,0)'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h) }
        t+=16; if(!reduce)requestAnimationFrame(frame) }
      if(reduce)frame(); else requestAnimationFrame(frame)
    })
  }

  /* ---------- GridDistortion (image + subtle drift) ---------- */
  function gridDistortion(){
    $$('[data-griddistortion]').forEach(function(cv){
      var src=cv.getAttribute('data-src'); if(!src)return
      var ctx=cv.getContext('2d'), dpr=Math.min(window.devicePixelRatio||1,1.5), img=new Image(), ready=false, t=0
      img.onload=function(){ ready=true }; img.src=src
      function resize(){ var r=(cv.parentElement?cv.parentElement.getBoundingClientRect():{width:window.innerWidth,height:400}); cv.width=r.width*dpr; cv.height=r.height*dpr; cv.style.width=r.width+'px'; cv.style.height=r.height+'px'; ctx.setTransform(dpr,0,0,dpr,0,0) }
      resize(); on(window,'resize',resize)
      function frame(){ var w=cv.width/dpr,h=cv.height/dpr; ctx.clearRect(0,0,w,h); if(ready){ var scale=Math.max(w/img.width,h/img.height)*1.08; var iw=img.width*scale, ih=img.height*scale; var ox=(w-iw)/2+Math.sin(t*0.0006)*12; var oy=(h-ih)/2+Math.cos(t*0.0007)*12; ctx.globalAlpha=0.55; ctx.drawImage(img,ox,oy,iw,ih); ctx.globalAlpha=1 } t+=16; if(!reduce)requestAnimationFrame(frame) }
      if(reduce)frame(); else requestAnimationFrame(frame)
    })
  }

  /* ---------- boot ---------- */
  function init(){
    homeIntro()
    revealer('.reveal-r','in',0.12)
    revealer('.scroll-float','in',0.25)
    countUps(); faqs(); nav(); smoothScroll(); magnetic(); spotlight(); tilt(); statCards()
    logoLoop(); trendCharts(); rcmSpiral(); steppers(); reviewMarquee(); forms()
    clickSpark(); dotGrid(); darkVeil(); gridDistortion()
  }
  if(document.readyState==='loading') on(document,'DOMContentLoaded',init); else init()
})();
