import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/checkout" className="text-xl font-semibold text-blue-700">
            TapSnap Demo
          </Link>

          <nav className="space-x-4">
            <Link
              to="/checkout"
              className="inline-block rounded-lg border px-3 py-1 text-sm hover:bg-blue-50"
            >
              Checkout
            </Link>
            <Link
              to="/success?tx_id=demo"
              className="inline-block rounded-lg border px-3 py-1 text-sm hover:bg-blue-50"
            >
              Success (test)
            </Link>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/checkout" replace />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="*" element={<div className="p-6">Not found.</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
