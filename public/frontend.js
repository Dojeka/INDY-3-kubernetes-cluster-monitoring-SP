function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
    const responseDiv = document.getElementById("response");

    document.getElementById("submitButton").addEventListener("click", async (event) => {
        event.preventDefault();

        const textPrompt = document.getElementById("textPrompt").value.trim();
        const imageFile = document.getElementById("imageFile").files[0];
        const modelChoice = document.getElementById("modelSelect").value;

        if (!textPrompt) {
            responseDiv.innerHTML = `<p style="color:red;">Please enter a prompt first.</p>`;
            return;
        }

        const formData = new FormData();
        formData.append("prompt", textPrompt);
        formData.append("model", modelChoice);
        if (imageFile) formData.append("image", imageFile);

        try {
            const response = await fetch("http://localhost:5000/api/prompt", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to send prompt");
            const result = await response.json();

            responseDiv.innerHTML = `<strong>${result.model}</strong>: ${result.response}`;
        } catch (err) {
            responseDiv.innerHTML = `
            <p style="color:red;">Error: ${err.message}</p>
            <p>Make sure your backend is running and Ollama is active.</p>
            `;
        }
    });
});
