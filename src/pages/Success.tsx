// src/pages/Success.tsx
import { useMemo } from "react";

export default function Success() {
  const txId = useMemo(() => {
    const q = new URLSearchParams(window.location.search);
    return q.get("tx_id");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-green-700">Payment authorised ✅</h1>
        <p className="text-gray-700">Transaction ID: <b>{txId}</b></p>
        <a
          href="/checkout"
          className="inline-block mt-4 rounded-lg bg-blue-600 text-white px-4 py-2"
        >
          Make another payment
        </a>
      </div>
    </div>
  );
}
