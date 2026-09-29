(function () {
'use strict';

/* Keykraft chat widget: a self-contained FAQ assistant.
   Needs: chat/knowledge.js + chat/engine.js (loaded before this file).
   No network calls, no third-party services. */

var C = window.KK_CHAT || {};
if (C.enabled === false) return;
if (!window.KKBot) { console.warn('[Keykraft chat] engine.js / knowledge.js not loaded'); return; }

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
/* escape first, then allow only **bold** */
function rich(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
function safeUrl(u) { return /^(https?:|mailto:|tel:)/i.test(u) ? u : '#'; }

var T = {
  title: C.title || 'Support',
  status: C.status || 'Online',
  label: C.label || 'Chat with us',
  greeting: C.greeting || 'Hi there! How can we help you today?',
  sub: C.subtitle || ''
};
var SUGGESTIONS = (C.suggestions || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
var STORE_KEY = 'kk_chat_v1';

customElements.define('kk-chat', class extends HTMLElement {
  connectedCallback() {
    var sr = this.attachShadow({ mode: 'open' });
    var pos = (C.position === 'left') ? 'left' : 'right';
    var off = C.offset || '24px';
    var accent = C.accentBg || '';
    var grad = accent ? 'linear-gradient(135deg,' + accent + ',' + accent + ')'
                      : '#76b900';

    sr.innerHTML = `
<style>
:host{all:initial;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;}
*{box-sizing:border-box;margin:0;padding:0;}
:host{--grad:${grad};--accent:#76b900;--on-accent:#000;--panel:rgba(13,13,13,.96);--surface:#161616;--line:rgba(255,255,255,.1);--text:#fff;--muted:#b7b7b7;}
.wrap{position:fixed;${pos}:${off};bottom:24px;z-index:2147483001;display:flex;flex-direction:column;align-items:${pos === 'left' ? 'flex-start' : 'flex-end'};gap:14px;pointer-events:none;}
.wrap>*{pointer-events:auto;}
.launcher{position:relative;display:flex;align-items:center;gap:12px;flex-direction:${pos === 'left' ? 'row' : 'row-reverse'};}
.fab{position:relative;width:60px;height:60px;border-radius:50%;border:none;cursor:pointer;background:var(--grad);color:var(--on-accent);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(118,185,0,.35),0 0 0 1px rgba(255,255,255,.12) inset;transition:transform .25s cubic-bezier(.3,1.4,.5,1);}
.fab:hover{transform:scale(1.08) rotate(-4deg);}
.fab:active{transform:scale(.95);}
.fab::before{content:"";position:absolute;inset:0;border-radius:50%;background:var(--grad);opacity:.55;z-index:-1;animation:pulse 2.4s ease-out infinite;}
@keyframes pulse{0%{transform:scale(1);opacity:.55;}100%{transform:scale(1.7);opacity:0;}}
.fab svg{width:28px;height:28px;position:absolute;transition:transform .3s,opacity .25s;}
.fab .i-close{opacity:0;transform:rotate(-90deg) scale(.5);}
.open .fab .i-chat{opacity:0;transform:rotate(90deg) scale(.5);}
.open .fab .i-close{opacity:1;transform:none;}
.open .fab::before{animation:none;opacity:0;}
.badge{position:absolute;top:2px;${pos}:2px;width:14px;height:14px;border-radius:50%;background:#fff;border:2px solid #000;}
.hint{background:rgba(13,13,13,.95);color:var(--text);padding:10px 16px;border-radius:14px;font-size:14px;font-weight:500;border:1px solid var(--line);box-shadow:0 8px 24px rgba(0,0,0,.4);cursor:pointer;white-space:nowrap;animation:pop .5s .6s both cubic-bezier(.3,1.4,.5,1);backdrop-filter:blur(10px);}
.open .hint{display:none;}
@keyframes pop{from{opacity:0;transform:translateY(8px) scale(.9);}to{opacity:1;transform:none;}}
.panel{width:380px;max-width:calc(100vw - 32px);height:600px;max-height:calc(100vh - 130px);display:none;flex-direction:column;overflow:hidden;border-radius:${C.borderRadius || '22px'};background:var(--panel);backdrop-filter:blur(24px) saturate(140%);-webkit-backdrop-filter:blur(24px) saturate(140%);border:1px solid var(--line);box-shadow:0 24px 70px rgba(0,0,0,.6),0 0 60px rgba(118,185,0,.12);transform-origin:bottom ${pos};}
.open .panel{display:flex;animation:openP .35s cubic-bezier(.2,1.1,.3,1);}
@keyframes openP{from{opacity:0;transform:translateY(20px) scale(.92);}to{opacity:1;transform:none;}}
.head{position:relative;display:flex;align-items:center;gap:12px;padding:16px 18px;background:var(--surface);color:var(--text);border-bottom:1px solid var(--line);overflow:hidden;}
.head::after{content:"";position:absolute;width:180px;height:180px;right:-50px;top:-90px;border-radius:50%;background:rgba(118,185,0,.12);}
.avatar{position:relative;width:42px;height:42px;border-radius:50%;background:#000;color:var(--accent);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1.5px solid var(--accent);}
.avatar svg{width:22px;height:22px;}
.avatar i{position:absolute;right:-1px;bottom:-1px;width:12px;height:12px;border-radius:50%;background:var(--accent);border:2px solid var(--surface);}
.hinfo{flex:1;min-width:0;position:relative;z-index:1;}
.hinfo b{display:block;font-size:16px;font-weight:600;}
.hinfo span{font-size:12px;opacity:.85;}
.xbtn{position:relative;z-index:1;background:rgba(255,255,255,.08);border:none;color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
.xbtn:hover{background:rgba(255,255,255,.16);}
.xbtn svg{width:16px;height:16px;}
.msgs{flex:1;overflow-y:auto;padding:18px 16px 8px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;}
.msgs::-webkit-scrollbar{width:6px;}.msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:6px;}
.welcome{text-align:center;padding:18px 8px 6px;animation:pop .5s both;}
.welcome .wav{width:60px;height:60px;margin:0 auto 12px;border-radius:50%;background:var(--grad);display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(118,185,0,.3);}
.welcome .wav svg{width:30px;height:30px;color:var(--on-accent);}
.welcome h3{color:var(--text);font-size:18px;font-weight:600;margin-bottom:6px;}
.welcome p{color:var(--muted);font-size:13px;}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px;}
.welcome .chips{justify-content:center;margin-top:16px;}
.chip{background:rgba(255,255,255,.05);color:var(--text);border:1px solid rgba(118,185,0,.45);border-radius:999px;padding:7px 13px;font-size:13px;cursor:pointer;font-family:inherit;transition:all .2s;}
.chip:hover{background:var(--grad);color:var(--on-accent);border-color:transparent;transform:translateY(-2px);}
.row{display:flex;flex-direction:column;max-width:86%;animation:msgIn .28s ease-out;}
.row.user{align-self:flex-end;align-items:flex-end;}
.row.agent{align-self:flex-start;align-items:flex-start;}
@keyframes msgIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
.bubble{padding:10px 14px;font-size:14px;line-height:1.5;word-break:break-word;white-space:pre-wrap;}
.bubble strong{font-weight:600;color:#fff;}
.user .bubble{background:var(--grad);color:var(--on-accent);border-radius:18px 18px 4px 18px;box-shadow:0 4px 14px rgba(118,185,0,.25);}
.agent .bubble{background:var(--surface);color:var(--text);border-radius:18px 18px 18px 4px;border:1px solid var(--line);}
.links{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}
.lk{display:inline-flex;align-items:center;gap:4px;background:rgba(118,185,0,.12);color:var(--accent);border:1px solid rgba(118,185,0,.5);border-radius:999px;padding:6px 12px;font-size:12.5px;font-weight:500;text-decoration:none;transition:all .2s;}
.lk:hover{background:var(--grad);color:var(--on-accent);border-color:transparent;}
.time{font-size:11px;color:var(--muted);margin-top:4px;padding:0 4px;}
.typing{align-self:flex-start;display:flex;gap:5px;padding:13px 15px;background:var(--surface);border:1px solid var(--line);border-radius:18px 18px 18px 4px;}
.typing i{width:7px;height:7px;border-radius:50%;background:var(--accent);animation:bn 1.2s infinite;}
.typing i:nth-child(2){animation-delay:.15s;}.typing i:nth-child(3){animation-delay:.3s;}
@keyframes bn{0%,80%,100%{transform:translateY(0);opacity:.5;}40%{transform:translateY(-6px);opacity:1;}}
.foot{padding:12px 14px 10px;border-top:1px solid var(--line);}
.field{display:flex;align-items:flex-end;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:22px;padding:5px 5px 5px 16px;transition:border-color .2s,box-shadow .2s;}
.field:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px rgba(118,185,0,.2);}
textarea{flex:1;resize:none;background:transparent;border:none;outline:none;color:var(--text);font:14px/1.4 inherit;font-family:inherit;padding:8px 0;max-height:110px;}
textarea::placeholder{color:var(--muted);}
.send{flex-shrink:0;width:38px;height:38px;border:none;border-radius:50%;background:var(--grad);color:var(--on-accent);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s,opacity .2s;}
.send:hover{transform:scale(1.08);}
.send:disabled{opacity:.35;cursor:default;transform:none;}
.send svg{width:18px;height:18px;}
.powered{text-align:center;font-size:10.5px;color:var(--muted);margin-top:8px;opacity:.7;}
@media(max-width:480px){.wrap{${pos}:16px;bottom:16px;}.panel{width:calc(100vw - 32px);height:calc(100vh - 110px);}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;}}
</style>
<div class="wrap" id="wrap">
  <div class="panel" id="panel" role="dialog" aria-label="${esc(T.title)}">
    <div class="head">
      <div class="avatar"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.9 14.5L2 22l5.7-1.5A10 10 0 1 0 12 2Zm-3 11a1.3 1.3 0 1 1 0-2.6A1.3 1.3 0 0 1 9 13Zm3 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm3 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"/></svg><i></i></div>
      <div class="hinfo"><b>${esc(T.title)}</b><span>${esc(T.status)}</span></div>
      <button class="xbtn" id="min" aria-label="Close chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg></button>
    </div>
    <div class="msgs" id="msgs" aria-live="polite">
      <div class="welcome" id="welcome">
        <div class="wav"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 4.5A1.5 1.5 0 0 0 3 6v9a1.5 1.5 0 0 0 1.5 1.5h1.75l-.19 2.28a.5.5 0 0 0 .82.43L10.5 16.5H19.5A1.5 1.5 0 0 0 21 15V6a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg></div>
        <h3>${esc(T.greeting)}</h3>
        <p>${esc(T.sub)}</p>
        <div class="chips" id="chips"></div>
      </div>
    </div>
    <div class="foot">
      <div class="field">
        <textarea id="inp" rows="1" placeholder="Type your question..." aria-label="Message"></textarea>
        <button class="send" id="send" aria-label="Send" disabled><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 3.4 21 12 3.4 20.6V14l12.6-2L3.4 10V3.4Z"/></svg></button>
      </div>
      <div class="powered">Automated assistant &middot; Enter to send</div>
    </div>
  </div>
  <div class="launcher">
    <button class="fab" id="fab" aria-label="Open chat" aria-expanded="false">
      <svg class="i-chat" viewBox="0 0 24 24" fill="currentColor"><path d="M4.5 4.5A1.5 1.5 0 0 0 3 6v9a1.5 1.5 0 0 0 1.5 1.5h1.75l-.19 2.28a.5.5 0 0 0 .82.43L10.5 16.5H19.5A1.5 1.5 0 0 0 21 15V6a1.5 1.5 0 0 0-1.5-1.5h-15Z"/></svg>
      <svg class="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      <span class="badge"></span>
    </button>
    <div class="hint" id="hint">${esc(T.label)}</div>
  </div>
</div>`;

    var $ = function (id) { return sr.getElementById(id); };
    var wrap = $('wrap'), msgs = $('msgs'), inp = $('inp'), sendBtn = $('send');
    var welcome = $('welcome'), welcomeChips = $('chips');
    var typing = null, chipRow = null, busy = false, history = [];

    /* ---------- open / close ---------- */
    function setOpen(o) {
      wrap.classList.toggle('open', o);
      $('fab').setAttribute('aria-expanded', o ? 'true' : 'false');
      if (o) setTimeout(function () { inp.focus(); toBottom(); }, 250);
    }
    $('fab').onclick = function () { setOpen(!wrap.classList.contains('open')); };
    $('hint').onclick = function () { setOpen(true); };
    $('min').onclick = function () { setOpen(false); };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    /* ---------- helpers ---------- */
    function toBottom() { msgs.scrollTop = msgs.scrollHeight; }
    function clock() { return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); }
    function dropWelcome() { if (welcome) { welcome.remove(); welcome = null; } }
    function dropChips() { if (chipRow) { chipRow.remove(); chipRow = null; } }
    function save() {
      if (C.remember === false) return;
      try { sessionStorage.setItem(STORE_KEY, JSON.stringify(history.slice(-40))); } catch (e) {}
    }

    function addUser(text) {
      var r = document.createElement('div'); r.className = 'row user';
      r.innerHTML = '<div class="bubble">' + esc(text) + '</div><div class="time">' + clock() + '</div>';
      msgs.appendChild(r); toBottom();
    }

    function addBot(text, links, fu) {
      var r = document.createElement('div'); r.className = 'row agent';
      var html = '<div class="bubble">' + rich(text) + '</div>';
      if (links && links.length) {
        html += '<div class="links">' + links.map(function (k) {
          return '<a class="lk" target="_blank" rel="noopener noreferrer" href="' + esc(safeUrl(k.u)) + '">' + esc(k.l) + ' &#8599;</a>';
        }).join('') + '</div>';
      }
      html += '<div class="time">' + clock() + '</div>';
      r.innerHTML = html;
      msgs.appendChild(r);

      if (fu && fu.length) {
        chipRow = document.createElement('div'); chipRow.className = 'chips';
        fu.forEach(function (f) {
          var b = document.createElement('button'); b.className = 'chip'; b.textContent = f.label;
          b.onclick = function () { ask(f.label, f.id); };
          chipRow.appendChild(b);
        });
        msgs.appendChild(chipRow);
      }
      toBottom();
    }

    function startTyping() {
      if (typing) return;
      typing = document.createElement('div'); typing.className = 'typing';
      typing.innerHTML = '<i></i><i></i><i></i>';
      msgs.appendChild(typing); toBottom();
    }
    function stopTyping() { if (typing) { typing.remove(); typing = null; } }

    /* ---------- ask → answer (all local) ---------- */
    function ask(text, forcedId) {
      text = (text || '').trim();
      if (!text || busy) return;
      busy = true;
      dropWelcome(); dropChips();
      addUser(text);
      history.push({ r: 'u', t: text });
      inp.value = ''; inp.style.height = ''; sendBtn.disabled = true;
      startTyping();

      var res = forcedId ? window.KKBot.answerById(forcedId) : window.KKBot.reply(text);
      var delay = 350 + Math.min(res.text.length * 6, 700);   // a short "thinking" pause feels natural
      setTimeout(function () {
        stopTyping();
        addBot(res.text, res.links, res.followups);
        history.push({ r: 'b', t: res.text, l: res.links, f: res.followups });
        save();
        busy = false;
      }, delay);
    }

    /* ---------- welcome chips ---------- */
    SUGGESTIONS.forEach(function (s) {
      var c = document.createElement('button'); c.className = 'chip'; c.textContent = s;
      c.onclick = function () { ask(s); };
      welcomeChips.appendChild(c);
    });

    /* ---------- input ---------- */
    inp.addEventListener('input', function () {
      this.style.height = ''; this.style.height = Math.min(this.scrollHeight, 110) + 'px';
      sendBtn.disabled = !this.value.trim();
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(inp.value); }
    });
    sendBtn.onclick = function () { ask(inp.value); };

    /* ---------- restore earlier conversation ---------- */
    if (C.remember !== false) {
      try {
        var saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]');
        if (Array.isArray(saved) && saved.length) {
          dropWelcome();
          saved.forEach(function (m, i) {
            if (m.r === 'u') addUser(m.t);
            else addBot(m.t, m.l, i === saved.length - 1 ? m.f : null);
          });
          history = saved;
        }
      } catch (e) {}
    }
  }
});

function mount() {
  if (!document.querySelector('kk-chat')) document.body.appendChild(document.createElement('kk-chat'));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();

})();
