import time 

import requests 

import threading 

import json 

import os 

from queue import Queue 

  

# timing logic: 

# start_time = time.time() 

# end_time = time.time() - start_time 

# Ensure time measurements are captured per request. 

def worker(id, jsonpath, model_name, result_queue): 

    print(f"#### Loading model in thread {id}...") 

  

    url = '********' 

     

    # Load the JSON payload from the provided path 

    with open(jsonpath, 'r') as file: 

        payload = json.load(file) 

     

    # Add model name to the payload for Ollama API to use 

    payload["model"] = model_name 

     

    # Start time just before the request (in nanoseconds) 

    request_start_ns = time.time_ns() 

  

    print(f"Thread {id} sending request to model '{model_name}'...") 

  

    # Simulate warmup with a special "load model" message if needed 

    warmup_payload = { 

        "prompt": "Please load the model into VRAM and get ready for testing.", 

        "model": model_name  # Include model name in the warm-up request 

    } 

    warmup_response = requests.post(url, json=warmup_payload) 

    if warmup_response.status_code == 200: 

        print(f"Thread {id} model loaded! Time to test.") 

  

    # Run the actual test prompt with the specified model 

    r = requests.post(url, json=payload) 

     

    # End time just after the request, and calculate duration 

    request_end_ns = time.time_ns()  

     

    # Convert from nanoseconds to milliseconds 

    request_duration_ms = (request_end_ns - request_start_ns) / 1_000_000 

     

    print(f"#### Thread {id} request complete") 

    print(f"Response time for thread {id}: {request_duration_ms:.2f} ms") 

    print(f"Model Output from Thread {id}: {r.text[:200]}...")  # Limit output preview 

     

    # Store the result in the queue for later retrieval 

    result_queue.put({ 

        'id': id, 

        'model': model_name, 

        'duration': request_duration_ms, 

        'response': r.text[:200]  # Preview of the response 

    }) 

  

# Function to handle the testing with multiple threads 

def test(jsonpath, model_name): 

    print("#### Starting Test Suite...") 

     

    # Warm-up with a single prompt to load models into VRAM. 

    num_threads = 3 

    threads = [] 

    result_queue = Queue() 

  

    print("Loading models into VRAM (this may take a while)...") 

  

    for i in range(num_threads): 

        t = threading.Thread(target=worker, args=(i, jsonpath, model_name, result_queue)) 

        threads.append(t) 

  

    # Start warm-up threads 

    for t in threads: 

        t.start() 

  

    # Wait for all warm-up threads to finish 

    for t in threads: 

        t.join() 

  

    print(f"#### Model loaded, now running tests with {num_threads} threads...") 

  

    # Running tests for real 

    threads = [] 

    num_threads = 6  # Number of test threads 

  

    for i in range(num_threads): 

        t = threading.Thread(target=worker, args=(i, jsonpath, model_name, result_queue)) 

        threads.append(t) 

  

    # Start test threads 

    for t in threads: 

        t.start() 

  

    # Wait for all test threads to finish 

    for t in threads: 

        t.join() 

  

    print("\n#### Test Complete. Results:") 

  

    # Collect results from the queue and print them in a table format 

    results = [] 

    while not result_queue.empty(): 

        results.append(result_queue.get()) 

  

    # Print a table of results 

    print(f"\n{'#' * 50}") 

    print(f"{'Thread':<8} {'Model':<15} {'Duration (ms)':<20} {'Response Preview'}") 

    print(f"{'#' * 50}") 

    for result in results: 

        print(f"{result['id']:<8} {result['model']:<15} {result['duration']:<20} {result['response']}") 

    print(f"{'#' * 50}") 

  

# Function to create different test prompts 

def main(): 

    prompts = { 

        "one_word.json": {"prompt": "apple"}, 

        "poem.json": {"prompt": "Write a poem about the ocean."}, 

        "essay.json": {"prompt": "Write a 500-word essay on climate change."}, 

        "code.json": {"prompt": "Write a Python function to sort a list of numbers."} 

    } 

  

    for filename, content in prompts.items(): 

        with open(filename, 'w') as f: 

            json.dump(content, f) 

        print(f"Test prompt saved to {filename}") 

  

    # Select which models to test 

    models = ['llama3.1'] 

     

    # Loop through each model 

    for model in models: 

        print(f"\n#### Testing with model: {model}") 

         

        # Loop through each prompt and run the test with the same model 

        for prompt_file in prompts: 

            print(f"\n#### Testing with prompt: {prompt_file}") 

            jsonpath = prompt_file  # Using each prompt from the 'prompts' dictionary 

            test(jsonpath, model) 

  

main() 
