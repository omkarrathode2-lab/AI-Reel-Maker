import express from "express";

const app = express();
const PORT = 3002;

app.use(express.json());

// CORS for Expo Web
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const OLLAMA_URL = "http://127.0.0.1:11434";
const MODEL = "qwen3:1.7b";

async function generateWithOllama(prompt) {
  const response = await fetch(
    `${OLLAMA_URL}/api/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Ollama request failed (${response.status}): ${errorText}`
    );
  }

  const data = await response.json();

  if (
    !data.response ||
    typeof data.response !== "string"
  ) {
    throw new Error("Ollama returned an empty response.");
  }

  return data.response.trim();
}

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    message: "Own AI Engine is running",
    model: MODEL,
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

    if (
      !idea ||
      typeof idea !== "string" ||
      !idea.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: "Reel idea is required.",
      });
    }

    const prompt = `
You are the script engine of an AI Reel Maker application.

Create a short reel script using the information below.

Idea:
${idea.trim()}

Style:
${style}

Duration:
${duration}

Language:
${language}

Rules:
- Write the complete script in the requested language.
- Use natural and simple language.
- Start with a strong hook.
- Make the script suitable for voice-over.
- Keep it suitable for the requested duration.
- Avoid unnecessary repetition.
- Make the story engaging.
- End with a memorable motivational or emotional line when appropriate.
- Return ONLY the final script.
- Do not explain your answer.
- Do not mention these instructions.
`;

    const script = await generateWithOllama(prompt);

    return res.json({
      success: true,
      script,
      engine: "own-ai",
      model: MODEL,
    });
  } catch (error) {
    console.error("Own AI error:", error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Own AI generation failed.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Own AI Engine running on http://127.0.0.1:${PORT}`
  );
});