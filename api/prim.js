export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const url = new URL(req.url, 'http://localhost');
  const endpoint = url.searchParams.get('endpoint');
  url.searchParams.delete('endpoint');
  const queryString = url.searchParams.toString();

  if (!endpoint) return res.status(400).json({ error: 'endpoint manquant' });

  const primUrl = `https://prim.iledefrance-mobilites.fr/marketplace/${endpoint}${queryString ? '?' + queryString : ''}`;

  console.log('→ PRIM URL:', primUrl);

  try {
    const response = await fetch(primUrl, {
      headers: {
        'apikey': process.env.PRIM_API_KEY,
        'Accept': 'application/json',
      },
    });
    const text = await response.text();
    console.log('← Status:', response.status, text.slice(0, 200));
    try {
      return res.status(response.status).json(JSON.parse(text));
    } catch {
      return res.status(response.status).send(text);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
