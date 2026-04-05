const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* DATABASE CONNECTION */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "paymentapp"
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});



/* GET ALL CUSTOMERS */

app.get("/customers", (req, res) => {

  db.query("SELECT * FROM customers", (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }

  });

});



/* MAKE PAYMENT */

app.post("/payments", (req, res) => {

  const { account_number, amount } = req.body || {};

  if (!account_number || amount === undefined || amount === null) {
    return res.status(400).json({ message: "account_number and amount are required" });
  }

  db.query(
    "SELECT id FROM customers WHERE account_number=?",
    [account_number],
    (err, result) => {

      if (err) {
        return res.status(500).json({ message: "Failed to fetch account", error: err.message });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Account not found" });
      }

      const customerId = result[0].id;

      db.query(
        "INSERT INTO payments(customer_id,payment_amount,status,created_at) VALUES (?,?,?,NOW())",
        [customerId, amount, "SUCCESS"],
        (err, data) => {

          if (err) {
            res.status(500).json({ message: "Failed to create payment", error: err.message });
          } else {
            res.json({ message: "Payment Successful" });
          }

        }
      );

    }
  );

});



/* PAYMENT HISTORY */

app.get("/payments/:account", (req, res) => {

  const account = req.params.account;

  db.query(
    `SELECT payments.* FROM payments
     JOIN customers ON payments.customer_id = customers.id
     WHERE customers.account_number=?`,
    [account],
    (err, result) => {

      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }

    }
  );

});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
