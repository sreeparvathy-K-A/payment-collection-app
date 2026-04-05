// src/App.js
import React from "react";
import "./App.css";
import Customers from "./components/Customer.jsx";
import PaymentForm from "./components/PaymentForm.jsX";
import PaymentHistory from "./components/paymentHistory.jsx";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Loan Management System</h1>

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
