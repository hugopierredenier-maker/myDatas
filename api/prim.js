export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { endpoint, ...params } = req.query;
  if (!endpoint) return res.status(400).json({ error: 'endpoint manquant' });

  const queryString = new URLSearchParams(params).toString();
  const primUrl = `https://prim.iledefrance-mobilites.fr/marketplace/${endpoint}${queryString ? '?' + queryString : ''}`;

  try {
    const response = await fetch(primUrl, {
      headers: {
        'apikey': process.env.PRIM_API_KEY,
        'Accept': 'application/json',
      },
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
