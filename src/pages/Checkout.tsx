// src/pages/Checkout.tsx
import { useState } from "react";
import { createTransaction, confirmTransaction } from "../api";

export default function Checkout() {
  const [merchantId, setMerchantId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(5); // dollars
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");

    try {
      const amount_cents = Math.round(amount * 100);
      const tx = await createTransaction({
        merchant_id: merchantId,
        amount_cents,
        currency: "USD",
      });

      // simulate PSP authorisation (like your server-side public flow)
      const tx2 = await confirmTransaction(tx.id);

      window.location.href = `/success?tx_id=${tx2.id}`;
    } catch (err: any) {
      setMsg(err?.response?.data?.detail ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow p-6 space-y-4"
      >
        <h1 className="text-2xl font-semibold">Checkout</h1>

        <label className="block">
          <span className="text-sm text-gray-700">Merchant ID</span>
          <input
            type="number"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={merchantId}
            onChange={(e) => setMerchantId(parseInt(e.target.value || "0"))}
            placeholder="e.g. 11"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-700">Amount (USD)</span>
          <input
            type="number"
            step="0.01"
            className="mt-1 w-full rounded-lg border px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
            required
          />
        </label>

        {msg && <div className="text-red-600 text-sm">{msg}</div>}

        <button
          disabled={busy}
          className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {busy ? "Processing…" : "Pay now"}
        </button>
      </form>
    </div>
  );
}
