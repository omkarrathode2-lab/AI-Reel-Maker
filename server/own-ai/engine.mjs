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
      voiceOver = false,
    } = req.body;

    const voiceOverEnabled =
      voiceOver === true ||
      (typeof voiceOver === "string" &&
        ["on", "true", "yes"].includes(voiceOver.trim().toLowerCase()));

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
You are the screenplay and scene-planning engine of Own AI / AI Reel Maker.

Create a concise, cinematic, acted-video script from the user's idea. This script will later drive scene generation, character actions, dialogue, voice, and editing.

User idea:
${idea.trim()}

Style:
${style}

Target duration:
${duration}

Language:
${language}

Narration / voice-over setting:
${voiceOverEnabled ? "ON — narration is allowed when useful." : "OFF — do not write narrator voice-over. Character dialogue is allowed when it naturally belongs in the story."}

Writing requirements:
- Write the entire script in the requested language.
- Prefer a cinematic story with visible actions and character interactions, not an essay or a voice-over monologue.
- Organize the script into a suitable number of numbered scenes for the requested duration.
- For every scene, include a short setting/visual description and concrete character actions.
- Include camera or motion direction when it helps the scene.
- Keep character names, appearance, clothing, and locations consistent throughout the script.
- When characters naturally speak, write dialogue on separate lines in this format: Character Name: "dialogue".
- Do not force dialogue into scenes that work better silently.
- If voice-over is OFF, do not include a narrator, narration track, or spoken explanatory monologue.
- Keep the scene count and dialogue concise enough for the requested duration.
- End with a clear cinematic resolution or memorable final image when appropriate.
- Return ONLY the script. Do not explain the instructions or add a preamble.
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