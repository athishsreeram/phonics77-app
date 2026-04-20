'use strict';
window.PhonicsAPI = (() => {
  function base() { return window.PHONICS_API_BASE || 'https://phonics-api-k43i.onrender.com'; }
  async function _post(path, body, keepalive = false) {
    try {
      const res = await fetch(`${base()}${path}`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body), ...(keepalive?{keepalive:true}:{}) });
      return res.json();
    } catch(e) { console.warn(`[PhonicsAPI] POST ${path} failed:`,e.message); return {ok:false,error:e.message}; }
  }
  async function _get(path) {
    try { const res = await fetch(`${base()}${path}`); return res.json(); }
    catch(e) { console.warn(`[PhonicsAPI] GET ${path} failed:`,e.message); return {ok:false,error:e.message}; }
  }
  function logEvent(type, data={}) {
    const session=_getSessionId();
    return _post('/api/events',{type,session,url:window.location.pathname,ua:/Mobi|Android/i.test(navigator.userAgent)?'mobile':'desktop',premium:_isPremium(),ts:Math.floor(Date.now()/1000),...data},true);
  }
  async function registerUser(email,childName,childAge) {
    const emailToUse=(email&&email.includes('@'))?email:null;
    const data=await _post('/api/users/register',{email:emailToUse,child_name:childName||null,child_age:childAge?parseInt(childAge):null});
    if(data.ok&&data.data){if(emailToUse)localStorage.setItem('ph_email',emailToUse);localStorage.setItem('ph_user',JSON.stringify(data.data));}
    return data;
  }
  function pingUser() { const email=localStorage.getItem('ph_email'); if(!email)return Promise.resolve({ok:false}); return _post('/api/users/ping',{email}); }
  async function getUser() {
    const email=localStorage.getItem('ph_email'); if(!email)return null;
    const data=await _get(`/api/users/me?email=${encodeURIComponent(email)}`);
    if(data.ok&&data.data){localStorage.setItem('ph_user',JSON.stringify(data.data));const s=data.data.status||data.data.sub_status;if(s==='active'||s==='trialing')localStorage.setItem('ph_premium','true');return data.data;}
    return null;
  }
  function getStoredUser(){try{return JSON.parse(localStorage.getItem('ph_user')||'null');}catch{return null;}}
  function captureEmail(email,name,source){if(!email||!email.includes('@'))return Promise.resolve({ok:false});localStorage.setItem('ph_email',email);return _post('/api/emails',{email,name:name||null,source:source||'app'});}
  async function getStories(){const data=await _get('/api/stories');return data.ok?(data.data||[]):[];}
  async function getStory(id){const data=await _get(`/api/stories/${id}`);return data.ok?data.data:null;}
  async function startCheckout(successUrl,cancelUrl){
    const origin=window.location.origin;const email=localStorage.getItem('ph_email')||null;
    const FALLBACK='https://buy.stripe.com/test_cNi28ta2Rdi4g0736G0ZW00';
    const data=await _post('/api/subscriptions/checkout',{email,successUrl:successUrl||`${origin}/pages/success.html?session_id={CHECKOUT_SESSION_ID}`,cancelUrl:cancelUrl||`${origin}/index.html`});
    if(data&&data.url){window.location.href=data.url;return data;}
    window.location.href=FALLBACK;return data;
  }
  async function verifySession(sessionId){
    const email=localStorage.getItem('ph_email')||'';const params=new URLSearchParams({session_id:sessionId});if(email)params.set('email',email);
    const data=await _get(`/api/subscriptions/verify?${params.toString()}`);
    if(data.ok&&data.active){localStorage.setItem('ph_premium','true');localStorage.setItem('ph_premium_ts',Date.now().toString());localStorage.setItem('ph_premium_verified','true');const stored=getStoredUser();if(stored){stored.status=data.status||'active';localStorage.setItem('ph_user',JSON.stringify(stored));}}
    return data;
  }
  function _getSessionId(){try{const s=JSON.parse(localStorage.getItem('ph_session')||'{}');return s.id||sessionStorage.getItem('ph_sid')||_makeSessionId();}catch{return _makeSessionId();}}
  function _makeSessionId(){const id=`s_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;try{sessionStorage.setItem('ph_sid',id);}catch{}return id;}
  function _isPremium(){return localStorage.getItem('ph_premium')==='true';}
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',()=>pingUser());}else{pingUser();}
  return {logEvent,registerUser,pingUser,getUser,getStoredUser,captureEmail,getStories,getStory,startCheckout,verifySession};
})();
