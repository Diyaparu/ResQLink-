// Function to confirm call initiation
function confirmCall(emergencyNumber) {
    let userResponse = confirm("Are you sure you want to call " + emergencyNumber + "?");

    if (userResponse) {
        if (isMobileDevice()) {
            // Initiate actual call on mobile
            function makeEmergencyCall(emergencyNumber) {
                let userResponse = confirm(`Are you sure you want to call ${emergencyNumber}?`);
                if (userResponse) {
                    window.location.href = `tel:${emergencyNumber}`;
                }
            }
            
           
            
    
        } else {
            // Show message on desktop
            alert("Call to " + emergencyNumber + " has been initiated.");

        }
    }
}

// Function to check if user is on a mobile device
function isMobileDevice() {
    return /Mobi|Android|iPhone/i.test(navigator.userAgent);
}

// Function for chatbot (Optional, Placeholder)
function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // Show user message
    let userMessage = document.createElement("p");
    userMessage.classList.add("user");
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Show bot response (Replace with AI logic)
    let botMessage = document.createElement("p");
    botMessage.classList.add("bot");
    botMessage.textContent = "I'm here to assist you. Please wait...";
    chatBox.appendChild(botMessage);

    // Clear input
    document.getElementById("userInput").value = "";
}