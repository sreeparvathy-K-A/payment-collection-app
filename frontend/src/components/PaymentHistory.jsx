import React, { useState } from "react";

const API = "http://localhost:5000";

function PaymentHistory() {
  const [account, setAccount] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    if (!account.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/payments/${encodeURIComponent(account.trim())}`);
      if (!res.ok) throw new Error("Failed to load payment history");
      const data = await res.json();
      setHistory(data);
      if (data.length === 0) setError("No payments found for this account");
    } catch (err) {
      setError(err.message);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="section-title">Payment History</h2>
      <div className="row">
        <input
          className="input"
          type="text"
          placeholder="Account number "
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && loadHistory()}
        />
        <button className="btn" onClick={loadHistory} disabled={loading}>
          {loading ? "Loading..." : "Get History"}
        </button>
      </div>

      {error && <p className="text-error">{error}</p>}

      {history.length > 0 && !error && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.payment_amount}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
