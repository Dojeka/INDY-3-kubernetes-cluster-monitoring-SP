function toggleMenu() {
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
} 

 document.getElementById('multimodalForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const textPrompt = document.getElementById('textPrompt').value;
            const imageFile = document.getElementById('imageFile').files[0];
            const responseDiv = document.getElementById('response');

            if(textPrompt != null){
               const promptData = { prompt: textPrompt, timestamp: new Date().toISOString() };
               localStorage.setItem('log', JSON.stringify(promptData));
               document.getElementById('jsonOutput').textContent = JSON.stringify(promptData, null, 2);
                }
                
            // Display loading state
            responseDiv.innerHTML = 'Sending data to model... Please wait...';

            // 2. **Simulate API Call (Replace this section with your actual fetch call)**
            setTimeout(() => {
                // --- Start of Simulated API Response Logic ---
                let modelResponse = "Model received the text prompt: **" + textPrompt + "**";

                if (imageFile) {
                    modelResponse += "\n\nAND an image named: **" + imageFile.name + "** (" + imageFile.type + ").";
                    modelResponse += "\n\n_Actual model would now process the image and text to generate a relevant answer._";
                } else {
                    modelResponse += "\n\n_Since no image was provided, the model would only generate a response based on the text._";
                }

                modelResponse += "\n\n**Response Status:** Success (Simulated)";
                // --- End of Simulated API Response Logic ---

                // 3. **Display Response**
                responseDiv.innerHTML = modelResponse;

            }, 2000); // Simulate a 2-second network/processing delay
        });