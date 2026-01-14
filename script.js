
const GEMINI_API_KEY = "AIzaSyD3H4UzpRR8bpGi6MOKDGipxei7nA6RfXs"; 
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=AIzaSyD3H4UzpRR8bpGi6MOKDGipxei7nA6RfXs";


document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents default action like adding a new line
        sendMessage();
    }
});
async function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    let chatBox = document.getElementById("chat-box");

    

    // Add user message to chat
    let userMessage = `<div class="user-message">${userInput}</div>`;
    chatBox.innerHTML += userMessage;
    document.getElementById("user-input").value = "";

    // Show "typing..." message
    let botTyping = `<div class="bot-message" id="typing">Typing...</div>`;
    chatBox.innerHTML += botTyping;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Call Gemini AI API
    let botResponse = await getGeminiResponse(userInput);

    // Remove "typing..." message
    document.getElementById("typing").remove();

    // Show AI response
    let botMessage = `<div class="bot-message">${botResponse}</div>`;
    chatBox.innerHTML += botMessage;
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getGeminiResponse(prompt) {
    try {
        let response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error:", errorData);
            return "Error connecting to AI service. Status: " + response.status;
        }

        let data = await response.json();
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return "Sorry, I couldn't process that. (No valid AI response)";
        }
    } catch (error) {
        console.error("Error fetching Gemini API:", error);
        return "Error connecting to AI service.";
    }
}