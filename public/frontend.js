window.addEventListener("beforeunload", () => {
    console.log("Page is reloading!");
});


document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("submitButton");
    const form = document.getElementById("multimodalForm");
    const responseDiv = document.getElementById("response");

    // Extra protection — stop form submission globally
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    button.addEventListener("click", async (event) => {
        event.preventDefault();
        event.stopPropagation();

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

        responseDiv.innerHTML = "Sending to model...";

        try {
            const response = await fetch("http://localhost:5000/api/prompt", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to send prompt");

            const data = await response.json();
            responseDiv.innerHTML = "Sending to model...";

            responseDiv.innerHTML = `<strong>${JSON.stringify(data.model)}</strong>: ${JSON.stringify(data.response)}`;
        } catch (error) {
            responseDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        }
    });
});
