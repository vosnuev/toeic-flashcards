const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qwejbebfbwohjdhqivzm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OD-adr7NeT45gDrwKgO2mQ_s0TEKc3y';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

async function supabaseRequest(path, method, body) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message = Array.isArray(data) && data[0]?.message
      ? data[0].message
      : data?.message || data || `Supabase request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.end();
    }

    if (req.method === 'GET') {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/words?select=id,word,phonetic,meanings,created_at&order=id.desc`, {
        method: 'GET',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = text;
      }

      if (!response.ok) {
        const message = Array.isArray(data) && data[0]?.message
          ? data[0].message
          : data?.message || data || `Supabase request failed (${response.status})`;
        throw new Error(message);
      }

      return sendJson(res, 200, { data });
    }

    if (req.method === 'POST') {
      const body = parseBody(req);
      const payload = {
        word: body.word,
        phonetic: body.phonetic ?? null,
        meanings: body.meanings ?? [],
      };
      const data = await supabaseRequest('words', 'POST', payload);
      return sendJson(res, 200, { data });
    }

    if (req.method === 'PUT') {
      const body = parseBody(req);
      if (body.id == null) {
        return sendJson(res, 400, { error: 'Missing id' });
      }
      const data = await supabaseRequest(`words?id=eq.${body.id}`, 'PATCH', body.updates || {});
      return sendJson(res, 200, { data });
    }

    if (req.method === 'DELETE') {
      const body = parseBody(req);
      if (body.id == null) {
        return sendJson(res, 400, { error: 'Missing id' });
      }
      const data = await supabaseRequest(`words?id=eq.${body.id}`, 'DELETE');
      return sendJson(res, 200, { data });
    }

    return sendJson(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { error: error.message || 'Internal Server Error' });
  }
};
