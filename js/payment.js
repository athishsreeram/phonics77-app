'use strict';
const paymentManager = (() => {
  const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_cNi28ta2Rdi4g0736G0ZW00';
  function isPremium(){return localStorage.getItem('ph_premium')==='true';}
  function setPremium(val){localStorage.setItem('ph_premium',val?'true':'false');}
  function initiateSubscription(){
    let modal=document.getElementById('_payment-modal');
    if(!modal){modal=document.createElement('div');modal.id='_payment-modal';modal.innerHTML=`<div class="modal-overlay open" id="_modal-overlay"><div class="modal-box"><h2>⭐ Go Premium</h2><p>Unlock all phonics activities for <strong>$9.99/month</strong>.</p><button class="modal-btn" id="_stripe-btn">🚀 Subscribe $9.99/mo</button><div style="margin:12px 0;font-size:.8rem;color:#aaa;text-align:center">── or ──</div><button class="modal-btn" id="_already-paid-btn" style="background:#f3f4f6;color:#333;font-size:.9rem;padding:10px">✅ I already paid — unlock now</button><button class="modal-close" onclick="paymentManager.closeModal()">✕ Maybe later</button></div></div>`;document.body.appendChild(modal);document.getElementById('_stripe-btn').addEventListener('click',redirectToStripe);document.getElementById('_already-paid-btn').addEventListener('click',manualUnlock);}
    document.getElementById('_modal-overlay').classList.add('open');
  }
  function closeModal(){const o=document.getElementById('_modal-overlay');if(o)o.classList.remove('open');}
  async function redirectToStripe(){closeModal();const origin=window.location.origin;if(window.PhonicsAPI){await window.PhonicsAPI.startCheckout(`${origin}/pages/success.html?session_id={CHECKOUT_SESSION_ID}`,`${origin}/index.html`);return;}window.location.href=STRIPE_PAYMENT_LINK;}
  function manualUnlock(){closeModal();const code=prompt('🔑 Enter your unlock code');const VALID=['PHONICS2026','PREMIUM77','UNLOCK99'];if(code&&VALID.includes(code.trim().toUpperCase())){setPremium(true);unlockPremiumCards();alert('🎉 Premium unlocked!');}else if(code){alert('❌ Invalid code. Contact startdreamhere123@gmail.com');}}
  function unlockPremiumCards(){document.querySelectorAll('.activity-card').forEach(card=>{const id=card.dataset.activityId;if(!id)return;const page=(typeof activityGating!=='undefined')?activityGating.ACTIVITY_MAP[id]:null;if(!page)return;card.classList.remove('locked');const badge=card.querySelector('.lock-badge');if(badge)badge.remove();const btn=card.querySelector('.play-btn');if(btn){const newBtn=btn.cloneNode(false);newBtn.textContent='▶️ Play';newBtn.style.background='#22c55e';newBtn.style.pointerEvents='auto';newBtn.style.opacity='1';newBtn.style.cursor='pointer';newBtn.setAttribute('href',page);newBtn.addEventListener('click',(e)=>{e.preventDefault();window.location.href=page;});btn.replaceWith(newBtn);}});}
  return {initiateSubscription,closeModal,redirectToStripe,isPremium,setPremium,unlockPremiumCards};
})();
