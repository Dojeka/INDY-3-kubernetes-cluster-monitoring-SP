// server.js
import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: "uploads/" });

app.post("/api/prompt", upload.single("image"), (req, res) => {
  const { prompt, model } = req.body;
  const logEntry = {
    prompt,
    model,
    image: req.file ? req.file.originalname : null,
    timestamp: new Date().toISOString(),
  };

  // Read, append, and save log
  fs.readFile("log.json", "utf8", (err, data) => {
    let logs = [];
    if (!err && data) logs = JSON.parse(data);
    logs.push(logEntry);
    fs.writeFile("log.json", JSON.stringify(logs, null, 2), (err) => {
      if (err) return res.status(500).json({ error: "Failed to write log." });
      res.json({ response: `✅ Prompt logged successfully for model ${model}` });
    });
  });
});

app.get("/api/latest-response", (res) => {
fs.readFile("log.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read log.json" });
    }

    let logs = [];
    try {
      logs = JSON.parse(data);
    } catch (e) {
      return res.status(500).json({ error: "Invalid JSON format in log.json" });
    }

    if (logs.length === 0) {
      return res.status(404).json({ error: "No logs found" });
    }

    // Send the **latest entry** (prompt + response)
    const latestEntry = logs[logs.length - 1];
    res.json(latestEntry);
  });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
