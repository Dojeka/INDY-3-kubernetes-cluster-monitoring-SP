from openai import OpenAI
import json
import sys
from datetime import datetime

LOG_PATH = '/home/dom/Documents/vscodium/INDY-3-kubernetes-cluster-monitoring-SP/log.json'

def main():
    try:
        # Read latest prompt and model
        with open(LOG_PATH, 'r') as file:
            data = json.load(file)
            if not data:
                print(json.dumps({"error": "log.json is empty"}))
                return
            entry = data[-1]
            message = entry.get("prompt", "")
            model = entry.get("model", "")
    except FileNotFoundError:
        print(json.dumps({"error": "The file 'log.json' was not found."}))
        return
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON format - {e}"}))
        return
    except KeyError as e:
        print(json.dumps({"error": f"Expected key {e} not found in JSON."}))
        return

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

try:
    with open('/home/dom/Documents/vscodium/INDY-3-kubernetes-cluster-monitoring-SP/log.json', 'w') as file:
        json.dump(responseData, file, indent=2)
except FileNotFoundError:
    print("Error: The file 'log.json' was not found.")
except PermissionError:
    print("Error: Permissions not granted to access 'log.json'")
except IOError:
    print("Error: cannot write to 'log.json'")