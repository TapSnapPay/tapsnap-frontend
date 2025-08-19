// src/api.ts  (fetch version, no axios)

// 1) Read API base from Vite env; fall back to your Render URL.
//    remove any accidental trailing slash just in case.
const API_BASE =
  (import.meta.env.VITE_API_BASE ?? "https://tapsnap-api.onrender.com").replace(/\/+$/, "");

// one-time log so we can confirm what the app is using (visible in browser console)
console.info("API_BASE =", API_BASE);

type CreateTxPayload = {
  merchant_id: number;
  amount_cents: number;
  currency?: string;
};

async function request<T>(path: string, init: { json?: unknown } = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const headers = new Headers({ "Content-Type": "application/json" });
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: init.json === undefined ? undefined : JSON.stringify(init.json),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText}\n${url}\n${text}`);
  }
  return res.json() as Promise<T>;
}

export async function createTransaction(p: CreateTxPayload) {
  // POST https://.../api/v1/transactions
  return request<{ id: number; status: string }>(`/api/v1/transactions`, { json: p });
}

export async function confirmTransaction(tx_id: number | string) {
  // POST https://.../api/v1/transactions/{id}/confirm
  return request<{ id: number; status: string }>(`/api/v1/transactions/${tx_id}/confirm`, {
    json: { psp_reference: "PSP_TEST_PUBLIC", status: "authorised" },
  });
}
