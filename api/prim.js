export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(req.url, 'http://localhost');
  const params = Object.fromEntries(url.searchParams.entries());
  const { endpoint, ...rest } = params;

  if (!endpoint) return res.status(400).json({ error: 'endpoint manquant' });

  const queryString = new URLSearchParams(rest).toString();
  const primUrl = `https://prim.iledefrance-mobilites.fr/marketplace/${endpoint}${queryString ? '?' + queryString : ''}`;

  console.log('Calling PRIM:', primUrl);

  try {
    const response = await fetch(primUrl, {
      headers: {
        'apikey': process.env.PRIM_API_KEY,
        'Accept': 'application/json',
      },
    });
    const text = await response.text();
    try {
      return res.status(response.status).json(JSON.parse(text));
    } catch {
      return res.status(response.status).send(text);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
