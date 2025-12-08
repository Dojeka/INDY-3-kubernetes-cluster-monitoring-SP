// server.js
import express from "express";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import path from "path";
import { execFile } from "child_process";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: "uploads/" });

app.options("/api/prompt", cors());
app.post("/api/prompt", upload.single("image"), (req, res) => {
  const { prompt, model } = req.body;
  const args = [path.join(__dirname, "app.py")];

  if (!prompt || !model) {
    return res.status(400).json({ error: "Prompt and model are required." });
  }

  if (prompt) {
    args.push("--prompt", prompt);
  }
  if (model) {
    args.push("--model", model);
  }

  execFile("python3", args, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return res.status(500).json({ error: "Python execution failed." });
    }
    if (stderr) console.error(`stderr: ${stderr}`);

    try {
      const response = JSON.parse(stdout);
      res.send(response);
    } catch {
      res.json({ response: stdout || `Prompt logged successfully for model ${model}` });
    }
  });
});
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
