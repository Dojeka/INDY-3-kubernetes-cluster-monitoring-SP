function toggleMenu() {
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
} 

document.getElementById('modelSelect').addEventListener('change', function(event) {

});

 document.getElementById('multimodalForm').addEventListener('submit',async function(event) {
            event.preventDefault(); // Prevent the default form submission

            const textPrompt = document.getElementById('textPrompt').value;
            const imageFile = document.getElementById('imageFile').files[0];
            const modelChoice = document.getElementById('modelSelect').value;
            const responseDiv = document.getElementById('response');
                
            // Display loading state
            responseDiv.innerHTML = 'Sending data to model... Please wait...';

            const formData = new FormData();
            formData.append("prompt", textPrompt);
            formData.append("model", modelChoice);
            if (imageFile) formData.append("image", imageFile);
                
            try {
            const response = await fetch("http://localhost:5000/api/prompt", {
            method: "POST",
            body: formData
            });

            const data = await response.json();
            responseDiv.innerHTML = data.response || "No response received.";
        } catch (err) {
            responseDiv.innerHTML = `❌ Error: ${err.message}`;
        }
        });