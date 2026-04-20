'use strict';
const UI = (() => {
  function updateProgress(barEl,value,max){if(!barEl)return;barEl.style.width=`${Math.round((value/max)*100)}%`;}
  let toastTimer;
  function toast(msg,dur=2400){let el=document.getElementById('_toast');if(!el){el=document.createElement('div');el.id='_toast';el.className='toast-msg';document.body.appendChild(el);}el.textContent=msg;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),dur);}
  let flashTimer;
  function showFeedback(correct,dur=600){let el=document.getElementById('_flash');if(!el){el=document.createElement('div');el.id='_flash';el.className='feedback-flash';document.body.appendChild(el);}el.className=`feedback-flash ${correct?'correct':'wrong'} show`;clearTimeout(flashTimer);flashTimer=setTimeout(()=>el.classList.remove('show'),dur);}
  function setScore(key,data){try{localStorage.setItem(`ph_score_${key}`,JSON.stringify(data));}catch(e){}}
  function getScore(key){try{return JSON.parse(localStorage.getItem(`ph_score_${key}`))||{};}catch(e){return{};}}
  function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function pick(arr,n){return shuffle(arr).slice(0,n);}
  return {updateProgress,toast,showFeedback,setScore,getScore,shuffle,pick};
})();
