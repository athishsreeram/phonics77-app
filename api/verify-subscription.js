// api/verify-subscription.js  –  Vercel Serverless Function
// Verifies a Stripe checkout session and confirms subscription status

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { session_id } = req.query;
  if (!session_id) return res.status(400).json({ error: 'Missing session_id' });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription'],
    });

    const active = session.subscription?.status === 'active' ||
                   session.subscription?.status === 'trialing';

    res.status(200).json({
      active,
      status: session.subscription?.status || 'unknown',
      customer: session.customer,
    });
  } catch (err) {
    console.error('Verify error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
