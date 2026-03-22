/* js/payment.js – GitHub Pages compatible (no backend needed) */
'use strict';

const paymentManager = (() => {

  function initiateSubscription() {
    let modal = document.getElementById('_payment-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = '_payment-modal';
      modal.innerHTML = `
        <div class="modal-overlay open" id="_modal-overlay">
          <div class="modal-box">
            <h2>⭐ Go Premium</h2>
            <p>Unlock all 16+ phonics activities for <strong>$9.99/month</strong>.<br>
               Start with a <strong>7-day free trial</strong> — cancel anytime.</p>
            <button class="modal-btn" onclick="paymentManager.redirectToStripe()">
              🚀 Start Free Trial
            </button>
            <button class="modal-btn" style="background:linear-gradient(135deg,#22c55e,#16a34a)" onclick="paymentManager.redirectToStripe()">
              💳 Subscribe $9.99/mo
            </button>
            <button class="modal-close" onclick="paymentManager.closeModal()">✕ Maybe later</button>
          </div>
        </div>`;
      document.body.appendChild(modal);
    }
    document.getElementById('_modal-overlay').classList.add('open');
  }

  function closeModal() {
    const o = document.getElementById('_modal-overlay');
    if (o) o.classList.remove('open');
  }

  function redirectToStripe() {
    // Replace this URL with your real Stripe payment link
    const stripeLink = 'https://buy.stripe.com/test_placeholder';
    closeModal();
    alert('Stripe payment link not configured yet.\n\nReplace the stripeLink in js/payment.js with your real Stripe checkout URL.');
    // window.location.href = stripeLink;  // uncomment once you have a real link
  }

  function isPremium() {
    // Check localStorage for a subscription token
    // In production this should verify against your backend / Stripe
    return localStorage.getItem('ph_premium') === 'true';
  }

  function setPremium(val) {
    localStorage.setItem('ph_premium', val ? 'true' : 'false');
  }

  return { initiateSubscription, closeModal, redirectToStripe, isPremium, setPremium };
})();
