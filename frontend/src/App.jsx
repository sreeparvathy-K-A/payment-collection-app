// src/App.jsx
import React from "react";
import "./App.css";
import Customers from "./components/Customer.jsx";
import PaymentForm from "./components/PaymentForm.jsx";
import PaymentHistory from "./components/PaymentHistory.jsx";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Payment Collection App</h1>

      <section className="card">
        <Customers />
      </section>

      <section className="card">
        <PaymentForm />
      </section>

      <section className="card">
        <PaymentHistory />
      </section>
    </div>
  );
}

export default App;
