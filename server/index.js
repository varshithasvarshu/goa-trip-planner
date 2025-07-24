const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/plan", async (req, res) => {
  const { query } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful travel planner. Only return a JSON like this:\n{\n  \"day1\": [\"go to place1 at 9am\", \"go to place2 at 2pm\"],\n  \"day2\": [\"...\"]\n}\nReturn only the JSON, no explanation.",
        },
        { role: "user", content: query },
      ],
    });

    const plan = completion.choices[0].message.content;
    res.json(JSON.parse(plan));
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to generate trip plan" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
