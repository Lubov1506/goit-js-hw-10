/* empty css                      */import{f as g,i as m}from"./assets/vendor-9808d4ac.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const c=document.querySelector("button[data-start]"),f=document.querySelector("#datetime-picker");c.setAttribute("disabled",!0);const u=document.querySelector(".timer"),a={days:u.querySelector("[data-days]"),hours:u.querySelector("[data-hours]"),minutes:u.querySelector("[data-minutes]"),seconds:u.querySelector("[data-seconds]")};let y;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){S(e[0])}};g(f,b);m.settings({title:"Error",message:"Illegal operation",position:"topRight",backgroundColor:"#EF4040",iconColor:"white",theme:"dark"});const S=e=>{e.getTime()>Date.now()?(y=e,c.removeAttribute("disabled")):(c.setAttribute("disabled",!0),m.error())},d=e=>String(e).padStart(2,"0"),l=()=>{let{days:e,hours:o,minutes:s,seconds:n}=C(y.getTime()-Date.now());return e<0&&o<0&&s<0&&n<0?null:(a.days.textContent=d(e),a.hours.textContent=d(o),a.minutes.textContent=d(s),a.seconds.textContent=d(n),!0)},q=e=>{clearInterval(e)},v=()=>{f.setAttribute("disabled",!0),c.setAttribute("disabled",!0),l();const e=setInterval(()=>{l()?l():q(e)},1e3)};c.addEventListener("click",v);function C(e){const r=Math.floor(e/864e5),i=Math.floor(e%864e5/36e5),h=Math.floor(e%864e5%36e5/6e4),p=Math.floor(e%864e5%36e5%6e4/1e3);return{days:r,hours:i,minutes:h,seconds:p}}
//# sourceMappingURL=commonHelpers.js.map
