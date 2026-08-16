import{j as D,a as ce}from"./jsx-runtime-5e7b5774.js";import{c as le}from"./clsx.m-de421188.js";import{r as d}from"./index-e6e5af86.js";import{ao as de}from"./lodash-d0bc2bc7.js";import{X as fe}from"./PieOptions-93b770c0.js";let pe={data:""},me=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||pe,ve=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(})/g,ge=/\/\*[^]*?\*\/|\s\s+|\n/g,y=(e,t)=>{let n,a="",o="",u="";for(let r in e){let i=e[r];typeof i=="object"?(n=t?t.replace(/([^,])+/g,s=>r.replace(/([^,])+/g,c=>/&/.test(c)?c.replace(/&/g,s):s?s+" "+c:c)):r,o+=r[0]=="@"?r[1]=="f"?y(i,r):r+"{"+y(i,r[1]=="k"?"":t)+"}":y(i,n)):r[0]=="@"&&r[1]=="i"?a=r+" "+i+";":(r=r.replace(/[A-Z]/g,"-$&").toLowerCase(),u+=y.p?y.p(r,i):r+":"+i+";")}return u[0]?(n=t?t+"{"+u+"}":u,a+n+o):a+o},_={},H=e=>{let t="";for(let n in e)t+=n+(typeof e[n]=="object"?H(e[n]):e[n]);return t},be=(e,t,n,a,o)=>{let u=typeof e=="object"?H(e):e,r=_[u]||(_[u]=(i=>{let s=0,c=11;for(;s<i.length;)c=101*c+i.charCodeAt(s++)>>>0;return"go"+c})(u));if(!_[r]){let i=typeof e=="object"?e:(s=>{let c,g=[{}];for(;c=ve.exec(s.replace(ge,""));)c[4]&&g.shift(),c[3]?g.unshift(g[0][c[3]]=g[0][c[3]]||{}):c[4]||(g[0][c[1]]=c[2]);return g[0]})(e);_[r]=y(o?{["@keyframes "+r]:i}:i,n?"":"."+r)}return((i,s,c)=>{s.data.indexOf(i)==-1&&(s.data=c?i+s.data:s.data+i)})(_[r],t,a),r},he=(e,t,n)=>e.reduce((a,o,u)=>{let r=t[u];if(r&&r.call){let i=r(n),s=i&&i.props&&i.props.className||/^go/.test(i)&&i;r=s?"."+s:i&&typeof i=="object"?i.props?"":y(i,""):i}return a+o+(r??"")},"");function U(e){let t=this||{},n=e.call?e(t.p):e;return be(n.unshift?n.raw?he(n,[].slice.call(arguments,1),t.p):n.reduce((a,o)=>o?Object.assign(a,o.call?o(t.p):o):a,{}):n,me(t.target),t.g,t.o,t.k)}let B,z,C;U.bind({g:1});let h=U.bind({k:1});function ye(e,t,n,a){y.p=t,B=e,z=n,C=a}function T(e,t){let n=this||{};return function(){let a=arguments;function o(u,r){let i=Object.assign({},u),s=i.className||o.className;n.p=Object.assign({theme:z&&z()},i),n.o=/ *go\d+/.test(s),i.className=U.apply(n,a)+(s?" "+s:""),t&&(i.ref=r);let c=i.as||e;return delete i.as,C&&c[0]&&C(i),B(c,i)}return t?t(o):o}}function l(){return l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l.apply(this,arguments)}function p(e,t){return t||(t=e.slice(0)),e.raw=t,e}var Te=function(t){return typeof t=="function"},M=function(t,n){return Te(t)?t(n):t},xe=function(){var e=0;return function(){return(++e).toString()}}(),Oe=function(t){return function(n){n&&setTimeout(function(){var a=n.getBoundingClientRect();t(a)})}},W=function(){var e=void 0;return function(){if(e===void 0&&typeof window<"u"){var t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}}(),Se=20,f;(function(e){e[e.ADD_TOAST=0]="ADD_TOAST",e[e.UPDATE_TOAST=1]="UPDATE_TOAST",e[e.UPSERT_TOAST=2]="UPSERT_TOAST",e[e.DISMISS_TOAST=3]="DISMISS_TOAST",e[e.REMOVE_TOAST=4]="REMOVE_TOAST",e[e.START_PAUSE=5]="START_PAUSE",e[e.END_PAUSE=6]="END_PAUSE"})(f||(f={}));var R=new Map,L=function(t){if(!R.has(t)){var n=setTimeout(function(){R.delete(t),x({type:f.REMOVE_TOAST,toastId:t})},1e3);R.set(t,n)}},_e=function(t){var n=R.get(t);n&&clearTimeout(n)},Ee=function e(t,n){switch(n.type){case f.ADD_TOAST:return l({},t,{toasts:[n.toast].concat(t.toasts).slice(0,Se)});case f.UPDATE_TOAST:return n.toast.id&&_e(n.toast.id),l({},t,{toasts:t.toasts.map(function(r){return r.id===n.toast.id?l({},r,n.toast):r})});case f.UPSERT_TOAST:var a=n.toast;return t.toasts.find(function(r){return r.id===a.id})?e(t,{type:f.UPDATE_TOAST,toast:a}):e(t,{type:f.ADD_TOAST,toast:a});case f.DISMISS_TOAST:var o=n.toastId;return o?L(o):t.toasts.forEach(function(r){L(r.id)}),l({},t,{toasts:t.toasts.map(function(r){return r.id===o||o===void 0?l({},r,{visible:!1}):r})});case f.REMOVE_TOAST:return n.toastId===void 0?l({},t,{toasts:[]}):l({},t,{toasts:t.toasts.filter(function(r){return r.id!==n.toastId})});case f.START_PAUSE:return l({},t,{pausedAt:n.time});case f.END_PAUSE:var u=n.time-(t.pausedAt||0);return l({},t,{pausedAt:void 0,toasts:t.toasts.map(function(r){return l({},r,{pauseDuration:r.pauseDuration+u})})})}},$=[],N={toasts:[],pausedAt:void 0},x=function(t){N=Ee(N,t),$.forEach(function(n){n(N)})},we={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ae=function(t){t===void 0&&(t={});var n=d.useState(N),a=n[0],o=n[1];d.useEffect(function(){return $.push(o),function(){var r=$.indexOf(o);r>-1&&$.splice(r,1)}},[a]);var u=a.toasts.map(function(r){var i,s,c;return l({},t,t[r.type],r,{duration:r.duration||((i=t[r.type])==null?void 0:i.duration)||((s=t)==null?void 0:s.duration)||we[r.type],style:l({},t.style,(c=t[r.type])==null?void 0:c.style,r.style)})});return l({},a,{toasts:u})},je=function(t,n,a){return n===void 0&&(n="blank"),l({createdAt:Date.now(),visible:!0,type:n,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0},a,{id:(a==null?void 0:a.id)||xe()})},E=function(t){return function(n,a){var o=je(n,t,a);return x({type:f.UPSERT_TOAST,toast:o}),o.id}},v=function(t,n){return E("blank")(t,n)};v.error=E("error");v.success=E("success");v.loading=E("loading");v.custom=E("custom");v.dismiss=function(e){x({type:f.DISMISS_TOAST,toastId:e})};v.remove=function(e){return x({type:f.REMOVE_TOAST,toastId:e})};v.promise=function(e,t,n){var a=v.loading(t.loading,l({},n,n==null?void 0:n.loading));return e.then(function(o){return v.success(M(t.success,o),l({id:a},n,n==null?void 0:n.success)),o}).catch(function(o){v.error(M(t.error,o),l({id:a},n,n==null?void 0:n.error))}),e};var Pe=function(t){var n=Ae(t),a=n.toasts,o=n.pausedAt;d.useEffect(function(){if(!o){var r=Date.now(),i=a.map(function(s){if(s.duration!==1/0){var c=(s.duration||0)+s.pauseDuration-(r-s.createdAt);if(c<0){s.visible&&v.dismiss(s.id);return}return setTimeout(function(){return v.dismiss(s.id)},c)}});return function(){i.forEach(function(s){return s&&clearTimeout(s)})}}},[a,o]);var u=d.useMemo(function(){return{startPause:function(){x({type:f.START_PAUSE,time:Date.now()})},endPause:function(){o&&x({type:f.END_PAUSE,time:Date.now()})},updateHeight:function(i,s){return x({type:f.UPDATE_TOAST,toast:{id:i,height:s}})},calculateOffset:function(i,s){var c,g=s||{},w=g.reverseOrder,O=w===void 0?!1:w,m=g.gutter,A=m===void 0?8:m,j=g.defaultPosition,S=a.filter(function(b){return(b.position||j)===(i.position||j)&&b.height}),k=S.findIndex(function(b){return b.id===i.id}),P=S.filter(function(b,F){return F<k&&b.visible}).length,ue=(c=S.filter(function(b){return b.visible})).slice.apply(c,O?[P+1]:[0,P]).reduce(function(b,F){return b+(F.height||0)+A},0);return ue}}},[a,o]);return{toasts:a,handlers:u}};function Q(){var e=p([`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: `,`;
  position: relative;
  transform: rotate(45deg);

  animation: `,` 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: `,` 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: `,`;
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: `,` 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`]);return Q=function(){return e},e}function Y(){var e=p([`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`]);return Y=function(){return e},e}function q(){var e=p([`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`]);return q=function(){return e},e}function X(){var e=p([`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`]);return X=function(){return e},e}var De=h(X()),Ie=h(q()),Re=h(Y()),$e=T("div")(Q(),function(e){return e.primary||"#ff4b4b"},De,Ie,function(e){return e.secondary||"#fff"},Re);function Z(){var e=p([`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: `,`;
  border-right-color: `,`;
  animation: `,` 1s linear infinite;
`]);return Z=function(){return e},e}function G(){var e=p([`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`]);return G=function(){return e},e}var Ne=h(G()),Me=T("div")(Z(),function(e){return e.secondary||"#e0e0e0"},function(e){return e.primary||"#616161"},Ne);function J(){var e=p([`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: `,`;
  position: relative;
  transform: rotate(45deg);

  animation: `,` 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: `,` 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: `,`;
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`]);return J=function(){return e},e}function K(){var e=p([`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`]);return K=function(){return e},e}function ee(){var e=p([`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`]);return ee=function(){return e},e}var Ue=h(ee()),ke=h(K()),Fe=T("div")(J(),function(e){return e.primary||"#61d345"},Ue,ke,function(e){return e.secondary||"#fff"});function te(){var e=p([`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: `,` 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`]);return te=function(){return e},e}function ne(){var e=p([`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`]);return ne=function(){return e},e}function re(){var e=p([`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`]);return re=function(){return e},e}function ae(){var e=p([`
  position: absolute;
`]);return ae=function(){return e},e}var ze=T("div")(ae()),Ce=T("div")(re()),Le=h(ne()),Ve=T("div")(te(),Le),He=function(t){var n=t.toast,a=n.icon,o=n.type,u=n.iconTheme;return a!==void 0?typeof a=="string"?d.createElement(Ve,null,a):a:o==="blank"?null:d.createElement(Ce,null,d.createElement(Me,Object.assign({},u)),o!=="loading"&&d.createElement(ze,null,o==="error"?d.createElement($e,Object.assign({},u)):d.createElement(Fe,Object.assign({},u))))};function oe(){var e=p([`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
`]);return oe=function(){return e},e}function ie(){var e=p([`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`]);return ie=function(){return e},e}var Be=function(t){return`
0% {transform: translate3d(0,`+t*-200+`%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`},We=function(t){return`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,`+t*-150+`%,-1px) scale(.6); opacity:0;}
`},Qe="0%{opacity:0;} 100%{opacity:1;}",Ye="0%{opacity:1;} 100%{opacity:0;}",qe=T("div",d.forwardRef)(ie()),Xe=T("div")(oe()),Ze=function(t,n){var a=t.includes("top"),o=a?1:-1,u=W()?[Qe,Ye]:[Be(o),We(o)],r=u[0],i=u[1];return{animation:n?h(r)+" 0.35s cubic-bezier(.21,1.02,.73,1) forwards":h(i)+" 0.4s forwards cubic-bezier(.06,.71,.55,1)"}},Ge=d.memo(function(e){var t=e.toast,n=e.position,a=e.style,o=e.children,u=t!=null&&t.height?Ze(t.position||n||"top-center",t.visible):{opacity:0},r=d.createElement(He,{toast:t}),i=d.createElement(Xe,Object.assign({},t.ariaProps),M(t.message,t));return d.createElement(qe,{className:t.className,style:l({},u,a,t.style)},typeof o=="function"?o({icon:r,message:i}):d.createElement(d.Fragment,null,r,i))});function se(){var e=p([`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`]);return se=function(){return e},e}ye(d.createElement);var Je=function(t,n){var a=t.includes("top"),o=a?{top:0}:{bottom:0},u=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return l({left:0,right:0,display:"flex",position:"absolute",transition:W()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:"translateY("+n*(a?1:-1)+"px)"},o,u)},Ke=U(se()),I=16,ut=function(t){var n=t.reverseOrder,a=t.position,o=a===void 0?"top-center":a,u=t.toastOptions,r=t.gutter,i=t.children,s=t.containerStyle,c=t.containerClassName,g=Pe(u),w=g.toasts,O=g.handlers;return d.createElement("div",{style:l({position:"fixed",zIndex:9999,top:I,left:I,right:I,bottom:I,pointerEvents:"none"},s),className:c,onMouseEnter:O.startPause,onMouseLeave:O.endPause},w.map(function(m){var A=m.position||o,j=O.calculateOffset(m,{reverseOrder:n,gutter:r,defaultPosition:o}),S=Je(A,j),k=m.height?void 0:Oe(function(P){O.updateHeight(m.id,P.height)});return d.createElement("div",{ref:k,className:m.visible?Ke:"",key:m.id,style:S},m.type==="custom"?M(m.message,m):i?i(m):d.createElement(Ge,{toast:m,position:A}))}))};const et={primary:"bg-primary",secondary:"bg-secondary",success:"bg-success",warning:"bg-warning",danger:"bg-danger",caution:"bg-caution"},tt={small:"px-3 py-2 text-sm leading-3.5 shadow max-w-50",medium:"px-4 py-3.5 text-base leading-4 shadow max-w-100",large:"px-4.5 py-4 text-md leading-4.5 shadow max-w-xl"},nt={duration:3e3,position:"top-center",reverseOrder:!1},V={show({text:e,size:t="medium",color:n="success",className:a,canClose:o=!0,onClose:u,...r}){const i={...nt,...r};o||(i.duration=Number.POSITIVE_INFINITY);const s=V.getStyles(n,t,a,o);v.custom(V.container.bind(this,e,s,o?u:null),i)},primary(e,t){this.show({color:"primary",text:e,...t})},secondary(e,t){this.show({color:"secondary",text:e,...t})},success(e,t){this.show({color:"success",text:e,...t})},warning(e,t){this.show({color:"warning",text:e,...t})},caution(e,t){this.show({color:"caution",text:e,...t})},danger(e,t){this.show({color:"danger",text:e,...t})},getStyles(e,t,n){return le("flex text-white rounded pointer-events-auto",et[e],tt[t],n)},container(e,t,n,a){const o=u=>n(u,a);return D(fe,{appear:!0,as:d.Fragment,show:a.visible,enter:"transition transform duration-500 ease-out",enterFrom:"-translate-y-full !opacity-0",enterTo:"translate-y-0 !opacity-100",leave:"transition transform duration-500 ease-in",leaveFrom:"!opacity-90 translate-y-0",leaveTo:"!opacity-0 -translate-y-full",children:ce("div",{className:t,children:[D("div",{className:"w-full",children:e}),n&&D("div",{className:"flex cursor-pointer items-center justify-center pl-3 opacity-60 hover:opacity-100",onClick:o,children:D(de,{})})]},a.id)})},dismiss(e){v.dismiss(e)}};export{ut as T,V as f};
