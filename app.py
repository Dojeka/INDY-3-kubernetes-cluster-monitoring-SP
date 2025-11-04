import os
import subprocess
import logging
import ollama
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_REPO = "distilbert-base-uncased"
MODEL_NAME = "distilbert-base-uncased"
VISION_ADAPTER = None  # Replace with your adapter if needed
MODELFILE_CONTENT = f"FROM {MODEL_NAME}"


class HuggingFaceModel:
    def __init__(self, repository, model, modelfile_content=None, vision_adapter=None):
        self.repository = repository
        self.model = model
        self.modelfile_content = modelfile_content or f"FROM {model}"
        self.vision_adapter = vision_adapter


def run_command(*command):
    """Run a shell command and raise an error if it fails."""
    logger.info(f"Running command: {' '.join(command)}")
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        logger.error(result.stderr)
        raise RuntimeError(f"Command failed: {' '.join(command)}")
    return result.stdout


def setup_model_container(hf_model: HuggingFaceModel):
    """Mimic OllamaHuggingFaceContainer in Python."""
    # Update & install requirements
    run_command("apt-get", "update")
    run_command("apt-get", "upgrade", "-y")
    run_command("apt-get", "install", "-y", "python3-pip")
    run_command("pip", "install", "huggingface-hub")

    # Download Hugging Face model
    run_command(
        "huggingface-cli",
        "download",
        hf_model.repository,
        hf_model.model,
        "--local-dir",
        "."
    )

    if hf_model.vision_adapter:
        run_command(
            "huggingface-cli",
            "download",
            hf_model.repository,
            hf_model.vision_adapter,
            "--local-dir",
            "."
        )

    # Write Modelfile and create Ollama model
    with open("Modelfile", "w") as f:
        f.write(hf_model.modelfile_content)

    run_command("ollama", "create", hf_model.model, "-f", "Modelfile")
    run_command("rm", hf_model.model)


def predict(text: str) -> int:
    """Simple prediction using Hugging Face Transformers."""
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

    input_ids = tokenizer.encode(text, return_tensors="pt")
    outputs = model(input_ids)
    logits = outputs.logits
    predicted_class = torch.argmax(logits)
    return predicted_class.item()


if __name__ == "__main__":
    hf_model = HuggingFaceModel(repository=MODEL_REPO, model=MODEL_NAME, vision_adapter=VISION_ADAPTER)
    setup_model_container(hf_model)

    sample_text = "Hello world!"
    pred = predict(sample_text)
    logger.info(f"Predicted class for '{sample_text}': {pred}")

    run_command("rm", hf_model.model)