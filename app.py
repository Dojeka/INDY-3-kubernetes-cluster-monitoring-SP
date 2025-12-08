from openai import OpenAI
import json
import sys
from datetime import datetime
import argparse

LOG_PATH = '/home/dom/Documents/vscodium/INDY-3-kubernetes-cluster-monitoring-SP/log.json'

def main():
    parser = argparse.ArgumentParser(description='Process inputs.')
    parser.add_argument('--prompt', type=str, required=True)
    parser.add_argument('--model', type=str, required=True)

    args = parser.parse_args()
    
    message = args.prompt
    model = args.model

    # Initialize OpenAI client
    client = OpenAI(
        base_url="http://localhost:11434/v1",
        api_key="key"
    )

    try:
        # Send chat request
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": message}
            ],
            model=model
        )
        # Extract response
        response = chat_completion.choices[0].message.content.strip()
    except Exception as e:
        response = f"Error contacting model: {e}"

    # Create structured response
    current_timestamp = datetime.now().timestamp()
    responseData = {
        "model": model,
        "response": response,
        "timestamp": current_timestamp
    }

    print(json.dumps(responseData))

if __name__ == "__main__":
    main()