document.addEventListener("DOMContentLoaded", () => {            const form = document.getElementById("promptForm");
            const chatLog = document.getElementById("chatLog");
            const textPrompt = document.getElementById("textPrompt");
            const imageFile = document.getElementById("imageFile");
            const modelSelect = document.getElementById("modelSelect");
            const submitButton = document.getElementById("submitButton");

            // Function to append a message bubble to the chat log
            function appendMessage(role, text) {
                const messageDiv = document.createElement('div');
                messageDiv.className = role;
                messageDiv.innerHTML = `
                    <div class="message-row">
                        <div class="message-bubble">${text}</div>
                    </div>
                `;
                chatLog.appendChild(messageDiv);
                // Scroll to the latest message
                chatLog.scrollTop = chatLog.scrollHeight;
                return messageDiv; // Return the created element for potential updates (like loading state)
            }

            // --- The core logic to handle submission ---
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const promptText = textPrompt.value.trim();
                const modelChoice = modelSelect.value;
                const file = imageFile.files[0];

                if (!promptText) return;

                // 1. Display User Message
                appendMessage('user', promptText);

                textPrompt.value = ''; // Clear prompt area

                // 2. Display AI Loading Message
                const loadingMessage = appendMessage('ai', `<span class="loading-text">Generating response from ${modelChoice}...</span>`);
                const loadingBubble = loadingMessage.querySelector('.message-bubble');

                // Disable input during request
                submitButton.disabled = true;

                const formData = new FormData();
                formData.append("prompt", promptText);
                formData.append("model", modelChoice);
                if (file) {
                    formData.append("image", file);
                }
                try {
                    const response = await fetch("http://192.168.1.192:8080/api/prompt", {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) {
                        const errText = await response.text();
                        throw new Error(`Server returned error: ${response.status} - ${errText}`);
                    }

                    const result = await response.json();
                    
                    // 3. Update AI message with the final response
                    // Use simple replacement to keep the original formatting
                    loadingBubble.innerHTML = result.response || "Error: Model returned an empty response."; 

                } catch (error) {
                    // 4. Display Error Message
                    loadingBubble.innerHTML = `<span style="color:red; font-weight: bold;">Error:</span> ${error.message}`;
                    console.error("Fetch error:", error);
                } finally {
                    // Reset inputs
                    submitButton.disabled = false;
                    imageFile.value = ''; // Clear file input
                }
            });
        });