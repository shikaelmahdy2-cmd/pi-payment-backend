import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PI_API_KEY = process.env.PI_API_KEY

// approve payment
app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: "POST",
    headers: {
      Authorization: `Key ${PI_API_KEY}`
    }
  });

  res.json({ status: "approved" });
});

// complete payment
app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: "POST",
    headers: {
      Authorization: `Key ${PI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ txid })
  });

  res.json({ status: "completed" });
});

app.listen(3000, () => {
  console.log("Pi payment backend running");
});
