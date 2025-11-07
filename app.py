from openai import OpenAI
import json

message = ""
try:
    with open('/home/dom/Documents/vscodium/INDY-3-kubernetes-cluster-monitoring-SP/log.json', 'r') as file:
        data = json.load(file)
        entry = data[-1]
        message = entry["prompt"]
        model = entry["model"]
except FileNotFoundError:
    print("Error: The file 'log.json' was not found.")
except json.JSONDecodeError as e:
    print(f"Error: Invalid JSON format - {e}")
except KeyError as e:
    print(f"Error: Expected key {e} not found in JSON.")

client = OpenAI(
    base_url = "http://localhost:8000/v1",
    api_key = "key"
)
chat_completion = client.chat.completions.create(
    messages=[
        {
        "role": "user",
        "content": message
        }
    ],
    model = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
)
print(chat_completion.choices[0].message.content)