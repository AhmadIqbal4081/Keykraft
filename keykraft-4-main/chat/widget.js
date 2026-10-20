/* Keykraft chat widget (UI from the supplied widget, answers from chat/knowledge.js + chat/engine.js). Self-mounting. */
(function(){
if(document.querySelector('shopify-chat'))return;
if(!window.KKBot){console.warn('[Keykraft chat] knowledge.js / engine.js not loaded');return;}
var st=document.createElement('style');
st.textContent=":root{\n  --shopify-chat-bg-color:#FFFFFF;\n  --shopify-chat-text-color:#000000;\n  --shopify-chat-accent-bg-color:#000000;\n  --shopify-chat-accent-text-color:#FFFFFF;\n  --shopify-chat-activator-offset:20px;\n  --shopify-chat-activator-font-size:13px;\n  --shopify-chat-border-radius:16px;\n  --shopify-chat-z-index:2147483000;\n  --shopify-chat-body-font-family:system-ui,-apple-system,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif;\n  --shopify-chat-heading-font-family:var(--shopify-chat-body-font-family);\n}";
document.head.appendChild(st);
function mount(){var el=document.createElement('shopify-chat');el.setAttribute('view','chat');document.body.appendChild(el);}
var run=function(){
(function(){
'use strict';

/* ================= ORIGINAL CSS (from dump) ================= */

const RESET = `
:host{all:initial;font-family:inherit;contain:layout;font-synthesis:none;-webkit-font-smoothing:antialiased;text-rendering:geometricprecision;interpolate-size:allow-keywords}
*,::before,::after{box-sizing:border-box;transition-behavior:allow-discrete}
*{margin:0;padding:0}
img,picture,video,canvas,svg{display:block;max-width:100%}
input,button,textarea,select{font:inherit;border:0;outline:none}
textarea{resize:none}
button{appearance:none;cursor:pointer;padding:0;color:inherit;background:transparent;border-radius:0}
:where(a[href=""]){pointer-events:none;cursor:default;color:inherit;text-decoration:none}
p,h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}
p{text-wrap:pretty}
h1,h2,h3,h4,h5,h6{text-wrap:balance}
ol,ul{list-style:none}
code{font-family:monospace}
svg:not(:root){overflow:hidden}
[hidden]{display:none!important}
`;

const VARS = `
:root,#shopify-element-wrapper{--private-spacing-ty:2px;--private-spacing-xxs:4px;--private-spacing-xs:8px;--private-spacing-sm:12px;--private-spacing-md:10px;--private-spacing-lg:16px;--private-spacing-xl:20px;--private-spacing-xxl:26px;--private-spacing-huge:32px;--private-conversation-inset:var(--private-spacing-xl);--private-motion-speed:.15s;--private-motion-speed-slow:.32s;--private-motion-speed-slower:.4s;--private-motion-ease:cubic-bezier(.25,0,.1,1);--private-motion-spring:linear(0,.025 2.8%,.101 6.1%,.539 18.9%,.721 25.3%,.849 31.5%,.937 38.1%,.991 45.7%,1.015 55%,1.017 63.9%,1.001);--private-bg-blur-soft:6px;--private-bg-blur:12px;--private-border-width:1px;--private-radius-base:var(--shopify-chat-border-radius,16px);--private-radius-xxs:calc(var(--private-radius-base)*.25);--private-radius-xs:calc(var(--private-radius-base)*.5);--private-radius-sm:calc(var(--private-radius-base)*.625);--private-radius-md:calc(var(--private-radius-base)*.75);--private-radius-lg:var(--private-radius-base);--private-radius-xl:calc(var(--private-radius-base)*1.25);--private-radius-xxl:calc(var(--private-radius-base)*1.5);--private-radius-full:9999px;--private-button-size:32px;--private-button-icon-size:16px;--private-button-divider-width:1px;--private-button-border-color:rgb(0,0,0,.06);--private-input-border-color:rgb(0,0,0,.08);--private-input-shadow-color:rgb(0,0,0,.05);--private-panel-shadow:-24px 0 48px rgb(0,0,0,.2);--private-jump-to-latest-shadow:0 8px 40px rgb(0,0,0,.24);--private-button-shadow:0 2px 6px 0 var(--private-button-border-color);--private-message-shadow:0 2px 8px 0 rgb(0,0,0,.1);--private-card-image-border:.5px solid hsla(210,88%,16%,.1);--private-card-shadow:0 5px 5px -2.5px rgba(0,0,0,.03),0 3px 3px -1.5px rgba(0,0,0,.02),0 2px 2px -1px rgba(0,0,0,.02),0 1px 1px -.5px rgba(0,0,0,.03),0 .5px .5px 0 rgba(0,0,0,.04),0 0 0 1px rgba(0,0,0,.06);--private-card-shadow-hover:0 5px 5px -2.5px rgba(0,0,0,.05),0 3px 3px -1.5px rgba(0,0,0,.04),0 2px 2px -1px rgba(0,0,0,.04),0 1px 1px -.5px rgba(0,0,0,.05),0 .5px .5px 0 rgba(0,0,0,.06),0 0 0 1px rgba(0,0,0,.1);--private-input-shadow:0 5px 16px -2.5px var(--private-input-shadow-color),0 4px 8px -2px var(--private-input-shadow-color),0 3px 4px -1.5px var(--private-input-shadow-color),0 2px 2px -1px var(--private-input-shadow-color),0 0 0 1px var(--private-input-border-color);--private-font-size-base:var(--shopify-chat-font-size,14px);--private-font-size-step:calc(var(--private-font-size-base)/14);--private-font-size-xxs:calc(var(--private-font-size-step)*10);--private-font-size-xs:calc(var(--private-font-size-step)*11);--private-font-size-sm:calc(var(--private-font-size-step)*12);--private-form-control-font-size:calc(var(--private-font-size-step)*13);--private-font-size-md:var(--private-font-size-base);--private-font-size-lg:calc(var(--private-font-size-step)*18);--private-line-height-xs:calc(var(--private-font-size-step)*16);--private-line-height-sm:calc(var(--private-font-size-step)*18);--private-line-height-md:calc(var(--private-font-size-step)*20);--private-focus-ring-size:2px;--private-input-height:44px;--private-message-min-width:52px;--private-message-max-width:86%;--private-activator-font-size:max(13px,var(--shopify-chat-activator-font-size,13px));--private-activator-font-delta:calc(var(--private-activator-font-size) - 13px);--private-activator-height:calc(46px + var(--private-activator-font-delta)*1.4);--private-activator-icon-size:calc(16px + var(--private-activator-font-delta)*12/11);--private-activator-gap:calc(var(--private-spacing-xs) + var(--private-activator-font-delta)*.15);--private-activator-inline-padding:calc(var(--private-spacing-lg) + var(--private-activator-font-delta)*.2);--private-activator-border-radius:var(--private-radius-lg);--private-activator-alert-size:6px;--private-nudge-bounce-duration:10s;--private-nudge-bounce-height:5px;--private-panel-header-height:calc(var(--private-button-size) + var(--private-spacing-sm) + var(--private-spacing-xl));--private-panel-footer-height:calc(var(--private-input-height) + var(--private-spacing-sm) + var(--private-spacing-xl));--private-color-text-subdued:color-mix(in srgb,var(--shopify-chat-text-color) 77%,var(--shopify-chat-bg-color));--private-color-border:color-mix(in srgb,var(--shopify-chat-text-color,#333) 14%,var(--shopify-chat-bg-color));--private-color-scrollbar-thumb:color-mix(in srgb,var(--shopify-chat-accent-bg-color) 50%,transparent);--private-color-success-bg:rgb(228,246,235,.6);--private-color-success-text:rgb(0,72,57);--private-color-critical-bg:rgb(254,232,235);--private-color-critical-text:rgb(142,11,33);--private-color-neutral-bg:color-mix(in srgb,var(--shopify-chat-text-color) 6%,transparent);--private-color-neutral-text:var(--shopify-chat-text-color);--private-color-skeleton:color-mix(in srgb,var(--shopify-chat-text-color) 8%,transparent);--private-color-info-bg:rgb(234,244,255);--private-color-info-text:rgb(0,58,90);--private-color-shop-brand-color:rgb(92,146,0);--private-color-shop-brand-color-hover:rgb(74,118,0);--private-color-icon-on-overlay:rgb(227,227,227);--private-panel-width:500px;--private-card-max-width:calc(var(--private-panel-width) - 2*var(--private-spacing-xl));--private-keyboard-offset:0px;--private-visual-viewport-height:calc(100dvh - var(--private-keyboard-offset))}
@supports (width:calc(1px*tan(atan2(1px,1px)))){
  :root,#shopify-element-wrapper{--private-activator-border-radius:calc(var(--private-radius-lg)*tan(atan2(var(--private-activator-font-size),13px)))}
}
`;

const HOST_WRAPPER = `
:host{pointer-events:none;z-index:var(--shopify-chat-z-index);position:fixed;inset:0;display:grid;font-family:var(--shopify-chat-body-font-family);font-size:var(--shopify-chat-font-size,inherit);color:var(--shopify-chat-text-color)}
#shopify-element-wrapper{pointer-events:auto;display:contents}
#shopify-element-wrapper:not(.desktop-layout){--private-button-size:40px}
`;

/* activator + backdrop + panel (shared by shopify-chat and shopify-agent-runtime) */
const SHELL = `
.activator-nudge{z-index:2;position:absolute;left:0;right:0;bottom:calc(var(--shopify-chat-activator-offset) + var(--private-preview-bar-offset,0px));width:fit-content;margin:0 auto;display:grid;gap:var(--private-spacing-xs);justify-items:center}
.activator-nudge.activator-nudge--left{left:var(--private-spacing-xl);right:auto;margin:0}
.activator-nudge.activator-nudge--right{right:var(--private-spacing-xl);left:auto;margin:0}
.activator{--activator-fg:var(--shopify-chat-text-color);--activator-bg:var(--shopify-chat-bg-color);display:grid;grid-auto-flow:column;align-items:center;gap:var(--private-activator-gap);padding-inline:var(--private-activator-inline-padding);width:fit-content;height:var(--private-activator-height);border-radius:var(--private-activator-border-radius);font-size:var(--private-activator-font-size);color:var(--activator-fg);outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);transition-property:display,color,background-color,outline-color,opacity,scale;transition-duration:var(--private-motion-speed),var(--private-motion-speed),var(--private-motion-speed),var(--private-motion-speed),var(--private-motion-speed),var(--private-motion-speed-slow);transition-timing-function:var(--private-motion-ease),var(--private-motion-ease),var(--private-motion-ease),var(--private-motion-ease),var(--private-motion-ease),var(--private-motion-spring);box-shadow:rgba(0,0,0,.05) 0 2px 2px -1px,rgba(0,0,0,.05) 0 3px 4px -1.5px,rgba(0,0,0,.05) 0 4px 8px -2px,rgba(0,0,0,.05) 0 5px 16px -2.5px,rgba(0,0,0,.08) 0 0 0 1px;backdrop-filter:blur(var(--private-bg-blur-soft));background-color:color-mix(in srgb,var(--activator-bg) 70%,transparent)}
.activator:hover:not(:active){background-color:color-mix(in srgb,var(--activator-bg) 90%,transparent)}
.activator:active{scale:.96}
.activator:focus-visible{outline-color:var(--activator-fg)}
@starting-style{.activator{opacity:0;scale:.6}}
.activator--inverted-colors{--activator-fg:var(--shopify-chat-bg-color);--activator-bg:var(--shopify-chat-text-color)}
.activator:has(.activator__label[hidden]){width:var(--private-activator-height);padding-inline:0;justify-content:center}
.activator__icon{width:var(--private-activator-icon-size);height:var(--private-activator-icon-size);color:color-mix(in srgb,var(--activator-fg) 70%,transparent)}
.activator__icon svg{width:100%;height:100%;fill:none;stroke:currentcolor}
.activator__icon shopify-chat-icon{width:100%;height:100%}
.activator__label{font-size:inherit;color:var(--activator-fg)}
.activator__indicator{display:none;width:0;height:0;opacity:0;border-radius:var(--private-activator-alert-size);background-color:var(--activator-fg);transition-property:display,width,height,opacity;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease)}
@media (prefers-reduced-motion:reduce){.activator__indicator{transition:none}}
.activator__indicator--active{display:block;width:var(--private-activator-alert-size);height:var(--private-activator-alert-size);opacity:1}
@starting-style{.activator__indicator--active{width:0;height:0;opacity:0}}
@keyframes nudge-bounce{
  0%,95%,100%{translate:0}
  96.5%{translate:0 calc(-1*var(--private-nudge-bounce-height))}
  97.8%{translate:0}
  98.8%{translate:0 calc(-.4*var(--private-nudge-bounce-height))}
  99.6%{translate:0}
}
.activator-nudge--active{animation-name:nudge-bounce;animation-duration:var(--private-nudge-bounce-duration);animation-timing-function:ease-in-out;animation-iteration-count:infinite}
@media (prefers-reduced-motion:reduce){.activator-nudge--active{animation:none}}
:host([open]) .activator{display:none;opacity:0;scale:.6}

.backdrop{z-index:0;position:fixed;inset:0;display:none;opacity:0;background-image:linear-gradient(rgba(0,0,0,.4) calc(100% - 80px),transparent);touch-action:none;transition-property:opacity,display;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease)}
:host([open]) .backdrop{display:block;opacity:1}
@starting-style{:host([open]) .backdrop{opacity:0}}
:host([open]) .desktop-layout .backdrop{display:none;opacity:0}

.panel{display:none;z-index:1;grid-template-rows:1fr;background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 80%,transparent);outline:var(--private-focus-ring-size) solid transparent;outline-offset:0;overflow:hidden;background-image:radial-gradient(ellipse 90% 80% at center top,var(--shopify-chat-bg-color),transparent),radial-gradient(ellipse 90% 80% at center bottom,var(--shopify-chat-bg-color),transparent)}
.panel:focus-visible{outline-color:var(--shopify-chat-accent-bg-color)}
:host([open]) .panel{display:grid}
:host(:not([shell-ready])) .panel,:host([view="login"]) .panel{backdrop-filter:blur(var(--private-bg-blur))}
:host(:not([mode="managed"])) .panel{--private-panel-cap-height:80dvh;--private-panel-optimal-height:80dvh;--private-panel-edge-inset:var(--private-spacing-xxs);--private-panel-bottom-offset:calc(var(--private-panel-edge-inset) + var(--private-preview-bar-offset,0px));position:absolute;left:var(--private-panel-edge-inset);right:var(--private-panel-edge-inset);margin:0 auto;height:min(var(--private-panel-cap-height),calc(var(--private-panel-optimal-height) - var(--private-preview-bar-offset,0px)));max-height:calc(var(--private-visual-viewport-height) + var(--private-keyboard-offset,0px) - var(--private-panel-bottom-offset) - var(--private-panel-edge-inset));min-height:200px;scale:.2;opacity:0;transform-origin:center bottom;bottom:var(--private-panel-bottom-offset);padding-bottom:var(--private-keyboard-offset,0px);border-radius:var(--private-radius-xl);box-shadow:rgba(0,0,0,.3) 0 1px 3px;transition-property:display,opacity,outline-color,width,height,translate,scale;transition-duration:var(--private-motion-speed),var(--private-motion-speed),var(--private-motion-speed),var(--private-motion-speed-slow),var(--private-motion-speed-slow),var(--private-motion-speed-slow),var(--private-motion-speed-slow);transition-timing-function:var(--private-motion-ease),var(--private-motion-ease),var(--private-motion-ease),var(--private-motion-spring),var(--private-motion-spring),var(--private-motion-spring),var(--private-motion-spring)}
:host(:not([mode="managed"])) .desktop-layout .panel{--private-panel-cap-height:370px;--private-panel-optimal-height:calc(90dvh - var(--shopify-chat-activator-offset));--private-panel-bottom-offset:calc(var(--shopify-chat-activator-offset) + var(--private-preview-bar-offset,0px));width:min(var(--private-panel-width),calc(100dvw - var(--private-spacing-xl)));bottom:calc(var(--private-panel-bottom-offset) + var(--private-keyboard-offset,0px));padding-bottom:0;max-height:calc(var(--private-visual-viewport-height) - var(--private-panel-bottom-offset));box-shadow:var(--private-panel-shadow);border-radius:var(--private-radius-xxl)}
:host(:not([mode="managed"])) .desktop-layout .panel.panel--left{left:var(--private-spacing-xl);right:auto;margin:0;transform-origin:left bottom}
:host(:not([mode="managed"])) .desktop-layout .panel.panel--right{right:var(--private-spacing-xl);left:auto;margin:0;transform-origin:right bottom}
:host(:not([mode="managed"])[open]) .panel{scale:1;opacity:1}
@starting-style{:host(:not([mode="managed"])[open]) .panel{scale:.2;opacity:0}}
.panel.panel--restoring,.panel.panel--restoring *,.backdrop.backdrop--restoring{transition:none!important}
:host(:not([mode="managed"])) :is(.panel.panel--size-tall,.panel.panel--size-expanded){--private-panel-cap-height:94dvh;--private-panel-optimal-height:94dvh}
:host(:not([mode="managed"])) .desktop-layout .panel.panel--size-tall{--private-panel-cap-height:var(--private-panel-width);--private-panel-optimal-height:calc(100dvh - var(--shopify-chat-activator-offset))}
:host(:not([mode="managed"])[open]:is([view="login"],[view="legacy-contact"])) .panel{--private-panel-cap-height:550px;--private-panel-optimal-height:calc(100dvh - var(--shopify-chat-activator-offset))}
:host(:not([mode="managed"])[open]:is([view="login"],[view="legacy-contact"])) .desktop-layout .panel{--private-panel-cap-height:450px}
:host(:not([mode="managed"])[open][view="chat"]) .desktop-layout .panel.panel--size-expanded,:host(:not([mode="managed"])[open][view="history"]) .desktop-layout .panel.panel--size-expanded,:host(:not([mode="managed"])[open][view="login"]) .desktop-layout .panel.panel--size-expanded{--private-panel-cap-height:900px;--private-panel-optimal-height:calc(90dvh - var(--shopify-chat-activator-offset));width:clamp(320px,900px,90dvw)}
:host(:not([mode="managed"])[open][view="chat"]) .desktop-layout .panel.panel--size-expanded.panel--empty-state{--private-panel-cap-height:650px}
.panel__body{position:relative;grid-area:1/1;min-height:0}
.panel__restore-state{pointer-events:auto;z-index:1;position:absolute;inset:var(--private-panel-header-height) 0 0;display:none;place-items:center;padding:var(--private-spacing-xl);color:var(--private-color-text-subdued);background-color:transparent}
:host([view="chat"]) .panel.panel--restoring .panel__restore-state:not([hidden]){display:grid}
/* RECONSTRUCTED: border-* longhands were blank in the dump; only border-top-color was set */
.panel__restore-spinner{display:block;width:var(--private-spacing-xl);height:var(--private-spacing-xl);border:2px solid transparent;border-top-color:var(--private-color-text-subdued);border-radius:var(--private-radius-full);animation:.9s linear 0s infinite normal none running restore-spinner-spin}
@media (prefers-reduced-motion:reduce){.panel__restore-spinner{animation:none}}
@keyframes restore-spinner-spin{100%{rotate:1turn}}
.agent-shell__runtime{display:contents}
.activator--loading{cursor:wait}
.activator--loading .activator__icon,.activator--loading .activator__label{opacity:.72}
:host([open]) .activator--loading{display:grid;opacity:1;scale:1}
`;

const RUNTIME_ONLY = `
.sr-only{position:absolute;margin:-1px;padding:0;width:1px;height:1px;clip:rect(0,0,0,0);white-space:nowrap;border:0;overflow:hidden}
.scroll-container{display:flex;flex-direction:column;min-height:0;overflow-y:auto;scrollbar-width:thin;scroll-behavior:smooth;scrollbar-color:var(--private-color-scrollbar-thumb) transparent;overscroll-behavior:none}
.scroll-container>*{flex:1 1 0%}
.scroll-feather{--scroll-feather-blur-soft:2px;--scroll-feather-blur-medium:var(--private-bg-blur-soft);--scroll-feather-blur-strong:var(--private-bg-blur);display:grid;width:100%;flex:0 0 auto;position:sticky;z-index:9;pointer-events:none}
.scroll-feather--top{--scroll-feather-mask-direction:to bottom;height:var(--private-panel-header-height);top:0}
.scroll-feather--bottom{--scroll-feather-mask-direction:to top;height:var(--private-panel-footer-height);bottom:0}
.scroll-feather__layer{grid-area:1/1;backdrop-filter:blur(var(--scroll-feather-layer-blur));mask-image:var(--scroll-feather-layer-mask)}
.scroll-feather__layer--soft{--scroll-feather-layer-blur:var(--scroll-feather-blur-soft);--scroll-feather-layer-mask:linear-gradient(var(--scroll-feather-mask-direction),black 0%,black 35%,transparent 100%)}
.scroll-feather__layer--medium{--scroll-feather-layer-blur:var(--scroll-feather-blur-medium);--scroll-feather-layer-mask:linear-gradient(var(--scroll-feather-mask-direction),black 0%,black 24%,transparent 78%)}
.scroll-feather__layer--strong{--scroll-feather-layer-blur:var(--scroll-feather-blur-strong);--scroll-feather-layer-mask:linear-gradient(var(--scroll-feather-mask-direction),black 0%,black 12%,transparent 44%)}
.scroll-feather--top::after,.scroll-feather--bottom::after{--corner-band-radius:var(--scroll-feather-cap-radius,var(--private-radius-xl));--corner-band-offset:var(--private-radius-lg);--corner-band-blur:var(--private-radius-xxl);--corner-band-mask-end:calc(var(--corner-band-offset) + var(--corner-band-blur) + var(--private-radius-lg));content:"";grid-area:1/1;pointer-events:none;z-index:1}
.scroll-feather--top::after{border-radius:var(--corner-band-radius) var(--corner-band-radius) 0 0;box-shadow:inset 0 var(--corner-band-offset) var(--corner-band-blur) var(--shopify-chat-bg-color);mask-image:linear-gradient(to bottom,black var(--private-radius-xxl),transparent var(--corner-band-mask-end))}

:host(:not([mode="managed"])[open][view="login"]) .panel .panel__body{display:flex;flex-direction:column;justify-content:center;align-items:center}
/* RECONSTRUCTED: padding-top/right/left were blank in the dump; values inferred from --private-panel-header-height (32 + 12 + 20) and measured button offsets */
.panel__header{z-index:2;position:relative;display:flex;align-self:start;align-items:center;justify-content:space-between;grid-area:1/1;padding:var(--private-spacing-sm) var(--private-spacing-sm) var(--private-spacing-xl);touch-action:none}
.panel__header-column{display:grid;grid-auto-flow:column;gap:var(--private-spacing-xs);align-items:center}
.panel__header-column--left{position:relative}
.panel__customer-identity{display:inline-flex;align-items:center;box-sizing:border-box;gap:var(--private-spacing-xs);min-width:0;max-width:176px;height:var(--private-button-size);padding-block:0;padding-inline:6px 14px;border:0;appearance:none;border-radius:var(--private-radius-full);background:var(--shopify-chat-bg-color);box-shadow:var(--private-button-shadow);color:var(--shopify-chat-text-color);cursor:pointer;font-family:inherit;font-size:var(--private-font-size-sm);font-weight:600;line-height:1;outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);transition:background-color var(--private-motion-speed) var(--private-motion-ease)}
.panel__customer-identity:hover:not(:active){background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 92%,gray)}
.panel__customer-identity:focus-visible{outline-color:var(--shopify-chat-accent-bg-color)}
.panel__customer-identity[hidden]{display:none}
.panel__customer-avatar,.panel__customer-initial{display:grid;place-items:center;flex-shrink:0;width:24px;height:24px;border:.5px solid color-mix(in srgb,var(--shopify-chat-text-color) 10%,transparent);border-radius:var(--private-radius-full)}
.panel__customer-avatar{display:block;object-fit:cover}
.panel__customer-initial{background:color-mix(in srgb,var(--shopify-chat-text-color) 5%,transparent);color:color-mix(in srgb,var(--shopify-chat-text-color) 72%,transparent);font-size:var(--private-font-size-md);font-weight:600}
.panel__customer-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.panel__customer-menu{position:absolute;z-index:1;top:calc(100% + var(--private-spacing-xxs));left:0;display:grid;gap:var(--private-spacing-xs);min-width:176px;padding:var(--private-spacing-xs);border-radius:var(--private-radius-md);background:var(--shopify-chat-bg-color);box-shadow:var(--private-card-shadow)}
.panel__customer-menu[hidden]{display:none}
.panel__customer-menu-item{display:grid;place-items:center;box-sizing:border-box;min-height:36px;padding:0 var(--private-spacing-lg);border:var(--private-border-width) solid color-mix(in srgb,var(--shopify-chat-text-color) 6%,transparent);border-radius:var(--private-radius-sm);color:var(--shopify-chat-text-color);font-size:var(--private-form-control-font-size);font-weight:600;line-height:1;text-decoration:none}
.panel__customer-menu-item:hover,.panel__customer-menu-item:focus-visible{border-color:transparent;background:color-mix(in srgb,var(--shopify-chat-text-color) 6%,transparent)}
.panel__customer-menu-item:focus-visible{outline:var(--private-focus-ring-size) solid var(--shopify-chat-accent-bg-color);outline-offset:calc(-1*var(--private-focus-ring-size))}
.new-chat-popover{position:fixed;inset:unset;box-sizing:border-box;inline-size:min(320px,var(--new-chat-popover-max-width,100dvw));margin:0;padding:var(--private-spacing-xl);border:0;border-radius:var(--private-radius-lg);color:var(--shopify-chat-text-color);background-color:var(--shopify-chat-bg-color);box-shadow:var(--private-card-shadow);opacity:0;translate:0 -4px;transition:display var(--private-motion-speed) allow-discrete,overlay var(--private-motion-speed) allow-discrete,opacity var(--private-motion-speed) var(--private-motion-ease),translate var(--private-motion-speed) var(--private-motion-ease)}
.new-chat-popover:popover-open,.new-chat-popover.\\:popover-open{opacity:1;translate:0}
@starting-style{.new-chat-popover:popover-open,.new-chat-popover.\\:popover-open{opacity:0;translate:0 -4px}}
.new-chat-popover::backdrop{background:transparent}
.new-chat-popover__title{margin:0;font-family:var(--shopify-chat-heading-font-family);font-size:var(--private-font-size-lg);font-weight:600;line-height:1.3}
.new-chat-popover__description{margin:var(--private-spacing-xs) 0 0;color:var(--private-color-text-subdued);font-size:var(--private-font-size-sm);line-height:1.5}
.new-chat-popover__actions{display:grid;gap:var(--private-spacing-xs);margin-block-start:var(--private-spacing-lg)}
.new-chat-popover__button{min-block-size:var(--private-input-height);padding:var(--private-spacing-xs) var(--private-spacing-lg);border:var(--private-border-width) solid transparent;border-radius:var(--private-radius-xs);font:inherit;font-size:var(--private-form-control-font-size);font-weight:600;line-height:var(--private-line-height-sm);text-align:center;outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);transition-property:opacity,background-color,outline-color;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease)}
.new-chat-popover__button:hover:not(:active){opacity:.85}
.new-chat-popover__button:focus-visible{outline-color:var(--shopify-chat-accent-bg-color)}
.new-chat-popover__button--primary{color:var(--shopify-chat-accent-text-color);background-color:var(--shopify-chat-accent-bg-color)}
.new-chat-popover__button--secondary{border-color:var(--private-color-border);color:var(--shopify-chat-text-color);background-color:var(--private-color-neutral-bg)}
@media (prefers-reduced-motion:reduce){.new-chat-popover,.new-chat-popover__button{transition:none}}
@media (forced-colors:active){.new-chat-popover{border:var(--private-border-width) solid CanvasText}.new-chat-popover__button{border-color:buttontext}}
.panel__actions{display:none}
.desktop-layout .panel__actions{display:block}
:host([view="chat"]) .panel.panel--restoring iframe[part="iframe"]{visibility:hidden;pointer-events:none}
.panel__header-column>.panel__back,.panel__history-actions{display:none}
:host([view="history"]) .panel__chat-actions{display:none}
:host([view="history"]) .panel__history-actions{display:block}
:host([view="history"]) .panel__sign-in,:host([view="history"]) .panel__customer-identity,:host([view="history"]) .panel__customer-menu{display:none}
:host(:is([view="login"],[view="legacy-contact"])) .panel__header-column>.panel__back{display:inline-flex}
:host(:is([view="login"],[view="legacy-contact"])) .panel__chat-actions{display:none}
:host(:is([view="login"],[view="legacy-contact"])) .panel__sign-in,:host(:is([view="login"],[view="legacy-contact"])) .panel__customer-identity,:host(:is([view="login"],[view="legacy-contact"])) .panel__customer-menu{display:none}
:host([view="login"]) iframe[part="iframe"],:host([view="login"]) shopify-chat-view-switcher{display:none}
:host([view="login"]) .panel__body{padding:var(--private-panel-header-height) var(--private-spacing-xl) var(--private-spacing-xl)}
shopify-login-panel{display:none}
:host([view="login"]) shopify-login-panel{display:block}
.panel__unavailable{pointer-events:auto;z-index:1;position:absolute;inset:var(--private-panel-header-height) 0 0;display:none;align-content:center;justify-items:center;padding:var(--private-spacing-xl);text-align:center;color:var(--shopify-chat-text-color)}
:host([view="chat"]) .panel.panel--unavailable .panel__unavailable:not([hidden]){display:grid}
.panel.panel--unavailable .panel__chat-actions{display:none}
.panel__unavailable-title{margin:0;font-family:var(--shopify-chat-heading-font-family);font-size:var(--private-font-size-lg);font-weight:600;line-height:1.3}
.panel__unavailable-description{margin:var(--private-spacing-xs) 0 0;color:var(--private-color-text-subdued);font-size:var(--private-font-size-sm);line-height:1.5}
.panel__unavailable-retry{margin-block-start:var(--private-spacing-lg);min-block-size:var(--private-input-height);padding:var(--private-spacing-xs) var(--private-spacing-lg);border:var(--private-border-width) solid transparent;border-radius:var(--private-radius-xs);font:inherit;font-size:var(--private-form-control-font-size);font-weight:600;line-height:var(--private-line-height-sm);text-align:center;color:var(--shopify-chat-accent-text-color);background-color:var(--shopify-chat-accent-bg-color);outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);transition-property:opacity,outline-color;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease)}
.panel__unavailable-retry:hover:not(:active){opacity:.85}
.panel__unavailable-retry:focus-visible{outline-color:var(--shopify-chat-accent-bg-color)}
@media (prefers-reduced-motion:reduce){.panel__unavailable-retry{transition:none}}
@media (forced-colors:active){.panel__unavailable-retry{border-color:buttontext}}
`;

const ICON_CSS = `
:host{display:block;width:16px;height:16px}
svg{display:block;width:100%;height:100%}
svg[data-icon-family="flat"]{fill:currentcolor}
svg[data-icon-family="outlined"]{fill:none;stroke:currentcolor}
svg[data-icon-transform="rotate-90"]{transform:rotate(90deg)}
svg[data-icon-transform="rotate-180"]{transform:rotate(180deg)}
svg[data-icon-transform="rotate-270"]{transform:rotate(270deg)}
svg[data-icon-transform="flip-y"]{transform:scaleY(-1)}
`;

const SIGNIN_CSS = `
:host{display:inline-flex}
.sign-in-button{height:var(--private-button-size);padding:0 var(--private-spacing-sm);border-radius:var(--private-button-size);font-size:var(--private-font-size-sm);font-weight:600;line-height:1;color:var(--shopify-chat-accent-text-color);background-color:var(--shopify-chat-accent-bg-color);transition:opacity var(--private-motion-speed) var(--private-motion-ease)}
.sign-in-button:hover:not(:active){opacity:.85}
.sign-in-button:focus-visible{outline:2px solid var(--shopify-chat-accent-bg-color);outline-offset:2px}
@media (prefers-reduced-motion:reduce){.sign-in-button{transition:none}}
.sign-in-button--shop{color:rgb(255,255,255);background-color:var(--private-color-shop-brand-color);transition:opacity var(--private-motion-speed) var(--private-motion-ease),background-color var(--private-motion-speed) var(--private-motion-ease)}
.sign-in-button--shop:hover:not(:active){opacity:1;background-color:var(--private-color-shop-brand-color-hover)}
.sign-in-button--shop:focus-visible{outline-color:var(--private-color-shop-brand-color)}
@media (prefers-reduced-motion:reduce){.sign-in-button--shop{transition:none}}
`;

const ICONBTN_CSS = `
:host{display:block}
:host(:focus-within){z-index:1}
button{position:relative;display:grid;width:var(--private-button-size);height:var(--private-button-size);border-radius:var(--private-button-size);background-color:var(--shopify-chat-bg-color);outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);transition-property:color,outline-color;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease);color:var(--private-color-text-subdued);box-shadow:var(--private-button-shadow)}
button::after{content:"";position:absolute;inset:0;border:var(--private-border-width) solid var(--private-button-border-color);border-radius:inherit;pointer-events:none}
button:hover:not(:active){color:var(--shopify-chat-text-color)}
button:focus-visible{outline-color:var(--shopify-chat-accent-bg-color)}
button:disabled{opacity:.5;pointer-events:none}
.interior{position:absolute;inset:0;display:grid;align-items:center;justify-content:center;border-radius:var(--private-button-size);background-color:var(--shopify-chat-bg-color);transition:background-color var(--private-motion-speed) var(--private-motion-ease)}
button:hover:not(:active) .interior{background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 92%,gray)}
shopify-chat-icon{width:var(--private-button-icon-size);height:var(--private-button-icon-size)}
:host([grouped]) button{height:100%;box-shadow:none}
:host([grouped]) button::after{display:none}
:host([grouped]:not([solo])) button{padding:calc(var(--private-spacing-xxs) - var(--private-border-width))}
:host([grouped]:not([solo])) .interior{inset:calc(var(--private-spacing-xxs) - var(--private-border-width))}
@supports (color:oklch(from red l c h)){
  button{--contrast-color:oklch(from var(--shopify-chat-bg-color) clamp(0,(.6/l - 1)*infinity,1) 0 0);--private-button-border-color:color-mix(in srgb,var(--contrast-color) 6%,transparent);--private-button-shadow:0 2px 6px 0 var(--private-button-border-color)}
  button:hover:not(:active) .interior{background-color:color-mix(in srgb,var(--contrast-color) 6%,var(--shopify-chat-bg-color))}
}
`;

const GROUP_CSS = `
.sr-only{position:absolute;margin:-1px;padding:0;width:1px;height:1px;clip:rect(0,0,0,0);white-space:nowrap;border:0;overflow:hidden}
:host{display:block}
ul{position:relative;display:grid;grid-auto-flow:column;gap:var(--private-button-divider-width);height:var(--private-button-size);border-radius:var(--private-button-size);background-color:var(--shopify-chat-bg-color);box-shadow:var(--private-button-shadow)}
ul:not(:has(li)){display:none}
ul::after{content:"";z-index:1;position:absolute;inset:0;border:var(--private-border-width) solid var(--private-button-border-color);border-radius:inherit;pointer-events:none}
ul:hover,ul:focus-within{--list-item-divider-opacity:0}
@supports (color:oklch(from red l c h)){
  ul{--contrast-color:oklch(from var(--shopify-chat-bg-color) clamp(0,(.6/l - 1)*infinity,1) 0 0);--private-button-border-color:color-mix(in srgb,var(--contrast-color) 6%,transparent);--private-button-shadow:0 2px 6px 0 var(--private-button-border-color);background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 96%,transparent);backdrop-filter:blur(var(--private-bg-blur-soft))}
}
slot:not([name]){display:none}
li{display:grid;position:relative}
li+li::before{content:"";position:absolute;display:block;width:var(--private-button-divider-width);top:20%;bottom:20%;left:calc(var(--private-button-divider-width)*-1);opacity:var(--list-item-divider-opacity,1);transition:opacity var(--private-motion-speed) var(--private-motion-ease);background-color:var(--private-button-border-color)}
li.icon-button-group__item--visually-hidden:focus-within{position:relative;width:auto;height:auto;margin:0;padding:0;border:0;clip:auto;overflow:visible;white-space:normal}
li.icon-button-group__item--visually-hidden:not(:focus-within)::before,li.icon-button-group__item--visually-hidden:not(:focus-within)+li::before{--list-item-divider-opacity:0}
.icon-button-group__list--all-visually-hidden:not(:focus-within){background-color:transparent;box-shadow:none;backdrop-filter:none}
.icon-button-group__list--all-visually-hidden:not(:focus-within)::after{display:none}
`;

/* ================= IFRAME CSS (shopify-chat-view-switcher / -conversation / -history, from dump) ================= */

const SWITCHER_CSS = `
:host{display:block;height:100%}
#shopify-element-wrapper{height:100%;position:relative;z-index:0}
#shopify-element-wrapper::before{content:"";position:absolute;inset:0;z-index:-1;backdrop-filter:blur(var(--private-bg-blur));box-shadow:inset 0 0 var(--private-radius-xxl) var(--shopify-chat-bg-color)}
::slotted(shopify-chat-history){display:none}
:host([view="history"]) ::slotted(shopify-chat-history){display:block}
:host([view="history"]) ::slotted(shopify-chat-conversation){display:none}
`;

const SCROLL = `
.sr-only{position:absolute;margin:-1px;padding:0;width:1px;height:1px;clip:rect(0,0,0,0);white-space:nowrap;border:0;overflow:hidden}
.scroll-container{display:flex;flex-direction:column;min-height:0;overflow-y:auto;scrollbar-width:thin;scroll-behavior:smooth;scrollbar-color:var(--private-color-scrollbar-thumb) transparent;overscroll-behavior:none}
.scroll-container>*{flex:1 1 0%}
.scroll-feather{--scroll-feather-blur-soft:2px;--scroll-feather-blur-medium:var(--private-bg-blur-soft);--scroll-feather-blur-strong:var(--private-bg-blur);display:grid;width:100%;flex:0 0 auto;position:sticky;z-index:9;pointer-events:none}
.scroll-feather--top{--scroll-feather-mask-direction:to bottom;height:var(--private-panel-header-height);top:0}
.scroll-feather--bottom{--scroll-feather-mask-direction:to top;height:var(--private-panel-footer-height);bottom:0}
.scroll-feather__layer{grid-area:1/1;backdrop-filter:blur(var(--scroll-feather-layer-blur));mask-image:var(--scroll-feather-layer-mask)}
.scroll-feather__layer--soft{--scroll-feather-layer-blur:var(--scroll-feather-blur-soft);--scroll-feather-layer-mask:linear-gradient(var(--scroll-feather-mask-direction),black 0%,black 35%,transparent 100%)}
.scroll-feather__layer--medium{--scroll-feather-layer-blur:var(--scroll-feather-blur-medium);--scroll-feather-layer-mask:linear-gradient(var(--scroll-feather-mask-direction),black 0%,black 24%,transparent 78%)}
.scroll-feather__layer--strong{--scroll-feather-layer-blur:var(--scroll-feather-blur-strong);--scroll-feather-layer-mask:linear-gradient(var(--scroll-feather-mask-direction),black 0%,black 12%,transparent 44%)}
.scroll-feather--top::after,.scroll-feather--bottom::after{--corner-band-radius:var(--scroll-feather-cap-radius,var(--private-radius-xl));--corner-band-offset:var(--private-radius-lg);--corner-band-blur:var(--private-radius-xxl);--corner-band-mask-end:calc(var(--corner-band-offset) + var(--corner-band-blur) + var(--private-radius-lg));content:"";grid-area:1/1;pointer-events:none;z-index:1}
.scroll-feather--top::after{border-radius:var(--corner-band-radius) var(--corner-band-radius) 0 0;box-shadow:inset 0 var(--corner-band-offset) var(--corner-band-blur) var(--shopify-chat-bg-color);mask-image:linear-gradient(to bottom,black var(--private-radius-xxl),transparent var(--corner-band-mask-end))}
`;

const MD_CSS = `
.md-heading{display:block;margin:0;font-family:var(--shopify-chat-heading-font-family,inherit);font-size:var(--private-font-size-md,1em);line-height:1.4;font-weight:600}
.md-heading--1{font-size:var(--private-font-size-lg,1.285em);line-height:1.3;letter-spacing:-.2px}
.md-heading--2,.md-heading--3,.md-heading--4,.md-heading--5,.md-heading--6{font-size:var(--private-font-size-md,1em);line-height:1.4}
.md-list{display:grid;gap:var(--private-spacing-ty);padding-inline-start:var(--private-spacing-lg);list-style-position:outside;margin:0}
.md-list--unordered{list-style-type:disc}
.md-list--ordered{list-style-type:decimal}
.md-list__item{line-height:1.3}
.md-list__item>p{margin:0}
.md-list__item>:not(:first-child){margin-block-start:var(--private-spacing-ty,2px)}
.md-blockquote{margin:0;padding-inline-start:var(--private-spacing-sm,12px);border-inline-start:2px solid var(--private-color-border,color-mix(in srgb,currentColor 18%,transparent));color:color-mix(in srgb,currentcolor 78%,transparent 22%)}
.md-code,.md-code-block{border-radius:4px;background:var(--private-color-neutral-bg,color-mix(in srgb,currentColor 8%,transparent))}
.md-code{padding:0 .25em;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:.92em}
.md-code-block{display:block;overflow-x:auto;margin:0;padding:var(--private-spacing-sm,12px)}
.md-code-block__code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;font-size:.92em;white-space:pre}
.md-table-scroll{display:block;inline-size:100%;max-inline-size:100%;min-inline-size:0;overflow-x:auto}
.md-table{inline-size:100%;min-inline-size:max-content;border-collapse:collapse;font-size:.95em}
.md-table__cell{padding:var(--private-spacing-ty,2px) var(--private-spacing-sm,12px) var(--private-spacing-ty,2px) 0;border-block-end:1px solid var(--private-color-border,color-mix(in srgb,currentColor 18%,transparent));text-align:start;vertical-align:top}
.md-table__cell--header{font-weight:600}
.md-rule{inline-size:100%;border:0;border-block-start:1px solid var(--private-color-border,color-mix(in srgb,currentColor 18%,transparent));margin:var(--private-spacing-sm,12px) 0}
.md-link{color:inherit;text-decoration:underline}
`;

const CONV_CSS = `
:host{display:block;height:100%;container-type:inline-size;font-family:var(--shopify-chat-body-font-family);font-size:var(--shopify-chat-font-size,inherit);color:var(--shopify-chat-text-color);text-size-adjust:100%}
#shopify-element-wrapper{height:100%}
.chat{display:grid;grid-template-rows:1fr;height:100%;container:chat / size;position:relative}
.chat>.scroll-container,.chat>.composer{grid-area:1/1}
.legacy-contact-form-region{z-index:12;grid-area:1/1;box-sizing:border-box;display:flex;align-items:flex-start;width:100%;min-height:0;padding:var(--private-panel-header-height) var(--private-conversation-inset) var(--private-spacing-xl);overflow-y:auto}
.legacy-contact-form-region[hidden]{display:none}
.chat--legacy-contact>.scroll-container,.chat--legacy-contact>.scroll-feather,.chat--legacy-contact>.composer,.chat--legacy-contact>.jump-to-latest{display:none}
.jump-to-latest{position:absolute;bottom:calc(var(--private-panel-footer-height) + var(--composer-overflow,0px));left:50%;translate:-50%;z-index:11;display:inline-flex;align-items:center;gap:var(--private-spacing-xxs);height:var(--private-button-size);padding-inline:var(--private-spacing-xs) var(--private-spacing-sm);margin:0;font:inherit;font-size:var(--private-font-size-sm);font-weight:500;line-height:1.33;color:var(--shopify-chat-text-color);background-color:var(--shopify-chat-bg-color);border:.5px solid color-mix(in srgb,var(--shopify-chat-text-color) 10%,transparent);border-radius:var(--private-radius-full);box-shadow:var(--private-jump-to-latest-shadow);cursor:pointer;opacity:0;visibility:hidden;pointer-events:none;transition:opacity var(--private-motion-speed-slow) var(--private-motion-ease),visibility var(--private-motion-speed-slow),background-color var(--private-motion-speed) var(--private-motion-ease)}
@media (prefers-reduced-motion:reduce){.jump-to-latest{transition:none}}
.jump-to-latest:hover:not(:active){background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 92%,gray)}
.jump-to-latest--visible{opacity:1;visibility:visible;pointer-events:auto}
.jump-to-latest__icon{width:var(--private-button-icon-size);height:var(--private-button-icon-size);color:color-mix(in srgb,var(--shopify-chat-text-color) 56%,transparent)}
.jump-to-latest:focus-visible{outline:var(--private-focus-ring-size) solid var(--shopify-chat-text-color);outline-offset:var(--private-focus-ring-size)}
.chat>.scroll-container{overflow-anchor:none;overscroll-behavior-y:contain}
.chat>.scroll-container::before,.chat>.scroll-container::after{content:"";flex:0 0 auto}
.chat>.scroll-container::before{height:var(--private-panel-header-height)}
.chat>.scroll-feather{position:absolute;left:0}
.chat>.scroll-container::after,.chat>.scroll-feather--bottom{height:calc(var(--private-panel-footer-height) + var(--composer-overflow,0px))}
.chat>.scroll-feather--bottom>.scroll-feather__layer{--scroll-feather-bottom-extra-height:var(--private-spacing-xs);height:calc(100% + var(--scroll-feather-bottom-extra-height));translate:0 calc(-1*var(--scroll-feather-bottom-extra-height))}
:host{--scroll-feather-cap-radius:var(--private-radius-xl)}
:host(.desktop-layout){--scroll-feather-cap-radius:var(--private-radius-xxl)}
:host(.managed){--scroll-feather-cap-radius:0}
:host(:not(.managed)) .scroll-feather--bottom::after{border-radius:0 0 var(--corner-band-radius) var(--corner-band-radius);box-shadow:inset 0 calc(-1*var(--corner-band-offset)) var(--corner-band-blur) var(--shopify-chat-bg-color);mask-image:linear-gradient(to top,black var(--private-radius-xxl),transparent var(--corner-band-mask-end))}
.empty-state{display:flex;flex-direction:column;justify-content:space-between;flex:1 1 0%;gap:var(--private-spacing-xl);padding:0 var(--private-conversation-inset);text-align:start}
.empty-state:not(:has(.empty-state__cards)) .empty-state__welcome{align-self:center}
.empty-state__welcome{display:flex;flex-direction:column;align-items:center;flex:1 1 0%;gap:var(--private-spacing-lg);margin-top:var(--private-spacing-lg);min-height:0}
.empty-state__header{display:flex;flex-direction:column;gap:var(--private-spacing-xs);align-self:flex-start;max-width:340px;padding-inline-start:13px}
.empty-state__header:has(+ .empty-state__visual[hidden]){text-align:center;margin-block:auto}
.empty-state__greeting{margin:0;font-size:var(--private-font-size-lg);font-weight:600;letter-spacing:-.2px;line-height:1.3;color:color-mix(in srgb,var(--shopify-chat-text-color) 56%,transparent)}
.empty-state__subheading{margin:0;font-size:var(--private-font-size-sm);font-weight:500;line-height:1.33;color:var(--shopify-chat-text-color);white-space:pre-line}
.empty-state__greeting,.empty-state__subheading,.empty-state__visual{opacity:1;translate:0;transition:opacity var(--private-motion-speed-slow) var(--private-motion-ease),translate var(--private-motion-speed-slow) var(--private-motion-ease)}
@starting-style{.empty-state__greeting,.empty-state__subheading,.empty-state__visual{opacity:0;translate:0 var(--private-spacing-md)}}
@media (prefers-reduced-motion:reduce){.empty-state__greeting,.empty-state__subheading,.empty-state__visual{transition:none}}
.empty-state__subheading{transition-delay:var(--private-motion-speed-slow)}
.empty-state__visual{align-self:stretch;flex:0 0 auto;margin-block:auto;transition-delay:calc(var(--private-motion-speed-slow)*2)}
@container chat (width >= 490px) and (aspect-ratio > 3 / 4){
  .empty-state__subheading,.empty-state__visual{transition-delay:0s}
  .empty-state__greeting,.empty-state__subheading,.empty-state__visual{animation-delay:0s}
  .empty-state__welcome{flex-direction:row;align-items:center;justify-content:space-between;margin-top:0;gap:36px}
  .empty-state__header{align-self:auto}
}
.empty-state__cards{display:grid;grid-template-columns:[c2-start] 2fr [c1-start] 1fr [c2-end] 1fr [c3-start] 1fr [c1-end] 2fr [c3-end];grid-template-rows:[c1-top] 1fr [c2-top] 1fr [c3-top] 1fr 2fr [bottom];max-width:450px;margin-inline:auto;overflow:visible}
.empty-state__product-card{--card-padding:5%;--card-border-radius:7%;--card-lift:0px;display:block;align-self:start;text-decoration:none;color:inherit;background:var(--shopify-chat-bg-color);box-shadow:rgba(0,0,0,.12) 0 10px 27px -7px;overflow:hidden;padding:var(--card-padding);border-radius:var(--card-border-radius);border:var(--shopify-chat-card-image-border,.5px solid rgba(0,0,0,.1));transition:transform var(--private-motion-speed-slower) var(--private-motion-ease)}
.empty-state__product-card[href]:hover{--card-lift:-6px}
.empty-state__product-card--disabled{cursor:default}
.empty-state__product-card:focus-visible{outline:2px solid var(--shopify-chat-accent-bg-color);outline-offset:2px}
.empty-state__product-card-image,.empty-state__product-card--missing-image::before{display:block;width:100%;aspect-ratio:1/1;border-radius:calc(var(--card-border-radius)/2)}
.empty-state__product-card-image{object-fit:cover}
.empty-state__product-card--missing-image::before{content:"";background:color-mix(in srgb,var(--shopify-chat-text-color) 8%,transparent)}
.empty-state__product-card-title{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-size:9px;font-weight:300;text-align:center;margin-top:var(--card-padding)}
.empty-state__product-card:nth-child(1){grid-area:c1-top/c1-start/bottom/c1-end;transform:rotate(-2deg) translateY(var(--card-lift));z-index:2}
.empty-state__product-card:nth-child(2){grid-area:c2-top/c2-start/bottom/c2-end;transform:rotate(-9deg) translateY(var(--card-lift));z-index:1}
.empty-state__product-card:nth-child(3){grid-area:c3-top/c3-start/bottom/c3-end;transform:rotate(8deg) translate(-7%,-9%) translateY(var(--card-lift))}
.empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child){grid-template-columns:1fr;grid-template-rows:1fr}
.empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child) .empty-state__product-card{grid-area:auto}
@container chat (width < 490px){
  .empty-state__cards:has(.empty-state__product-card:nth-child(2):last-child){grid-template-columns:[c2-start] 2fr [c1-start] 1fr [c2-end] 1fr 1fr [c1-end];grid-template-rows:[c1-top] 1fr [c2-top] 1fr 2fr [bottom]}
  .empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child){max-width:160px}
  .empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child) .empty-state__product-card:nth-child(1){transform:translateY(var(--card-lift))}
}
@container chat (width < 490px) and (height >= 630px){.empty-state__cards{width:90%}}
@container chat (width >= 490px) and (height <= 550px) and (aspect-ratio > 3 / 4){
  .empty-state__welcome{align-self:auto;max-width:450px;max-height:150px}
  .empty-state__cards{grid-template-columns:[c1-start] 2fr [c2-start c3-start] 1fr [c1-end c2-end] 2fr [c3-end];grid-template-rows:[c1-top] 1fr [c2-top c3-top] 1fr 2fr [bottom];max-width:160px;min-width:130px}
  .empty-state__product-card:nth-child(1){transform:translateY(var(--card-lift))}
  .empty-state__cards:not(:has(.empty-state__product-card:nth-child(2):last-child)) .empty-state__product-card:nth-child(2){display:none}
  .empty-state__product-card:nth-child(3){transform:rotate(6.91deg) translateY(var(--card-lift));z-index:1}
  .empty-state__cards:has(.empty-state__product-card:nth-child(2):last-child){grid-template-columns:[c1-start] 2fr [c2-start c3-start] 1fr [c1-end] 2fr [c2-end c3-end];grid-template-rows:[c1-top] 1fr [c2-top c3-top] 1fr 2fr [bottom]}
  .empty-state__cards:has(.empty-state__product-card:nth-child(2):last-child) .empty-state__product-card:nth-child(2){transform:rotate(6.91deg) translateY(var(--card-lift));z-index:1}
  .empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child){max-width:max(0px,calc(100px - .5*var(--composer-overflow,0px)))}
}
@container chat (width >= 490px) and (height > 550px){
  .empty-state__welcome{justify-content:center;max-width:none}
  .empty-state__visual{flex-shrink:1}
  .empty-state__cards{grid-template-columns:[c2-start] 2fr [c1-start] 1fr [c2-end] 1fr [c3-start] 1fr [c1-end] 2fr [c3-end];grid-template-rows:[c1-top] 1fr [c2-top] 1fr [c3-top] 1fr 2fr [bottom];max-width:390px;min-width:250px}
  .empty-state__cards:has(.empty-state__product-card:nth-child(2):last-child){grid-template-columns:[c2-start] 2fr [c1-start] 1fr [c2-end] 1fr 1fr [c1-end];grid-template-rows:[c1-top] 1fr [c2-top] 1fr 2fr [bottom];max-width:310px}
  .empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child){max-width:145px}
  .empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child) .empty-state__product-card:nth-child(1){transform:translateY(var(--card-lift))}
}
@container chat ((width < 490px) and (height < 630px)) or ((width >= 490px) and (height < 360px) and (aspect-ratio > 3 / 4)) or ((width < 490px) and style(--composer-tight: 1)) or ((width >= 490px) and (aspect-ratio > 3 / 4) and style(--composer-tight: 1)){
  .empty-state__welcome{flex-direction:row;align-items:center;justify-content:center;gap:var(--private-spacing-lg);margin-top:0}
  .empty-state__header{align-self:center}
  .empty-state__visual{order:-1}
  .empty-state__cards,.empty-state__cards:has(.empty-state__product-card:nth-child(1):last-child),.empty-state__cards:has(.empty-state__product-card:nth-child(2):last-child){grid-template-columns:1fr;grid-template-rows:1fr;max-width:90px;min-width:unset}
  .empty-state__product-card:nth-child(1){grid-area:auto;transform:translateY(var(--card-lift))}
  .empty-state__product-card:nth-child(2),.empty-state__product-card:nth-child(3){display:none}
}
@container chat (width >= 490px) and (aspect-ratio > 3 / 4) and style(--composer-tight: 1){.empty-state__welcome{max-height:108px}}
.empty-state__footer{display:flex;flex-direction:column;flex:0 0 auto;gap:var(--private-spacing-sm);margin-bottom:-8px}
.empty-state__suggestions{min-height:24px}
.empty-state__suggestions[hidden]{display:block;visibility:hidden}
.empty-state__disclaimer{margin:0;font-size:var(--private-font-size-xxs);line-height:1.5;color:color-mix(in srgb,var(--shopify-chat-text-color) 45%,transparent);text-align:start;text-wrap:balance;width:100%;padding-inline-start:13px}
:host([expanded]:not([managed]).desktop-layout) .empty-state__disclaimer{text-align:center;padding:0}
.empty-state__disclaimer-link{color:inherit}
.messages{display:grid;align-content:start;flex-shrink:0;padding:0 var(--private-conversation-inset);gap:var(--private-spacing-sm)}
.messages[hidden]{display:none}
.load-earlier__sentinel{flex:0 0 auto;height:1px;margin:0}
.load-earlier__indicator{flex:0 0 auto;padding:var(--private-spacing-xs) var(--private-spacing-md);color:color-mix(in srgb,var(--shopify-chat-text-color) 56%,transparent);font-size:var(--private-font-size-sm);text-align:center}
.load-earlier__indicator[hidden]{display:none}
.handoff-divider{width:100%;margin:var(--private-spacing-sm) 0;border:0;border-top:1px solid var(--shopify-chat-text-color)}
.message.user{display:grid;justify-items:end}
.message--inbox-team{display:grid;grid-template-columns:24px minmax(0,1fr);column-gap:var(--private-spacing-xs);place-items:end start;width:100%}
.message--inbox-team .message__status{grid-column:2}
.message--inbox-team .message__segments{grid-column:2;justify-self:stretch;justify-items:start;min-width:0;width:100%}
.message--inbox-team .message__segments>.message__adaptive-ui{justify-self:stretch}
.message__sender-avatar{grid-area:1/1;align-self:start;width:24px;height:24px;border-radius:50%;overflow:hidden}
.message--inbox-team:has(.message__sender-name) .message__sender-avatar{grid-row:2}
.message__sender-avatar--image{display:block;object-fit:cover;background-color:var(--shopify-chat-accent-bg-color)}
.message__sender-avatar--initials{display:grid;place-items:center;color:#fff;background:hsl(var(--message-sender-avatar-hue) 48% 43%);font-size:11px;font-weight:650;line-height:1}
.message__sender-avatar--icon{display:grid;place-items:center;color:var(--shopify-chat-accent-text-color);background-color:var(--shopify-chat-accent-bg-color)}
.message__sender-avatar--icon shopify-agent-icon{width:12px;height:12px}
.message__sender-name{grid-column:2;margin-bottom:calc(-1*var(--private-spacing-ty));color:color-mix(in srgb,var(--shopify-chat-text-color) 64%,transparent);font-size:var(--private-font-size-sm);line-height:1.3}
.message.is-pending,.message.is-thinking,.message.is-error{min-width:var(--private-message-min-width)}
.message__status:empty{display:none}
.message__segments{display:grid;gap:var(--private-spacing-xs)}
.message.assistant .message__segments>shopify-message-feedback{order:1}
.message.user .message__segments{display:grid;justify-items:end;width:100%}
.message__footnote{color:color-mix(in srgb,var(--shopify-chat-text-color) 56%,transparent);font-size:var(--private-font-size-sm);line-height:1.3}
.message.user .message__footnote{justify-self:end;text-align:right}
.message.assistant .message__footnote{justify-self:start}
.message__actions{display:flex;flex-wrap:wrap;align-items:center;gap:var(--private-spacing-xs);margin-block-start:var(--private-spacing-xs)}
.message__actions>shopify-message-feedback{margin-top:0}
.message__handoff-affordance{--handoff-affordance-presentation:persistent;display:flex;flex-wrap:nowrap;align-items:baseline;gap:var(--private-spacing-xs);color:color-mix(in srgb,var(--shopify-chat-text-color) 56%,transparent);font-size:var(--private-font-size-sm);line-height:1.3;text-align:start}
.message__handoff-affordance-button{max-inline-size:100%;padding:0;overflow-wrap:anywhere;border:0;color:inherit;background:none;font:inherit;text-align:inherit;text-decoration:underline;cursor:pointer}
.message__handoff-affordance-button:hover,.message__handoff-affordance-button:focus-visible{text-decoration:underline}
.message__handoff-affordance-button:focus-visible{outline:var(--private-focus-ring-size) solid var(--shopify-chat-text-color);outline-offset:var(--private-focus-ring-size)}
@media (hover:hover) and (pointer:fine) and (not (any-pointer:coarse)){
  .message__handoff-affordance-button{text-decoration:none}
  :host(.desktop-layout) .message__handoff-affordance{--handoff-affordance-presentation:hover_gated}
  :host(.desktop-layout) .message__handoff-affordance,:host(.desktop-layout) .message__actions>shopify-message-feedback::after{opacity:0;transition:opacity var(--private-motion-speed) var(--private-motion-ease)}
  :host(.desktop-layout) .message.assistant:hover .message__handoff-affordance,:host(.desktop-layout) .message.assistant:focus-within .message__handoff-affordance{opacity:1}
}
.reply-by-email-region{flex:0 0 auto;padding-inline:var(--private-conversation-inset)}
.reply-by-email-region:not(:empty){padding-block-start:var(--private-spacing-sm)}
.reply-by-email{margin:0;font-size:var(--private-font-size-sm);line-height:1.4;color:color-mix(in srgb,var(--shopify-chat-text-color) 56%,transparent);opacity:1;transition:opacity var(--private-motion-speed-slow) var(--private-motion-ease)}
@starting-style{.reply-by-email{opacity:0}}
.message__bubble{display:grid;gap:var(--private-spacing-xs);max-width:var(--private-message-max-width);font-size:var(--private-font-size-md);line-height:1.4;white-space:pre-wrap;word-break:break-word}
.message__bubble ul,.message__bubble ol{display:grid;gap:var(--private-spacing-ty);padding-left:var(--private-spacing-lg)}
.message__bubble--pending,.message__bubble--error{display:inline-flex;align-items:center;min-width:var(--private-message-min-width)}
.message__bubble--user{padding:var(--private-spacing-xs) var(--private-spacing-sm);border-radius:var(--private-radius-lg) var(--private-radius-lg) var(--private-radius-xs) var(--private-radius-lg);color:var(--shopify-chat-accent-text-color);background-color:var(--shopify-chat-accent-bg-color);box-shadow:var(--private-message-shadow)}
.message__bubble--assistant{color:var(--shopify-chat-text-color);white-space:normal}
.message.user.is-error .message__bubble--user{opacity:.55}
.message__attachment{--message-attachment-max-height:240px;max-width:var(--private-message-max-width);border-radius:var(--private-radius-lg);overflow:hidden}
.message__attachment-image,.message__attachment-video{display:block;width:auto;max-width:100%;max-height:var(--message-attachment-max-height);height:auto;object-fit:contain;border-radius:var(--private-radius-lg)}
.message__attachment-fallback{display:inline-block;padding:var(--private-spacing-xs) var(--private-spacing-sm);font-size:var(--private-font-size-md);color:var(--shopify-chat-text-color);text-decoration:underline}
.message__attachment-processing{display:inline-flex;align-items:center;min-height:80px;padding:var(--private-spacing-xs) var(--private-spacing-sm);font-size:var(--private-font-size-md);color:var(--shopify-chat-text-color);background-color:var(--shopify-chat-surface-color,rgb(0 0 0/4%));border-radius:var(--private-radius-lg)}
.message--media-upload.is-failed .message__attachment-image,.message--media-upload.is-failed .message__attachment-video{opacity:.55}
.message__attachment-status{display:inline-flex;align-items:center;gap:var(--private-spacing-xs);color:color-mix(in srgb,var(--shopify-chat-text-color) 56%,transparent);font-size:var(--private-font-size-sm);line-height:1.3}
.message__attachment-status-label{color:inherit;font-size:inherit;line-height:inherit}
.message__attachment-spinner{width:12px;height:12px;border:2px solid;border-color:currentcolor color-mix(in srgb,currentcolor 25%,transparent 75%) color-mix(in srgb,currentcolor 25%,transparent 75%);border-radius:50%;animation:.7s linear 0s infinite normal none running shopify-agent-media-spin}
@keyframes shopify-agent-media-spin{100%{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.message__attachment-spinner{animation:none}}
.message__adaptive-ui{min-width:0}
.message{min-width:0}
.message>shopify-suggestion-pills{padding-block-start:var(--private-spacing-xs)}
.message__adaptive-ui--pending{position:relative;min-height:80px;padding:4px;border-radius:var(--private-radius-xs);background:rgba(0,0,0,.04);border:var(--private-border-width) dashed rgb(0,0,0,.12)}
.assistant-thinking{--assistant-thinking-size:12px;--assistant-thinking-gap:8px;display:inline-flex;align-items:center;gap:var(--assistant-thinking-gap);min-height:calc(var(--private-button-size) + 2*var(--assistant-thinking-gap));padding-block:var(--assistant-thinking-gap);padding-inline-end:var(--assistant-thinking-gap)}
.assistant-thinking__spinner{width:var(--assistant-thinking-size);height:var(--assistant-thinking-size);flex-shrink:0}
.assistant-thinking__spinner-icon{display:block;width:var(--assistant-thinking-size);height:var(--assistant-thinking-size);animation:1s linear 0s infinite normal none running assistant-thinking-spin;transform-origin:center center}
@media (prefers-reduced-motion:reduce){.assistant-thinking__spinner-icon{animation:none}}
.assistant-thinking__spinner-track{stroke:color-mix(in srgb,var(--shopify-chat-text-color) 15%,transparent)}
.assistant-thinking__spinner-arc{stroke:color-mix(in srgb,var(--shopify-chat-text-color) 50%,transparent)}
@keyframes assistant-thinking-spin{100%{transform:rotate(360deg)}}
@keyframes assistant-thinking-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}
.assistant-thinking__text{--assistant-thinking-base-color:color-mix(in srgb,var(--shopify-chat-text-color) 55%,transparent);--assistant-thinking-highlight-color:var(--shopify-chat-text-color);font-size:var(--private-font-size-xs);font-weight:400;line-height:var(--private-line-height-xs);color:var(--assistant-thinking-base-color)}
@supports ((-webkit-background-clip:text) or (background-clip:text)){
  .assistant-thinking__text{background-image:linear-gradient(110deg,var(--assistant-thinking-base-color) 20%,var(--assistant-thinking-highlight-color) 50%,var(--assistant-thinking-base-color) 80%);background-size:200% 100%;color:transparent;background-clip:text;animation:1.6s linear 0s infinite normal none running assistant-thinking-shimmer}
}
@media (prefers-reduced-motion:reduce){.assistant-thinking__text{animation:none;color:var(--assistant-thinking-base-color);background-clip:border-box}}
.composer[hidden]{display:none}
/* RECONSTRUCTED: padding-right/bottom/left were blank in the dump; from --private-panel-footer-height (44 + 12 + 20) and measured input inset */
.composer{--composer-top-padding:var(--private-spacing-xl);--composer-actions-offset:calc((var(--private-input-height) - var(--private-button-size))/2);--composer-focus-ring-size:1.5px;--composer-focus-ring-color:var(--shopify-chat-accent-bg-color);--composer-focus-ring-opacity:85%;z-index:10;position:relative;display:grid;align-items:center;align-self:end;padding:var(--composer-top-padding) var(--private-spacing-sm) var(--private-spacing-sm);pointer-events:none}
.composer>*{pointer-events:auto}
.composer::before{content:"";position:absolute;inset:var(--composer-top-padding) 0 0 0;pointer-events:auto;z-index:-1}
.composer:has(>shopify-chat-error-banner)>.composer__input-shell,.composer:has(>shopify-chat-error-banner)>.composer__button--attach,.composer:has(>shopify-chat-error-banner)>.composer__actions{grid-row:2}
.composer>shopify-chat-error-banner{grid-area:1/1;margin-bottom:var(--private-spacing-xs)}
.composer:has(>.composer__notice:not([hidden]))>.composer__input-shell,.composer:has(>.composer__notice:not([hidden]))>.composer__button--attach,.composer:has(>.composer__notice:not([hidden]))>.composer__actions,.composer:has(>.composer__read-only-status:not([hidden]))>.composer__input-shell,.composer:has(>.composer__read-only-status:not([hidden]))>.composer__button--attach,.composer:has(>.composer__read-only-status:not([hidden]))>.composer__actions{grid-row:2}
.composer>.composer__notice,.composer>.composer__read-only-status{grid-area:1/1;margin:0 0 var(--private-spacing-xs);padding:var(--private-spacing-ty) var(--private-spacing-sm);font-size:var(--private-font-size-sm);color:var(--shopify-chat-text-color);background-color:var(--shopify-chat-surface-color,rgb(0 0 0/4%));border-radius:var(--private-radius-xs)}
.chat:has(.composer>shopify-chat-error-banner),.chat:has(.composer>.composer__read-only-status:not([hidden])){--private-panel-footer-height:calc(var(--private-input-height) + var(--private-spacing-sm) + var(--private-spacing-xl) + 3*var(--private-spacing-xs) + var(--private-font-size-xs)*1.4)}
.composer__input-shell{grid-area:1/1;display:grid;min-height:var(--private-input-height);max-height:calc(var(--private-input-height)*2);border-radius:calc(var(--private-input-height)/2);outline:var(--composer-focus-ring-size) solid transparent;overflow:hidden;transition-property:background-color,outline-color;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease);color:var(--shopify-chat-text-color);background-color:var(--shopify-chat-bg-color);border:0;box-shadow:var(--private-input-shadow)}
.composer__input-shell:hover:not(:focus-within){background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 96%,gray)}
.composer__input-shell:focus-within{outline-color:color-mix(in srgb,var(--composer-focus-ring-color) var(--composer-focus-ring-opacity),transparent)}
.composer__input-shell:has(.composer__input:disabled){opacity:.5;cursor:not-allowed}
@media (prefers-reduced-motion:reduce){.composer__input-shell{transition:none}}
@media (forced-colors:active){.composer__input-shell{border:var(--private-border-width) solid CanvasText}}
.composer__input{grid-area:1/1;align-content:center;padding-left:var(--private-spacing-sm);padding-right:calc(var(--private-button-size) + var(--composer-actions-offset));width:100%;min-width:0;min-height:var(--private-input-height);max-height:inherit;field-sizing:content;scrollbar-width:thin;scrollbar-color:var(--private-color-scrollbar-thumb) transparent;font-family:var(--shopify-chat-body-font-family);font-size:var(--private-form-control-font-size);line-height:1.4;color:inherit;background:transparent;border:0;outline:0;box-shadow:none}
.composer__input::placeholder{font:inherit;opacity:.8;color:currentcolor}
.composer__input:placeholder-shown{align-content:unset;line-height:calc(var(--private-input-height) - (var(--private-border-width)*2))}
.composer__input:disabled{cursor:not-allowed}
:host(:not(.desktop-layout)) .composer__input{font-size:max(16px,var(--private-form-control-font-size))}
.composer__actions{position:relative;display:grid;grid-template-columns:auto auto;align-self:end;grid-area:1/1;margin-left:auto;padding-right:var(--composer-actions-offset);padding-bottom:var(--composer-actions-offset)}
.composer__button.composer__button--attach{grid-area:1/1;place-self:end start;margin-left:var(--composer-actions-offset);margin-bottom:var(--composer-actions-offset);z-index:1;opacity:1}
.composer__button--attach:hover:not(:active){opacity:.8}
.composer__button[hidden]{display:none}
.composer--can-attach .composer__input{padding-left:calc(var(--private-button-size) + var(--composer-actions-offset))}
.composer__button{display:grid;align-items:center;justify-content:center;grid-area:1/1;width:var(--private-button-size);height:var(--private-button-size);border-radius:var(--private-button-size);color:var(--shopify-chat-text-color);background-color:transparent;outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);opacity:0;transition-property:color,background-color,opacity,outline-color,scale;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease)}
.composer__button:focus-visible{outline-color:var(--shopify-chat-accent-bg-color)}
.composer__button:disabled{pointer-events:none;opacity:0}
@media (prefers-reduced-motion:reduce){.composer__button{transition:none}}
.composer__button shopify-chat-icon{width:var(--private-button-icon-size);height:var(--private-button-icon-size);transition-property:translate;transition-duration:var(--private-motion-speed);transition-timing-function:var(--private-motion-ease)}
.composer__button--submit,.composer__button--stop{grid-column:2}
.composer__button--submit{color:var(--shopify-chat-accent-text-color);background-color:var(--shopify-chat-accent-bg-color)}
.composer__button--submit shopify-chat-icon{translate:0}
.composer:has(.composer__input:not(:placeholder-shown)) .composer__button--submit{opacity:1}
.composer:has(.composer__input:not(:placeholder-shown)) .composer__button--submit:hover:not(:active){opacity:.8}
.composer__button--stop{scale:0;background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 70%,gray)}
.composer__button--stop shopify-chat-icon{translate:0 var(--private-button-size)}
.composer[data-turn-active] .composer__button--submit{opacity:0;scale:0}
.composer[data-turn-active] .composer__button--submit shopify-chat-icon{translate:0 calc(var(--private-button-size)*-1)}
.composer[data-turn-active] .composer__button--stop{opacity:.5;scale:1}
.composer[data-turn-active] .composer__button--stop:hover:not(:active){opacity:.8}
.composer[data-turn-active] .composer__button--stop shopify-chat-icon{translate:0}
@supports (color:oklch(from red l c h)){
  .composer{--contrast-color:oklch(from var(--shopify-chat-bg-color) clamp(0,(.6/l - 1)*infinity,1) 0 0);--private-input-border-color:color-mix(in srgb,var(--contrast-color) 8%,transparent);--private-input-shadow-color:color-mix(in srgb,var(--contrast-color) 5%,transparent);--private-input-shadow:0 5px 16px -2.5px var(--private-input-shadow-color),0 4px 8px -2px var(--private-input-shadow-color),0 3px 4px -1.5px var(--private-input-shadow-color),0 2px 2px -1px var(--private-input-shadow-color),0 0 0 1px var(--private-input-border-color)}
  .composer__input-shell{background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 80%,transparent);backdrop-filter:blur(var(--private-bg-blur-soft))}
  .composer__input-shell:hover:not(:focus-within){background-color:color-mix(in srgb,var(--shopify-chat-bg-color),var(--contrast-color) 2%)}
  .composer__button--stop{color:color-mix(in srgb,var(--contrast-color) 45%,transparent);background-color:color-mix(in srgb,var(--contrast-color) 10%,transparent)}
  .composer[data-turn-active] .composer__button--stop{opacity:1}
  .composer[data-turn-active] .composer__button--stop:hover:not(:active){color:color-mix(in srgb,var(--contrast-color) 65%,transparent);background-color:color-mix(in srgb,var(--contrast-color) 18%,transparent)}
}
`;

const HISTORY_CSS = `
:host{--chat-history-item-gap:12px;--chat-history-inline-padding:8px;--chat-history-delete-size:32px;--chat-history-refresh-delay-step:30ms;--chat-history-swipe-action-width:calc(var(--chat-history-delete-size) + var(--chat-history-inline-padding) + var(--chat-history-inline-padding));display:block;height:100%;font-family:var(--shopify-chat-body-font-family);color:var(--shopify-chat-text-color)}
#shopify-element-wrapper{display:grid;height:100%}
.chat-history__body{display:flex;flex-direction:column;padding:0 var(--private-spacing-xl) var(--private-spacing-xl)}
.chat-history__heading{font-family:var(--shopify-chat-heading-font-family);font-size:var(--private-font-size-lg);font-weight:600;line-height:1.3;letter-spacing:-.2px;margin-block-end:var(--private-spacing-lg)}
.chat-history__list{display:none;flex-direction:column;gap:var(--private-spacing-xxs);margin-inline:calc(var(--chat-history-inline-padding)*-1)}
:host([state="ready"]) .chat-history__list{display:flex;opacity:1;transition:opacity .3s}
:host([refreshing]) .chat-history__list{opacity:.65}
:host([refreshing]) .chat-history__title{--text-color:var(--shopify-chat-text-color)}
:host([refreshing]) .chat-history__timestamp{--text-color:color-mix(in srgb,var(--shopify-chat-text-color) 50%,transparent)}
/* RECONSTRUCTED: background longhands were blank in the dump */
:host([refreshing]) .chat-history__title,:host([refreshing]) .chat-history__timestamp{background-image:linear-gradient(90deg,var(--text-color) 0%,color-mix(in srgb,var(--text-color) 35%,transparent) 50%,var(--text-color) 100%);background-size:300% 100%;background-clip:text;color:transparent;animation:2.5s ease-in-out 0s infinite normal none running chat-history-text-shimmer}
@supports (animation-delay:calc(sibling-index()*1ms)){
  :host([refreshing]) .chat-history__item{animation-delay:calc((5 - abs(mod(sibling-index() - 1,10) - 5))*var(--chat-history-refresh-delay-step))}
  :host([refreshing]) .chat-history__select,:host([refreshing]) .chat-history__content,:host([refreshing]) .chat-history__title,:host([refreshing]) .chat-history__timestamp{animation-delay:inherit}
}
@keyframes chat-history-text-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}
.chat-history__item{--chat-history-swipe-translate:0px;--chat-history-swipe-progress:0;--chat-history-delete-icon-scale:.85;position:relative;overflow:visible;border-radius:var(--private-radius-xs);transition:background-color .15s}
.chat-history__swipe-track{display:flex;align-items:center;inline-size:100%}
.chat-history__item--hovered:not(:active){background:color-mix(in srgb,var(--shopify-chat-text-color) 4%,transparent)}
/* RECONSTRUCTED: padding longhands were blank in the dump */
.chat-history__select{display:flex;align-items:center;gap:var(--chat-history-item-gap);flex:1 1 0%;min-width:0;padding:var(--private-spacing-xs) calc(var(--chat-history-delete-size) + var(--private-spacing-xxs)) var(--private-spacing-xs) var(--chat-history-inline-padding);border-radius:var(--private-radius-xs);cursor:pointer;color:inherit;text-align:start;transition:background-color .15s}
.chat-history__select:active{background:color-mix(in srgb,var(--shopify-chat-text-color) 8%,transparent)}
.chat-history__select:focus-visible{outline:2px solid var(--shopify-chat-accent-bg-color);outline-offset:2px;border-radius:var(--private-radius-xs)}
.chat-history__delete{border:0;background:none;color:var(--shopify-chat-text-color);border-radius:999px;width:var(--chat-history-delete-size);height:var(--chat-history-delete-size);display:inline-flex;align-items:center;justify-content:center;cursor:pointer;position:absolute;right:8px;top:50%;translate:0 -50%;transition:background-color .15s;pointer-events:none}
.chat-history__delete shopify-chat-icon{width:var(--private-button-icon-size);height:var(--private-button-icon-size);opacity:0;scale:.85;transition:opacity .15s,scale .2s}
.chat-history__item--hovered .chat-history__delete,.chat-history__item:has(.chat-history__select:focus-visible) .chat-history__delete,.chat-history__delete:focus-visible{pointer-events:auto}
.chat-history__item--hovered .chat-history__delete shopify-chat-icon,.chat-history__item:has(.chat-history__select:focus-visible) .chat-history__delete shopify-chat-icon,.chat-history__delete:focus-visible shopify-chat-icon{opacity:.6;scale:1}
.chat-history__item--hovered .chat-history__delete:hover:not(:active){background:color-mix(in srgb,var(--shopify-chat-text-color) 8%,transparent)}
.chat-history__item--hovered .chat-history__delete:hover:not(:active) shopify-chat-icon,.chat-history__item--hovered .chat-history__delete:active shopify-chat-icon{opacity:1}
.chat-history__item--hovered .chat-history__delete:active{background:color-mix(in srgb,var(--shopify-chat-text-color) 14%,transparent)}
@media (hover:none),(pointer:coarse){
  .chat-history__item{overflow:clip;touch-action:pan-y;transition:none;-webkit-tap-highlight-color:transparent}
  .chat-history__swipe-track{align-items:stretch;inline-size:calc(100% + var(--chat-history-swipe-action-width));transform:translate3d(var(--chat-history-swipe-translate),0,0);transition:transform .2s}
  .chat-history__select{flex:0 0 calc(100% - var(--chat-history-swipe-action-width));inline-size:calc(100% - var(--chat-history-swipe-action-width));padding-right:var(--chat-history-inline-padding);touch-action:pan-y;transition:none;user-select:none;-webkit-tap-highlight-color:transparent}
  .chat-history__select:active{background:transparent}
  .chat-history__delete{position:static;flex:0 0 var(--chat-history-swipe-action-width);inline-size:var(--chat-history-swipe-action-width);min-inline-size:var(--chat-history-swipe-action-width);width:auto;height:auto;border-radius:var(--private-radius-xs);translate:none}
  .chat-history__item--actions-revealed{--chat-history-swipe-translate:calc(-1*var(--chat-history-swipe-action-width));--chat-history-swipe-progress:1;--chat-history-delete-icon-scale:1}
  .chat-history__item--swiping .chat-history__swipe-track{transition:none;will-change:transform}
  .chat-history__item--swiping .chat-history__delete,.chat-history__item--actions-revealed .chat-history__delete,.chat-history__delete:focus-visible{pointer-events:auto;background:color-mix(in srgb,var(--shopify-chat-text-color) 8%,transparent)}
  .chat-history__item--swiping .chat-history__delete shopify-chat-icon,.chat-history__item--actions-revealed .chat-history__delete shopify-chat-icon{opacity:var(--chat-history-swipe-progress,1);scale:var(--chat-history-delete-icon-scale,1)}
}
.chat-history__delete:focus-visible{outline:2px solid var(--shopify-chat-accent-bg-color);outline-offset:2px}
.chat-history__content{display:flex;flex-direction:column;gap:var(--private-spacing-ty);min-width:0}
.chat-history__title{font-size:var(--private-font-size-sm);font-weight:600;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.chat-history__timestamp{font-size:var(--private-font-size-sm);font-weight:400;color:color-mix(in srgb,var(--shopify-chat-text-color) 50%,transparent)}
.chat-history__new-chat shopify-chat-icon{width:var(--private-button-icon-size);height:var(--private-button-icon-size);flex-shrink:0}
.chat-history__skeleton,.chat-history__error,.chat-history__empty{display:none}
@keyframes chat-history-shimmer{0%{background-position:-800px 0}100%{background-position:800px 0}}
:host([state="loading"]) .chat-history__skeleton{display:flex;flex-direction:column;gap:var(--private-spacing-xxs)}
:host([state="error"]) .chat-history__error,:host([state="empty"]) .chat-history__empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%}
.chat-history__error-message,.chat-history__empty-text{font-size:var(--private-font-size-md);font-weight:450;text-align:center;color:color-mix(in srgb,var(--shopify-chat-text-color) 50%,transparent)}
.chat-history__retry,.chat-history__new-chat{margin-block-start:var(--private-spacing-sm)}
.chat-history__skeleton-item{display:flex;align-items:center;gap:var(--chat-history-item-gap);padding:var(--private-spacing-xs)}
.chat-history__skeleton-bar{--shimmer-base:color-mix(in srgb,var(--shopify-chat-text-color) 8%,transparent);--shimmer-highlight:color-mix(in srgb,var(--shopify-chat-text-color) 14%,transparent);height:12px;border-radius:6px;background-image:linear-gradient(90deg,var(--shimmer-base) 0%,var(--shimmer-highlight) 50%,var(--shimmer-base) 100%);background-size:800px 100%;animation:2.5s ease-in-out 0s infinite normal none running chat-history-shimmer}
.chat-history__skeleton-content{display:flex;flex-direction:column;gap:6px;min-width:0}
.chat-history__skeleton-bar--sm{height:10px}
@keyframes chat-history-delete{100%{opacity:0;translate:8px}}
.chat-history__item--deleting{animation:.15s ease-out 0s 1 normal forwards running chat-history-delete;pointer-events:none}
@keyframes chat-history-restore{0%{opacity:0;translate:8px}}
.chat-history__item--restored{animation:.2s ease-out 0s 1 normal none running chat-history-restore}
@media (prefers-reduced-motion:reduce){
  .chat-history__skeleton-bar,.chat-history__swipe-track,.chat-history__select,.chat-history__delete,.chat-history__delete shopify-chat-icon{animation:none;transition:none}
  .chat-history__item--deleting,.chat-history__item--restored{animation-duration:1ms}
}
`;

/* Not in the dump (its own shadow CSS wasn't captured): styled to match the screenshot */
const PILLS_CSS = `
:host{display:block}
ul{display:flex;flex-wrap:wrap;gap:var(--private-spacing-xs);list-style:none}
button{height:26px;padding:0 14px;border-radius:var(--private-radius-full);font-size:var(--private-form-control-font-size);line-height:1;color:var(--shopify-chat-text-color);background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 85%,transparent);box-shadow:0 0 0 1px var(--private-input-border-color,rgb(0,0,0,.08)),0 2px 6px rgb(0,0,0,.04);outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);opacity:1;translate:0;transition:background-color var(--private-motion-speed) var(--private-motion-ease),outline-color var(--private-motion-speed) var(--private-motion-ease),opacity var(--private-motion-speed-slow) var(--private-motion-ease),translate var(--private-motion-speed-slow) var(--private-motion-ease),scale var(--private-motion-speed) var(--private-motion-ease)}
@starting-style{button{opacity:0;translate:0 var(--private-spacing-xs)}}
button:hover:not(:active){background-color:color-mix(in srgb,var(--shopify-chat-bg-color) 92%,gray)}
button:active{scale:.97}
button:focus-visible{outline-color:var(--shopify-chat-accent-bg-color)}
@media (prefers-reduced-motion:reduce){button{transition:none}}
`;

/* ================= ICONS (paths from dump; size-contract is mine – not captured) ================= */
const ICONS = {
  'chat-bubble':'<path d="M5 3.125H11C12.3117 3.125 13.375 4.18832 13.375 5.5V9.09863C13.375 10.3794 12.3591 11.4298 11.0791 11.4727L10.9795 11.4756C10.1532 11.5033 9.38829 11.9188 8.91504 12.5967L8.11621 13.7402C8.06582 13.8125 7.959 13.8116 7.91016 13.7383L7.10352 12.5283C6.62309 11.8078 5.81427 11.375 4.94824 11.375C3.66521 11.375 2.625 10.3348 2.625 9.05176V5.5C2.625 4.18832 3.68832 3.125 5 3.125Z" stroke-width="1.25"></path>',
  'back':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M12.75 8h-9.5m0 0 4-4m-4 4 4 4"></path>',
  'profile-circle':'<circle cx="8" cy="8" r="6" stroke-width="1.25"></circle><circle cx="8" cy="6.25" r="1.75" stroke-width="1.25"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M4.95 11.8C5.59 10.3 6.7 9.5 8 9.5s2.41.8 3.05 2.3"></path>',
  'compose':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M9.5 3H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6.5"></path><path stroke-linecap="round" stroke-width="1.25" d="m8 8 3-3m2.5-2.5-1.125 1.125"></path>',
  'size-expand':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M3 9.5V13h3.5M3 13l3.5-3.5m6.5-3V3H9.5m0 3.5L13 3"></path>',
  'size-contract':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M6.5 13V9.5H3m3.5 0L3 13m6.5-10v3.5H13M9.5 6.5L13 3"></path>',
  'close':'<path stroke-linecap="round" stroke-width="1.25" d="M3.757 8h8.486"></path>',
  /* the four below were not captured – drawn to match */
  'attach':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="m13 7.4-4.6 4.6a2.75 2.75 0 0 1-3.9-3.9l4.9-4.9a1.8 1.8 0 0 1 2.6 2.6L7.5 10.6a.9.9 0 0 1-1.3-1.3l4.4-4.4"></path>',
  'arrow-up':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M8 12.75v-9.5m0 0-4 4m4-4 4 4"></path>',
  'arrow-down':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M8 3.25v9.5m0 0-4-4m4 4 4-4"></path>',
  'stop':'<rect x="4.5" y="4.5" width="7" height="7" rx="1.5" stroke-width="1.25"></rect>'
};

const style = css => { const s=document.createElement('style'); s.textContent=css; return s; };

/* ================= Components ================= */
class ShopifyChatIcon extends HTMLElement{
  static get observedAttributes(){return['name']}
  connectedCallback(){ if(!this.shadowRoot){this.attachShadow({mode:'open'}).append(style(ICON_CSS));} this._r(); }
  attributeChangedCallback(){ if(this.shadowRoot) this._r(); }
  _r(){ const sr=this.shadowRoot; sr.querySelector('svg')?.remove();
    const t=document.createElement('template');
    t.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" viewBox="0 0 16 16" data-icon-family="outlined">${ICONS[this.getAttribute('name')]||''}</svg>`;
    sr.append(t.content); }
}

class ShopifyChatIconButton extends HTMLElement{
  static get observedAttributes(){return['name','label']}
  connectedCallback(){
    if(!this.shadowRoot){
      const sr=this.attachShadow({mode:'open'}); sr.append(style(RESET+ICONBTN_CSS));
      const t=document.createElement('template');
      t.innerHTML=`<button type="button"><div class="interior"><shopify-chat-icon></shopify-chat-icon></div></button>`;
      sr.append(t.content);
    }
    this._u();
  }
  attributeChangedCallback(){ if(this.shadowRoot) this._u(); }
  _u(){ const sr=this.shadowRoot;
    sr.querySelector('button').setAttribute('aria-label',this.getAttribute('label')||'');
    sr.querySelector('shopify-chat-icon').setAttribute('name',this.getAttribute('name')||''); }
}

class ShopifyChatIconButtonGroup extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'}); sr.append(style(RESET+GROUP_CSS));
    const items=[...this.children].filter(c=>c.hasAttribute('slot')).sort((a,b)=>a.slot.localeCompare(b.slot,undefined,{numeric:true}));
    const allHidden=items.length>0&&items.every(i=>i.hasAttribute('visually-hidden'));
    const t=document.createElement('template');
    t.innerHTML=`<ul class="icon-button-group__list${allHidden?' icon-button-group__list--all-visually-hidden':''}" role="list">`+
      items.map(i=>`<li${i.hasAttribute('visually-hidden')?' class="sr-only icon-button-group__item--visually-hidden"':''}><slot name="${i.slot}"></slot></li>`).join('')+
      `</ul><slot></slot>`;
    sr.append(t.content);
  }
}

class ShopifySignInButton extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'}); sr.append(style(RESET+SIGNIN_CSS));
    const t=document.createElement('template');
    t.innerHTML=`<div id="shopify-element-wrapper"><button class="sign-in-button sign-in-button--shop" type="button" aria-label="Sign in">Sign in</button></div>`;
    sr.append(t.content);
  }
}


/* Not in the dump (Shop's login form has its own CSS): built on the --shopify-login-form-* variables the dump defines */
const LOGIN_CSS = `
:host{display:block;width:100%;max-width:340px;margin-inline:auto;color:var(--shopify-login-form-color-text,var(--shopify-chat-text-color));font-family:var(--shopify-login-form-font-body,var(--shopify-chat-body-font-family))}
form{display:grid;gap:var(--private-spacing-lg);opacity:1;translate:0;transition:opacity var(--private-motion-speed-slow) var(--private-motion-ease),translate var(--private-motion-speed-slow) var(--private-motion-ease)}
@starting-style{form{opacity:0;translate:0 var(--private-spacing-md)}}
form[hidden]{display:none}
h2{font-family:var(--shopify-chat-heading-font-family);font-size:var(--private-font-size-lg);font-weight:600;line-height:1.3;letter-spacing:-.2px}
p{font-size:var(--private-font-size-sm);line-height:1.5;color:var(--private-color-text-subdued)}
label{display:grid;gap:var(--private-spacing-xxs);font-size:var(--private-font-size-sm);font-weight:600}
input{height:var(--private-input-height);padding:0 14px;border-radius:var(--private-radius-xs);border:var(--private-border-width) solid var(--private-color-border);background:color-mix(in srgb,var(--shopify-login-form-color-background,#fff) 80%,transparent);color:inherit;font-size:var(--private-form-control-font-size);outline:var(--private-focus-ring-size) solid transparent;outline-offset:0;transition:outline-color var(--private-motion-speed) var(--private-motion-ease),border-color var(--private-motion-speed) var(--private-motion-ease)}
input:focus{outline-color:color-mix(in srgb,var(--shopify-login-form-color-accent,#000) 85%,transparent);border-color:transparent}
input[aria-invalid="true"]{border-color:var(--private-color-critical-text)}
input::placeholder{color:var(--private-color-text-subdued);opacity:.8}
.error{min-height:1em;font-size:var(--private-font-size-sm);color:var(--private-color-critical-text)}
.error:empty{display:none}
button.primary{min-block-size:var(--private-input-height);padding:var(--private-spacing-xs) var(--private-spacing-lg);border-radius:var(--private-radius-xs);font-size:var(--private-form-control-font-size);font-weight:600;color:var(--shopify-login-form-color-accent-text,#fff);background:var(--shopify-login-form-color-accent,#000);outline:var(--private-focus-ring-size) solid transparent;outline-offset:var(--private-focus-ring-size);transition:opacity var(--private-motion-speed) var(--private-motion-ease),outline-color var(--private-motion-speed) var(--private-motion-ease),scale var(--private-motion-speed) var(--private-motion-ease)}
button.primary:hover:not(:active){opacity:.85}
button.primary:active{scale:.98}
button.primary:focus-visible{outline-color:var(--shopify-login-form-color-accent,#000)}
button.link{justify-self:center;font-size:var(--private-font-size-sm);color:var(--private-color-text-subdued);text-decoration:underline}
button.link:hover{color:var(--shopify-login-form-color-text,#000)}
.disclaimer{font-size:var(--private-font-size-xxs);line-height:1.5;color:color-mix(in srgb,var(--shopify-chat-text-color) 45%,transparent);text-align:center}
.disclaimer a{color:inherit}
@media (prefers-reduced-motion:reduce){form,input,button.primary{transition:none}}
`;

/* ================= Chat components (markup rebuilt from class names in the dump; text from the store's own settings/translations) ================= */
const T = { ask:'Ask anything…', send:'Send', stop:'Stop generating', attach:'Attach', thinking:'Thinking...', jump:'Jump to latest',
  disclaimer:'Your messages are visible to Keykraft for the provision and improvement of the services. See',
  privacy:'privacy policy', suggested:'Suggested questions',
  greeting:'👋 Hi! Welcome to Keykraft. Ask us about our AI, web, cloud, IT, medical billing and social media services, or tell us what you are looking for and we will suggest something.',
  replies:[] };
/* Card artwork: inline SVG (no network). White surface + the Sign-in button colour #5433eb. */
const svgURI = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s.replace(/\s*\n\s*/g,' '));
const BG = `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#ffffff'/><stop offset='1' stop-color='#ece8ff'/></linearGradient>
  <radialGradient id='glow' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='#5433eb' stop-opacity='.16'/><stop offset='1' stop-color='#5433eb' stop-opacity='0'/></radialGradient></defs>
  <rect width='120' height='120' fill='url(#g)'/><circle cx='60' cy='60' r='58' fill='url(#glow)'/>`;
const ART = {
  ai: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>%BG%
    <g stroke='#5433eb' stroke-opacity='.4' stroke-width='1.6' fill='none'><path d='M16 28L38 46M104 26L82 46M18 100L40 82M102 98L80 82'/></g>
    <g fill='#5433eb' fill-opacity='.55'><circle cx='16' cy='28' r='4.5'/><circle cx='104' cy='26' r='4.5'/><circle cx='18' cy='100' r='4.5'/><circle cx='102' cy='98' r='4.5'/></g>
    <line x1='60' y1='20' x2='60' y2='33' stroke='#5433eb' stroke-width='3' stroke-linecap='round'/>
    <circle cx='60' cy='17' r='5' fill='#5433eb'/>
    <rect x='28' y='47' width='8' height='17' rx='4' fill='#8f7af2'/>
    <rect x='84' y='47' width='8' height='17' rx='4' fill='#8f7af2'/>
    <rect x='35' y='33' width='50' height='46' rx='14' fill='#5433eb'/>
    <rect x='41' y='41' width='38' height='30' rx='9' fill='#fff'/>
    <circle cx='51' cy='55' r='5.5' fill='#5433eb'/><circle cx='69' cy='55' r='5.5' fill='#5433eb'/>
    <circle cx='52.8' cy='53.2' r='1.8' fill='#fff'/><circle cx='70.8' cy='53.2' r='1.8' fill='#fff'/>
    <path d='M52 64Q60 69 68 64' stroke='#5433eb' stroke-width='2.6' fill='none' stroke-linecap='round'/>
    <rect x='42' y='84' width='36' height='18' rx='9' fill='#5433eb'/>
    <circle cx='52' cy='93' r='2.5' fill='#fff'/><circle cx='60' cy='93' r='2.5' fill='#fff' fill-opacity='.6'/><circle cx='68' cy='93' r='2.5' fill='#fff'/>
  </svg>`,
  cloud: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>%BG%
    <g fill='#5433eb' fill-opacity='.2'><circle cx='20' cy='20' r='3'/><circle cx='100' cy='16' r='4'/><circle cx='104' cy='62' r='3'/><circle cx='14' cy='64' r='4'/></g>
    <g fill='#5433eb'><circle cx='44' cy='52' r='17'/><circle cx='66' cy='42' r='22'/><circle cx='86' cy='54' r='14'/><rect x='30' y='54' width='70' height='17' rx='8.5'/></g>
    <path d='M64 64V46M56 53l8-8 8 8' stroke='#fff' stroke-width='4.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>
    <g stroke='#8f7af2' stroke-width='2' stroke-linecap='round'><path d='M42 76V90M64 76V90M86 76V90'/></g>
    <g fill='#5433eb'><rect x='32' y='90' width='20' height='12' rx='3.5'/><rect x='54' y='90' width='20' height='12' rx='3.5'/><rect x='76' y='90' width='20' height='12' rx='3.5'/></g>
    <g fill='#fff'><circle cx='38' cy='96' r='2'/><circle cx='60' cy='96' r='2'/><circle cx='82' cy='96' r='2'/></g>
  </svg>`,
  it: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>%BG%
    <g fill='#5433eb' fill-opacity='.2'><circle cx='16' cy='18' r='4'/><circle cx='104' cy='22' r='3'/><circle cx='14' cy='100' r='3'/></g>
    <rect x='20' y='22' width='80' height='54' rx='9' fill='#5433eb'/>
    <rect x='26' y='28' width='68' height='42' rx='5' fill='#fff'/>
    <g stroke='#5433eb' stroke-width='3.4' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M46 41L37 49L46 57'/><path d='M74 41L83 49L74 57'/></g>
    <path d='M64 38L56 60' stroke='#8f7af2' stroke-width='3.4' stroke-linecap='round'/>
    <rect x='53' y='76' width='14' height='9' fill='#8f7af2'/>
    <rect x='41' y='85' width='38' height='6' rx='3' fill='#5433eb'/>
    <path d='M92 66L110 73V86C110 97 102 104 92 108C82 104 74 97 74 86V73Z' fill='#4524db' stroke='#fff' stroke-width='2.5' stroke-linejoin='round'/>
    <path d='M84 87L90 93L101 80' stroke='#fff' stroke-width='4' fill='none' stroke-linecap='round' stroke-linejoin='round'/>
  </svg>`
};
for (const k in ART) ART[k] = ART[k].replace('%BG%', BG);
const PRODUCTS = [
  { title:'Agentic AI', href:'https://keykraftt.com/agentic-ai.html', img:svgURI(ART.ai) },
  { title:'Cloud Services', href:'https://keykraftt.com/cloud-services.html', img:svgURI(ART.cloud) },
  { title:'IT Services', href:'https://keykraftt.com/it-services.html', img:svgURI(ART.it) }
];
const SUGGESTIONS = ['Our services','Agentic AI','Cloud services','IT services','Pricing','Talk to a human'];

class ShopifySuggestionPills extends HTMLElement{
  connectedCallback(){
    if(!this.shadowRoot){ this.attachShadow({mode:'open'}).append(style(RESET+PILLS_CSS)); }
    this.render();
  }
  set items(v){ this._items=v; if(this.shadowRoot) this.render(); }
  render(){
    const sr=this.shadowRoot; sr.querySelector('ul')?.remove();
    const ul=document.createElement('ul'); ul.setAttribute('aria-label',T.suggested);
    (this._items||[]).forEach(t=>{ const li=document.createElement('li'), b=document.createElement('button');
      b.type='button'; b.textContent=t; b.addEventListener('click',()=>this.dispatchEvent(new CustomEvent('pill-select',{detail:t,bubbles:true,composed:true})));
      li.append(b); ul.append(li); });
    sr.append(ul);
  }
}


class ShopifyLoginForm extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'});
    sr.append(style(RESET+LOGIN_CSS));
    const t=document.createElement('template');
    t.innerHTML=`
      <form class="step-email" novalidate>
        <div><h2>Sign in</h2><p>Enter your email to continue.</p></div>
        <label>Email<input type="email" name="email" autocomplete="email" placeholder="you@example.com" required></label>
        <div class="error" role="alert"></div>
        <button class="primary" type="submit">Continue</button>
        <p class="disclaimer">By continuing, you share your name and email with Keykraft. See our <a href="https://keykraftt.com/terms.html" target="_blank" rel="noopener">terms of service</a> and <a href="https://keykraftt.com/privacy.html" target="_blank" rel="noopener">privacy policy</a>.</p>
      </form>
      <form class="step-code" novalidate hidden>
        <div><h2>Check your email</h2><p class="sent"></p></div>
        <label>Code<input type="text" name="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="123456" required></label>
        <div class="error" role="alert"></div>
        <button class="primary" type="submit">Verify</button>
        <button class="link" type="button">Use a different email</button>
      </form>`;
    sr.append(t.content);
    const $=s=>sr.querySelector(s), fe=$('.step-email'), fc=$('.step-code');
    let email='';
    const err=(f,msg,input)=>{ f.querySelector('.error').textContent=msg; input.setAttribute('aria-invalid',msg?'true':'false'); };
    fe.addEventListener('submit',e=>{ e.preventDefault(); const i=fe.email;
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value.trim())) return err(fe,'Enter a valid email address.',i);
      err(fe,'',i); email=i.value.trim(); $('.sent').textContent='We sent a 6-digit code to '+email+'. (Demo: any 6 digits work.)';
      fe.hidden=true; fc.hidden=false; fc.code.focus(); });
    fc.addEventListener('submit',e=>{ e.preventDefault(); const i=fc.code;
      if(!/^\d{6}$/.test(i.value.trim())) return err(fc,'Enter the 6-digit code.',i);
      err(fc,'',i); i.value=''; fe.email.value=''; fc.hidden=true; fe.hidden=false;
      this.dispatchEvent(new CustomEvent('shopify-login-success',{detail:{email},bubbles:true,composed:true})); });
    fc.querySelector('.link').addEventListener('click',()=>{ fc.hidden=true; fe.hidden=false; fe.email.focus(); });
    this.focusEmail=()=>{ fe.hidden=false; fc.hidden=true; requestAnimationFrame(()=>fe.email.focus()); };
  }
}

class ShopifyChatViewSwitcher extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'});
    sr.append(style(RESET+VARS+SWITCHER_CSS));
    const t=document.createElement('template'); t.innerHTML='<div id="shopify-element-wrapper"><slot></slot></div>'; sr.append(t.content);
  }
}

const FEATHER = pos => `<div class="scroll-feather scroll-feather--${pos}" aria-hidden="true"><div class="scroll-feather__layer scroll-feather__layer--soft"></div><div class="scroll-feather__layer scroll-feather__layer--medium"></div><div class="scroll-feather__layer scroll-feather__layer--strong"></div></div>`;

class ShopifyChatConversation extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'});
    sr.append(style(RESET+VARS+SCROLL+MD_CSS+CONV_CSS));
    const cards=PRODUCTS.map(p=>`<a class="empty-state__product-card${p.img?'':' empty-state__product-card--missing-image'}"${p.hidden?' hidden':''} href="${p.href}" target="_blank" rel="noopener">${p.img?`<img class="empty-state__product-card-image" alt="" src="${p.img}">`:''}<span class="empty-state__product-card-title">${p.title}</span></a>`).join('');
    const t=document.createElement('template');
    t.innerHTML=`<div id="shopify-element-wrapper"><div class="chat">
      <div class="scroll-container" tabindex="-1">
        <div class="empty-state">
          <div class="empty-state__welcome">
            <div class="empty-state__header"><h2 class="empty-state__greeting" hidden></h2><p class="empty-state__subheading"></p></div>
            <div class="empty-state__visual"><div class="empty-state__cards">${cards}</div></div>
          </div>
          <div class="empty-state__footer">
            <p class="empty-state__disclaimer">${T.disclaimer} <a class="empty-state__disclaimer-link" href="https://keykraftt.com/privacy.html" target="_blank" rel="noopener">${T.privacy}</a>.</p>
            <shopify-suggestion-pills class="empty-state__suggestions"></shopify-suggestion-pills>
          </div>
        </div>
        <div class="messages" role="log" aria-live="polite" hidden></div>
      </div>
      ${FEATHER('top')}${FEATHER('bottom')}
      <button class="jump-to-latest" type="button"><shopify-chat-icon class="jump-to-latest__icon" name="arrow-down"></shopify-chat-icon><span>${T.jump}</span></button>
      <div class="composer composer--can-attach">
        <div class="composer__input-shell"><textarea class="composer__input" rows="1" placeholder="${T.ask}" aria-label="${T.ask}"></textarea></div>
        <button class="composer__button composer__button--attach" type="button" aria-label="${T.attach}"><shopify-chat-icon name="attach"></shopify-chat-icon></button>
        <div class="composer__actions">
          <button class="composer__button composer__button--submit" type="button" aria-label="${T.send}"><shopify-chat-icon name="arrow-up"></shopify-chat-icon></button>
          <button class="composer__button composer__button--stop" type="button" aria-label="${T.stop}"><shopify-chat-icon name="stop"></shopify-chat-icon></button>
        </div>
      </div>
    </div></div>`;
    sr.append(t.content);

    const $=s=>sr.querySelector(s);
    $('.empty-state__subheading').textContent=T.greeting;
    const pills=$('shopify-suggestion-pills'); pills.items=SUGGESTIONS;
    sr.querySelectorAll('.empty-state__product-card-image').forEach(img=>img.addEventListener('error',()=>{
      img.closest('.empty-state__product-card').classList.add('empty-state__product-card--missing-image'); img.remove(); }));

    const scroller=$('.scroll-container'), msgs=$('.messages'), composer=$('.composer'), input=$('.composer__input'), jump=$('.jump-to-latest');
    let timer=null, thinkingEl=null;
    const toBottom=()=>scroller.scrollTo({top:scroller.scrollHeight,behavior:'smooth'});
    const addMsg=(cls,html)=>{ const d=document.createElement('div'); d.className='message '+cls; d.innerHTML=html; msgs.append(d); return d; };
    const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
    const endTurn=()=>{ composer.removeAttribute('data-turn-active'); clearTimeout(timer); thinkingEl?.remove(); thinkingEl=null; };
    const send=(text,forcedId)=>{
      text=text.trim(); msgs.querySelectorAll('.followups').forEach(n=>n.remove()); if(!text||composer.hasAttribute('data-turn-active')) return;
      if(msgs.hidden){ msgs.hidden=false; $('.empty-state').hidden=true; this.dispatchEvent(new CustomEvent('shopify-chat-started',{bubbles:true,composed:true})); }
      addMsg('user',`<div class="message__segments"><div class="message__bubble message__bubble--user">${esc(text)}</div></div>`);
      input.value=''; composer.setAttribute('data-turn-active','');
      const showThinking=()=>{ thinkingEl=addMsg('assistant is-thinking',`<div class="message__segments"><div class="assistant-thinking"><span class="assistant-thinking__spinner"><svg class="assistant-thinking__spinner-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle class="assistant-thinking__spinner-track" cx="6" cy="6" r="4.5" stroke-width="1.5"/><path class="assistant-thinking__spinner-arc" d="M6 1.5a4.5 4.5 0 0 1 4.5 4.5" stroke-width="1.5" stroke-linecap="round"/></svg></span><span class="assistant-thinking__text">${T.thinking}</span></div></div>`); requestAnimationFrame(toBottom); };
      const inl=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
      const rich=s=>{ const out=[]; let list=null;
        const flush=()=>{ if(list){ out.push(`<${list.t} class="md-list md-list--${list.t==='ul'?'unordered':'ordered'}" style="display:grid;gap:6px;margin:8px 0 0;padding-inline-start:20px;list-style-position:outside;list-style-type:${list.t==='ul'?'disc':'decimal'}">${list.i.map(x=>`<li class="md-list__item" style="line-height:1.4">${x}</li>`).join('')}</${list.t}>`); list=null; } };
        String(s).split('\n').forEach(raw=>{ const line=raw.trim(); let m;
          if(!line){ flush(); return; }
          if((m=line.match(/^[•\-\*]\s+(.*)$/))){ if(!list||list.t!=='ul'){ flush(); list={t:'ul',i:[]}; } list.i.push(inl(m[1])); }
          else if((m=line.match(/^\d+[\.\)]\s+(.*)$/))){ if(!list||list.t!=='ol'){ flush(); list={t:'ol',i:[]}; } list.i.push(inl(m[1])); }
          else { flush(); out.push(`<p style="margin:${out.length?'10px':'0'} 0 0;line-height:1.45">${inl(line)}</p>`); }
        });
        flush(); return out.join(''); };
      const safe=u=>/^(https?:|mailto:|tel:)/i.test(u)?u:'#';
      showThinking();
      const res=forcedId?window.KKBot.answerById(forcedId):window.KKBot.reply(text);
      timer=setTimeout(()=>{ thinkingEl?.remove(); thinkingEl=null;
        const links=(res.links&&res.links.length)?`<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">${res.links.map(l=>`<a href="${safe(l.u)}" target="_blank" rel="noopener" style="display:inline-block;padding:6px 12px;border:1px solid color-mix(in srgb,currentColor 25%,transparent);border-radius:999px;font-size:12.5px;line-height:1.3;color:inherit;text-decoration:none">${esc(l.l)} ↗</a>`).join('')}</div>`:'';
        addMsg('assistant',`<div class="message__segments"><div class="message__bubble message__bubble--assistant">${rich(res.text)}${links}</div></div>`);
        if(res.followups&&res.followups.length){
          const fp=document.createElement('shopify-suggestion-pills'); fp.className='followups'; fp.items=res.followups.map(f=>f.label);
          fp.addEventListener('pill-select',e=>{ const f=res.followups.find(x=>x.label===e.detail); send(e.detail,f&&f.id); });
          msgs.append(fp);
        }
        requestAnimationFrame(toBottom);
        composer.removeAttribute('data-turn-active');
      }, 600+Math.min(res.text.length*4,700));
    };
    $('.composer__button--submit').addEventListener('click',()=>send(input.value));
    $('.composer__button--stop').addEventListener('click',endTurn);
    input.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){ e.preventDefault(); send(input.value); } });
    pills.addEventListener('pill-select',e=>send(e.detail));
    scroller.addEventListener('scroll',()=>{ const away=scroller.scrollHeight-scroller.scrollTop-scroller.clientHeight>120;
      jump.classList.toggle('jump-to-latest--visible',away&&!msgs.hidden); });
    jump.addEventListener('click',toBottom);
  }
}

class ShopifyChatHistory extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'});
    sr.append(style(RESET+VARS+SCROLL+HISTORY_CSS));
    const t=document.createElement('template');
    t.innerHTML=`<div id="shopify-element-wrapper"><div class="scroll-container">${FEATHER('top')}<div class="chat-history__body">
      <h2 class="chat-history__heading">Chat history</h2>
      <ul class="chat-history__list" aria-label="Conversation history"></ul>
      <div class="chat-history__skeleton"><div class="chat-history__skeleton-item"><div class="chat-history__skeleton-content"><div class="chat-history__skeleton-bar" style="width:120px"></div><div class="chat-history__skeleton-bar chat-history__skeleton-bar--sm" style="width:60px"></div></div></div></div>
      <div class="chat-history__error"><p class="chat-history__error-message">Something went wrong.</p><button class="chat-history__retry" type="button">Try again</button></div>
      <div class="chat-history__empty"><p class="chat-history__empty-text">No past conversations</p><button class="chat-history__new-chat" type="button">Start a new chat</button></div>
    </div></div></div>`;
    sr.append(t.content);
  }
}

const RUNTIME_HTML = `
<div id="shopify-element-wrapper">
  <div class="backdrop" aria-hidden="true"></div>

  <div class="activator-nudge activator-nudge--right">
    <button type="button" part="activator" class="activator" aria-label="Support" aria-expanded="false">
      <span class="activator__icon"><shopify-chat-icon name="chat-bubble"></shopify-chat-icon></span>
      <span class="activator__label">Support</span>
      <span class="activator__indicator" aria-label="Unread replies"></span>
    </button>
  </div>

  <section class="panel panel--right panel--empty-state" part="dialog" role="dialog" aria-labelledby="shopify-agent-panel-title" tabindex="-1" aria-modal="false">
    <div class="panel__header">
      <div id="shopify-agent-panel-title" class="panel__title sr-only">Keykraft</div>
      <div class="panel__bot" aria-hidden="true">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs><clipPath id="botclip"><circle cx="50" cy="50" r="46"/></clipPath></defs>
          <circle cx="50" cy="50" r="46" fill="#76b900"/>
          <g clip-path="url(#botclip)"><g class="bot__eyes" transform="translate(70 29)"><g class="bot__blink">
            <rect x="-14.75" y="-7.25" width="10" height="18" rx="5" fill="#fff" transform="rotate(-20 -9.75 1.75)"/>
            <rect x="5.25" y="-10.25" width="9" height="17" rx="4.5" fill="#fff" transform="rotate(-20 9.75 -1.75)"/>
          </g></g></g>
        </svg>
      </div>

      <div class="panel__header-column panel__header-column--left">
        <shopify-sign-in-button class="panel__sign-in"></shopify-sign-in-button>
        <shopify-chat-icon-button name="back" label="Back to chat" class="panel__back"></shopify-chat-icon-button>

        <button type="button" class="panel__customer-identity" aria-expanded="false" aria-controls="shopify-agent-customer-menu" hidden>
          <img class="panel__customer-avatar" alt="" hidden>
          <span class="panel__customer-initial" aria-hidden="true" hidden></span>
          <span class="panel__customer-name"></span>
        </button>
        <div id="shopify-agent-customer-menu" class="panel__customer-menu" hidden>
          <a class="panel__customer-menu-item" href="/account/addresses">Profile</a>
          <a class="panel__customer-menu-item" href="/account/logout">Sign out</a>
        </div>

        <shopify-chat-icon-button-group class="panel__chat-actions">
          <shopify-chat-icon-button name="profile-circle" label="Buyer Profile" class="panel__buyer-profile" hidden title="Buyer Profile"></shopify-chat-icon-button>
          <shopify-chat-icon-button name="compose" label="Create a new chat" class="panel__new-chat" visually-hidden slot="item-0" grouped solo></shopify-chat-icon-button>
        </shopify-chat-icon-button-group>

        <shopify-chat-icon-button-group class="panel__history-actions">
          <shopify-chat-icon-button name="back" label="Back to chat" class="panel__back" slot="item-0" grouped></shopify-chat-icon-button>
          <shopify-chat-icon-button name="compose" label="Create a new chat" class="panel__history-new-chat" slot="item-1" grouped></shopify-chat-icon-button>
        </shopify-chat-icon-button-group>
      </div>

      <div class="panel__header-column panel__header-column--right">
        <shopify-chat-icon-button-group class="panel__actions">
          <shopify-chat-icon-button class="panel__size-toggle" name="size-expand" label="Expand chat" slot="item-0" grouped solo></shopify-chat-icon-button>
        </shopify-chat-icon-button-group>
        <shopify-chat-icon-button name="close" label="Close chat" class="panel__close"></shopify-chat-icon-button>
      </div>
    </div>

    <div id="shopify-agent-new-chat-prompt" class="new-chat-popover" popover="auto" role="dialog" aria-labelledby="shopify-agent-new-chat-prompt-title" aria-describedby="shopify-agent-new-chat-prompt-description">
      <h2 id="shopify-agent-new-chat-prompt-title" class="new-chat-popover__title">Start a new chat?</h2>
      <p id="shopify-agent-new-chat-prompt-description" class="new-chat-popover__description">Sign in to save your chat history, or continue without signing in.</p>
      <div class="new-chat-popover__actions">
        <button type="button" class="new-chat-popover__button new-chat-popover__button--primary new-chat-popover__sign-in">Sign in</button>
        <button type="button" class="new-chat-popover__button new-chat-popover__button--secondary new-chat-popover__continue">Continue without signing in</button>
      </div>
    </div>

    <div class="panel__body">
      <div class="panel__restore-state" role="status" aria-live="polite" hidden>
        <span class="panel__restore-spinner" aria-hidden="true"></span>
        <span class="panel__restore-label sr-only">Loading chat</span>
      </div>
      <div class="panel__unavailable" hidden>
        <div class="panel__unavailable-message" role="alert">
          <h2 class="panel__unavailable-title">Chat isn’t available right now</h2>
          <p class="panel__unavailable-description">Something went wrong while loading the chat.</p>
        </div>
        <button type="button" class="panel__unavailable-retry">Try again</button>
      </div>
      <shopify-login-panel><shopify-login-form></shopify-login-form></shopify-login-panel>
      <shopify-chat-view-switcher view="chat"><shopify-chat-conversation></shopify-chat-conversation><shopify-chat-history state="empty"></shopify-chat-history></shopify-chat-view-switcher>
    </div>
  </section>
</div>`;

const BOT_CSS = `
.panel__bot{position:absolute;z-index:1;left:50%;top:calc(var(--private-spacing-sm) + var(--private-button-size)/2 - 24px);width:48px;height:48px;margin-left:-24px;pointer-events:none}
.panel__bot svg{display:block;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 4px 8px rgba(118,185,0,.32))}
:host([view="login"]) .panel__bot,:host([view="history"]) .panel__bot{display:none}
`;

class ShopifyAgentRuntime extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'});
    sr.append(style(RESET+VARS+HOST_WRAPPER+RUNTIME_ONLY+SHELL+BOT_CSS));
    const t=document.createElement('template'); t.innerHTML=RUNTIME_HTML; sr.append(t.content);

    const $=s=>sr.querySelector(s);
    const wrap=$('#shopify-element-wrapper'), panel=$('.panel'), chat=()=>this.getRootNode().host;
    const setOpen=o=>{ this.toggleAttribute('open',o); chat().toggleAttribute('open',o); $('.activator').setAttribute('aria-expanded',String(o)); };

    /* layout: desktop vs mobile, visual viewport height */
    const mq=matchMedia('(min-width: 768px)');
    const layout=()=>{ wrap.classList.toggle('desktop-layout',mq.matches); sr.querySelector('shopify-chat-conversation')?.classList.toggle('desktop-layout',mq.matches);
      wrap.style.setProperty('--private-visual-viewport-height',(window.visualViewport?visualViewport.height:innerHeight)+'px'); };
    const conv=$('shopify-chat-conversation');
    const layout0=layout; 
    layout(); mq.addEventListener('change',layout); addEventListener('resize',layout);
    window.visualViewport&&visualViewport.addEventListener('resize',layout);

    /* interactions (glue) */
    $('.activator').addEventListener('click',()=>setOpen(true));
    $('.panel__close').addEventListener('click',()=>setOpen(false));
    const tog=$('.panel__size-toggle');
    tog.addEventListener('click',()=>{ const x=panel.classList.toggle('panel--size-expanded'); conv.toggleAttribute('expanded',x);
      tog.setAttribute('name',x?'size-contract':'size-expand'); tog.setAttribute('label',x?'Contract chat':'Expand chat'); });
    const pop=$('.new-chat-popover');
    $('.panel__new-chat').addEventListener('click',e=>{ const r=e.currentTarget.getBoundingClientRect();
      pop.style.left=Math.max(8,Math.min(r.left,innerWidth-328))+'px'; pop.style.top=(r.bottom+8)+'px'; pop.showPopover?.(); });
    sr.querySelectorAll('.new-chat-popover__sign-in,.new-chat-popover__continue').forEach(b=>b.addEventListener('click',()=>{ pop.hidePopover?.(); if(b.classList.contains('new-chat-popover__sign-in')) setView('login'); }));

    /* sign-in flow (glue) */
    const chatHost=()=>this.getRootNode().host;
    const setView=v=>{ this.setAttribute('view',v); chatHost().setAttribute('view',v);
      if(v==='login') $('shopify-login-form').focusEmail?.(); };
    $('.panel__sign-in').addEventListener('click',()=>setView('login'));
    sr.querySelectorAll('.panel__back').forEach(b=>b.addEventListener('click',()=>setView('chat')));
    const ident=$('.panel__customer-identity'), menu=$('.panel__customer-menu');
    const signedIn=(email)=>{ const name=email?email.split('@')[0]:'';
      const disp=name.charAt(0).toUpperCase()+name.slice(1);
      $('.panel__customer-initial').textContent=disp.charAt(0)||'?'; $('.panel__customer-initial').hidden=false;
      $('.panel__customer-name').textContent=disp; ident.hidden=false; $('.panel__sign-in').hidden=true; setView('chat'); };
    const signedOut=()=>{ ident.hidden=true; menu.hidden=true; ident.setAttribute('aria-expanded','false'); $('.panel__sign-in').hidden=false; };
    $('shopify-login-form').addEventListener('shopify-login-success',e=>signedIn(e.detail.email));
    ident.addEventListener('click',()=>{ const o=menu.hidden; menu.hidden=!o; ident.setAttribute('aria-expanded',String(o)); });
    sr.querySelectorAll('.panel__customer-menu-item').forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); menu.hidden=true; ident.setAttribute('aria-expanded','false'); if(a.textContent.trim()==='Sign out') signedOut(); }));
    panel.addEventListener('shopify-chat-started',()=>panel.classList.remove('panel--empty-state'));
    this.setAttribute('shell-ready',''); chat().setAttribute('shell-ready','');

    /* ---- mascot: a round bot whose pill eyes follow the mouse (and glance at the box while you type) ---- */
    (()=>{
      const bot=$('.panel__bot'); if(!bot) return;
      const svg=bot.querySelector('svg'), eyes=bot.querySelector('.bot__eyes'), blink=bot.querySelector('.bot__blink');
      const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
      const REST={x:.5,y:-.42}, R=20;               /* REST = where it looks before the mouse moves; R = how far the eyes can travel */
      let cur={x:REST.x,y:REST.y}, mouse=null, glanceUntil=0, thinking=false, running=false, t0=0, blinkStart=-1, blinkAt=performance.now()+2500;
      const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
      const isOpen=()=>this.hasAttribute('open');
      const aim=now=>{
        if(thinking){ const s=(now-t0)/1000; return {x:Math.sin(s*2.4)*.7,y:-.3}; }   /* scanning while the answer is "thinking" */
        if(now<glanceUntil) return {x:0,y:.75};                                         /* glance down at the input while typing */
        if(!mouse) return REST;
        const r=bot.getBoundingClientRect(); if(!r.width) return REST;
        const dx=mouse.x-(r.left+r.width/2), dy=mouse.y-(r.top+r.height/2), d=Math.hypot(dx,dy)||1, k=clamp(d/120,0,1);
        return {x:dx/d*k,y:dy/d*k};
      };
      const loop=now=>{
        if(!isOpen()){ running=false; return; }
        const t=aim(now), f=reduce?1:.26;
        cur.x+=(t.x-cur.x)*f; cur.y+=(t.y-cur.y)*f;
        let b=1;
        if(!reduce){
          if(blinkStart<0&&now>=blinkAt) blinkStart=now;
          if(blinkStart>=0){ const p=(now-blinkStart)/170; if(p>=1){ blinkStart=-1; blinkAt=now+2200+Math.random()*3500; } else b=1-Math.sin(p*Math.PI)*.9; }
        }
        const r=Math.min(1,Math.hypot(cur.x,cur.y)), a=Math.atan2(cur.y,cur.x)*180/Math.PI;
        eyes.setAttribute('transform',`translate(${50+cur.x*R} ${50+cur.y*R}) rotate(${a}) scale(${1.2*(1-.32*r)} 1.2) rotate(${-a})`);
        blink.setAttribute('transform',`scale(1 ${b})`);
        svg.style.transform=`translate(${(cur.x*1.5).toFixed(2)}px,${(cur.y*1.5).toFixed(2)}px)`;
        requestAnimationFrame(loop);
      };
      const start=()=>{ if(!running){ running=true; requestAnimationFrame(loop); } };
      $('.activator').addEventListener('click',start);
      addEventListener('pointermove',e=>{ mouse={x:e.clientX,y:e.clientY}; },{passive:true});
      document.addEventListener('mouseleave',()=>{ mouse=null; });
      const cs=conv&&conv.shadowRoot, inp=cs&&cs.querySelector('.composer__input'), comp=cs&&cs.querySelector('.composer');
      if(inp) inp.addEventListener('input',()=>{ glanceUntil=performance.now()+1100; });
      if(comp) new MutationObserver(()=>{ thinking=comp.hasAttribute('data-turn-active'); t0=performance.now(); }).observe(comp,{attributes:true,attributeFilter:['data-turn-active']});
    })();

    /* open on next frames so the @starting-style entrance plays */
    /* starts minimized: the visitor opens it with the Support button */
  }
}

class ShopifyChat extends HTMLElement{
  connectedCallback(){
    if(this.shadowRoot) return;
    const sr=this.attachShadow({mode:'open'});
    sr.append(style(RESET+VARS+HOST_WRAPPER+SHELL));
    const t=document.createElement('template');
    t.innerHTML=`<div id="shopify-element-wrapper"><shopify-agent-runtime class="agent-shell__runtime" exportparts="activator, dialog" view="chat"></shopify-agent-runtime></div>`;
    sr.append(t.content);
  }
}

customElements.define('shopify-chat-icon',ShopifyChatIcon);
customElements.define('shopify-chat-icon-button',ShopifyChatIconButton);
customElements.define('shopify-chat-icon-button-group',ShopifyChatIconButtonGroup);
customElements.define('shopify-sign-in-button',ShopifySignInButton);
customElements.define('shopify-login-form',ShopifyLoginForm);
customElements.define('shopify-suggestion-pills',ShopifySuggestionPills);
customElements.define('shopify-chat-view-switcher',ShopifyChatViewSwitcher);
customElements.define('shopify-chat-conversation',ShopifyChatConversation);
customElements.define('shopify-chat-history',ShopifyChatHistory);
customElements.define('shopify-agent-runtime',ShopifyAgentRuntime);
customElements.define('shopify-chat',ShopifyChat);
})();


};
run();
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
