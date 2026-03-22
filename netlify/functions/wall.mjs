import { getStore } from "@netlify/blobs";

const PROFANITY = [
  'shit','fuck','ass','damn','bitch','crap','dick','cock','pussy',
  'nigger','faggot','retard','whore','slut','piss','bastard','cunt'
];

function isProfane(text) {
  const lower = text.toLowerCase().replace(/[^a-z]/g, '');
  return PROFANITY.some(w => lower.includes(w));
}

async function verifyHmac(payload, hmac) {
  const key = 'athenaeum-emerged-from-cave-2026';
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(payload));
  const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hmac === expected;
}

function validatePayload(payload) {
  const parts = payload.split('|');
  if (parts.length !== 26) return false;
  for (const part of parts) {
    const match = part.match(/^(\d+):(\d+)\/(\d+)$/);
    if (!match) return false;
    const [, , correct, total] = match;
    if (correct !== total) return false;
    if (parseInt(total) === 0) return false;
  }
  return true;
}

export default async (req, context) => {
  const store = getStore("akropolis-wall");

  if (req.method === "GET") {
    const data = await store.get("entries", { type: "json" });
    return new Response(JSON.stringify(data || []), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }

  if (req.method === "POST") {
    const body = await req.json();
    const name = (body.name || "").trim().slice(0, 20);
    const { payload, hmac } = body;

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: "Name must be at least 2 characters" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    if (isProfane(name)) {
      return new Response(JSON.stringify({ error: "Please choose a different name" }), {
        status: 400, headers: { "Content-Type": "application/json" }
      });
    }

    if (!payload || !hmac) {
      return new Response(JSON.stringify({ error: "Missing completion proof" }), {
        status: 403, headers: { "Content-Type": "application/json" }
      });
    }

    if (!validatePayload(payload)) {
      return new Response(JSON.stringify({ error: "Incomplete mastery" }), {
        status: 403, headers: { "Content-Type": "application/json" }
      });
    }

    const valid = await verifyHmac(payload, hmac);
    if (!valid) {
      return new Response(JSON.stringify({ error: "Invalid proof" }), {
        status: 403, headers: { "Content-Type": "application/json" }
      });
    }

    const entries = (await store.get("entries", { type: "json" })) || [];

    const dayAgo = Date.now() - 86400000;
    const duplicate = entries.find(e =>
      e.name.toLowerCase() === name.toLowerCase() &&
      new Date(e.certified_at).getTime() > dayAgo
    );
    if (duplicate) {
      return new Response(JSON.stringify({ error: "Name already inscribed", wall: entries }), {
        status: 409, headers: { "Content-Type": "application/json" }
      });
    }

    const entry = { name, certified_at: new Date().toISOString() };
    entries.push(entry);
    await store.setJSON("entries", entries);

    return new Response(JSON.stringify({ success: true, entry, wall: entries }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (req.method === "OPTIONS") {
    return new Response("", {
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST", "Access-Control-Allow-Headers": "Content-Type" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
};

// Path rewrite handled by _redirects: /api/wall -> /.netlify/functions/wall
