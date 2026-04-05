import React, { useState, useEffect } from "react";

const API = "http://localhost:5000";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/customers`);
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div>
      <h2 className="section-title">Customers</h2>
      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Issue Date</th>
                <th>Interest Rate</th>
                <th>Tenure (months)</th>
                <th>EMI Due</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td>{c.account_number}</td>
                  <td>{new Date(c.issue_date).toLocaleDateString()}</td>
                  <td>{c.interest_rate}%</td>
                  <td>{c.tenure_months}</td>
                  <td>{c.emi_due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Customers;
