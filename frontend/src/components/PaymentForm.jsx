import React, { useState } from "react";

const API = "http://localhost:5000";

function PaymentForm() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    if (!account || !amount) {
      setMessage("Please fill all fields");
      return;
    }
    if (Number(amount) <= 0) {
      setMessage("Amount must be greater than 0");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_number: account,
          amount: Number(amount), // must match backend
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Payment failed");
      }

      setMessage("Payment Successful ✅");
      setAccount("");
      setAmount("");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div>
      <h2 className="section-title">Make Payment</h2>
      <div className="row">
        <input
          className="input"
          type="text"
          placeholder="Account Number "
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn" onClick={makePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay"}
        </button>
      </div>
      {message && (
        <p className={message.includes("Successful") ? "text-success" : "text-error"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default PaymentForm;
