import express from "express";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY) 
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/create-checkout-session", async (req, res) => {
    // If Stripe is not configured, return a demo session instead of an error
    if (!stripe) {
      return res.json({ id: "demo_session", isDemo: true });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // You can add 'upi' in Stripe Dashboard for India
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Zen Learning Premium",
                description: "Lifetime access to all features and no ads.",
              },
              unit_amount: 49900, // Amount in paise (499 INR)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?payment=success`,
        cancel_url: `${req.headers.origin}/?payment=cancel`,
      });

      res.json({ id: session.id });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
