document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
});

// Clear chat button
document.getElementById("clearChat").addEventListener("click", () => {
    document.getElementById("chatBox").innerHTML = "";
});

function sendMessage() {
    let msg = document.getElementById("userInput").value.trim();
    if (msg === "") return;

    // Show user message
    appendMessage("user", msg);
    document.getElementById("userInput").value = "";

    // Send message to backend
    fetch("/get", {
        method: "POST",
        body: new URLSearchParams({ msg }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.reply) {
                appendMessage("bot", data.reply);
            } else {
                appendMessage("bot", "Error: " + data.error);
            }
        });
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById("chatBox");

    let msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "msg user-msg" : "msg bot-msg";
    msgDiv.innerHTML = text;

    chatBox.appendChild(msgDiv);

    // Smooth scroll animation
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth",
    });
}
