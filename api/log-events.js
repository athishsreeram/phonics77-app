// api/log-events.js  –  Vercel Serverless Function
// Receives privacy-first analytics events from the client

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const event = req.body;
    // Log to Vercel console (replace with your DB/analytics service)
    console.log('[Analytics]', JSON.stringify(event));
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
