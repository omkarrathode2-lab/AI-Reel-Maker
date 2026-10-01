import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY missing in .env");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function getErrorStatus(error) {
  return error?.status ?? error?.statusCode;
}

function isTemporaryRetryableError(error) {
  const status = getErrorStatus(error);

  return (
    status === 408 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

async function generateWithRetry(prompt) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const interaction = await ai.interactions.create({
        model: "gemini-3.8-flash",
        input: prompt,
        generation_config: {
          thinking_level: "low",
        },
      });

      return interaction;
    } catch (error) {
      const status = getErrorStatus(error);

      console.error(
        "Gemini attempt " +
          attempt +
          "/" +
          maxAttempts +
          " failed:",
        status || error?.message || error
      );

      // Do not retry rate-limit errors.
      if (status === 429) {
        throw error;
      }

      if (
        !isTemporaryRetryableError(error) ||
        attempt === maxAttempts
      ) {
        throw error;
      }

      const delay = 1000 * 2 ** (attempt - 1);

      console.log("Retrying in " + delay + "ms...");

      await sleep(delay);
    }
  }

  throw new Error("Gemini request failed after retries.");
}

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    message: "AI Reel Maker backend is running",
  });
});

app.post("/api/generate-script", async (req, res) => {
  try {
    const {
      idea,
      style = "Motivational",
      duration = "30 sec",
      language = "Hindi",
    } = req.body;

    if (!idea || typeof idea !== "string" || !idea.trim()) {
      return res.status(400).json({
        error: "Reel idea is required.",
      });
    }

    const prompt = `
You are the script-writing engine for an AI Reel Maker app.

Create a short, engaging reel script.

Idea:
${idea.trim()}

Style:
${style}

Duration:
${duration}

Language:
${language}

Requirements:
- Match the requested language.
- Match the requested style.
- Keep the script suitable for the requested duration.
- Use natural spoken language.
- Start with a strong hook.
- Make it suitable for voice-over.
- End with a memorable line.
- Return only the script.
`;

    const interaction = await generateWithRetry(prompt);

    const script = interaction.output_text?.trim();

    if (!script) {
      return res.status(500).json({
        error: "Gemini returned an empty script.",
      });
    }

    return res.json({
      success: true,
      script,
    });
  } catch (error) {
    console.error("Gemini final error:", error);

    const status = getErrorStatus(error);

    if (status === 429) {
      return res.status(429).json({
        error:
          "Gemini Free Tier rate limit reached. Please wait for the quota to reset or use a higher-limit API tier.",
      });
    }

    if (status === 503) {
      return res.status(503).json({
        error: "Gemini is temporarily busy. Please try again.",
      });
    }

    return res.status(500).json({
      error: "Failed to generate script.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    "AI Reel Maker backend running on http://localhost:" + PORT
  );
});