import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Gemini AI Personal Stylist Endpoint
  app.post("/api/ai-stylist", async (req, res) => {
    try {
      const { occasion, colorPreference, budget, notes } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "Gemini API key not configured. Please set GEMINI_API_KEY in secrets." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `You are the expert master stylist at Brithi's Boutique, a luxury Indian ethnic wear boutique specializing in designer salwar suits, festive kurtis, hand-embroidered lehengas, and organza dupattas.
      
      Customer Request:
      - Occasion: ${occasion || 'General Festive / Party'}
      - Preferred Color / Palette: ${colorPreference || 'Any elegant shade'}
      - Budget Range: ${budget || 'Flexible'}
      - Additional Style Notes: ${notes || 'None'}
      
      Provide a personalized styling recommendation in JSON format with the following fields:
      1. "outfitTitle": A catchy, elegant title for the recommended ensemble.
      2. "description": A vivid description of the fabric (e.g. pure georgette, chanderi silk, organza), embroidery (zardozi, thread work, gota patti), and silhouette.
      3. "stylingTips": 2-3 expert tips on jewelry, footwear, and hairstyle to complete the look.
      4. "matchedCategory": Suggest one of these categories: "Salwar Suits", "Kurtis & Sets", "Festive Lehengas", "Designer Dupattas".
      
      Return ONLY valid JSON. No markdown backticks outside JSON if possible, or parse cleanly.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const textResponse = response.text || '';
      // Clean up markdown block if present
      const cleanedJSON = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let parsed;
      try {
        parsed = JSON.parse(cleanedJSON);
      } catch (e) {
        parsed = {
          outfitTitle: "Royal Zardozi Anarkali Set",
          description: textResponse || "An exquisite ensemble curated specially for you from our signature collection, featuring delicate thread embroidery on pure georgette fabric.",
          stylingTips: [
            "Pair with traditional polki jhumkas and statement heels.",
            "Opt for a soft glam makeup look with a sleek low bun."
          ],
          matchedCategory: "Salwar Suits"
        };
      }

      res.json({ success: true, recommendation: parsed });
    } catch (error: any) {
      console.error("AI Stylist Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate styling advice." });
    }
  });

  // Order endpoint
  app.post("/api/orders", (req, res) => {
    try {
      const orderData = req.body;
      const orderId = "BRITHI-" + Math.floor(100000 + Math.random() * 900000);
      
      // In a real app, save to DB. Here we return success with order ID and summary.
      res.json({
        success: true,
        orderId,
        message: "Order placed successfully! Our team will contact you via WhatsApp to confirm measurements and dispatch.",
        orderData
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to process order." });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Brithi's Boutique server running on http://localhost:${PORT}`);
  });
}

startServer();
