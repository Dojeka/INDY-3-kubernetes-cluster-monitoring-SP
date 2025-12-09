// server.js
import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import { execFile } from "child_process";

//make sure the static files run when server runs
const app = express();
const PORT  = 5000;
const STATIC_DIR = path.join(process.cwd(), 'public');

//middleware for allowing domain requests from anywhere 
app.use(cors());
//middleware for accepting json data
app.use(express.json());

//serve the static files
app.use(express.static(STATIC_DIR));

//multer to receive form data
const upload = multer({ dest: "uploads/" });

app.options("/api/prompt", cors());
app.post("/api/prompt", upload.single("image"), (req, res) => {
  const { prompt, model } = req.body;
  const args = [path.join(process.cwd(), "app.py")];

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
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
