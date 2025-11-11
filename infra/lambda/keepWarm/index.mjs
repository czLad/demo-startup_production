// Node.js 20+ Lambda — pings one or more endpoints with retries and delay.
// Env vars:
//  - TENANT_ID: e.g. "abc123"
//  - ENDPOINTS: comma-separated URLs. Use {TENANT_ID} placeholder.
//  - REQUEST_TIMEOUT_MS: e.g. "8000"

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function ping(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "SynsureKeepWarm/1.0",
        Accept: "application/json",
      },
    });

    const statusMsg = res.ok ? "OK" : `HTTP_${res.status}`;
    console.log(`[PING] ${statusMsg} ${url}`);
    return res.ok;
  } catch (e) {
    console.warn(`[PING] ERROR ${url} :: ${e.name} ${e.message}`);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function pingWithRetry(url, timeoutMs, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    const ok = await ping(url, timeoutMs);
    if (ok) return true;

    if (i < retries) {
      const backoff = 1000 * (i + 1);
      console.log(`[RETRY] ${url} in ${backoff}ms`);
      await delay(backoff);
    }
  }
  throw new Error(`All retries failed for ${url}`);
}

export const handler = async () => {
  const tenantId = process.env.TENANT_ID ?? "";
  const timeoutMs = Number(process.env.REQUEST_TIMEOUT_MS ?? 8000);

  // e.g. "https://.../api/health, https://.../api/case/{TENANT_ID}"
  const endpoints = (process.env.ENDPOINTS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((u) => u.replace("{TENANT_ID}", tenantId));

  if (endpoints.length === 0) {
    throw new Error("ENDPOINTS env var is empty.");
  }

  for (let i = 0; i < endpoints.length; i++) {
    await pingWithRetry(endpoints[i], timeoutMs, 2);
    if (i === 0 && endpoints.length > 1) {
      console.log("[WAIT] 5 seconds before next ping…");
      await delay(5000);
    }
  }

  console.log(`[DONE] Successfully pinged ${endpoints.length} endpoint(s).`);
  return { ok: true, count: endpoints.length };
};
