import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PI_API_KEY = process.env.PI_API_KEY;
const PI_BASE = "https://api.minepi.com";

app.get("/", (req, res) => {
  res.send("Pi Backend Running ✅");
});

// Create payment
app.post("/create-payment", async (req, res) => {
  try {
    const response = await fetch(`${PI_BASE}/v2/payments`, {
      method: "POST",
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve payment
app.post("/approve-payment/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${PI_BASE}/v2/payments/${req.params.id}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Complete payment
app.post("/complete-payment/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${PI_BASE}/v2/payments/${req.params.id}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${PI_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
