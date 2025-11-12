<<<<<<< HEAD
from playwright.sync_api import sync_playwright

def test_access_local_storage():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://example.com")

        # Access localStorage data
        local_storage_data = page.evaluate("""
            () => {
                let data = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    data[key] = localStorage.getItem(key);
                }
                return data;
            }
        """)
        print("Local Storage Data:", local_storage_data)
        browser.close()   
=======
from openai import OpenAI
import json
from datetime import datetime


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
    model = model
)

response = "This means I got your prompt dude"

current_timestamp = datetime.now()
current_timestamp =current_datetime.timestamp()
responseData = {
    "model" : model,
    "response" : response,
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
>>>>>>> b375797873033c8bd450cc98cb5a2ca7ce0aa46f
