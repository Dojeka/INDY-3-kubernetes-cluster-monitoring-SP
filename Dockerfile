# Base image: use Ollama official image
FROM ollama/ollama:0.1.47

# Set working directory
WORKDIR /app

# Copy app and requirements
COPY app.py .
COPY requirements.txt .

# Install Python 3, pip, and dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y python3-pip && \
    pip install --no-cache-dir -r requirements.txt

# Download Hugging Face model (replace MODEL_NAME as needed)
ARG MODEL_NAME=distilbert-base-uncased
RUN huggingface-cli download $MODEL_NAME $MODEL_NAME --local-dir .

# Write the Modelfile for Ollama
RUN echo "FROM $MODEL_NAME" > Modelfile

# Create Ollama model
RUN ollama create $MODEL_NAME -f Modelfile

# Clean up model file if desired
RUN rm $MODEL_NAME

# Default command to run the app
CMD ["python3", "app.py"]
