const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
const ws = new WebSocket(`${wsProtocol}${window.location.host}`);
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const nameContainer = document.getElementById("name-container");
const chatContainer = document.querySelector(".chat-container");
const nameSubmitButton = document.getElementById("name-submit");
const usernameInput = document.getElementById("username");

let clientName = "Anonymous";

nameSubmitButton.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (name) {
    clientName = name;
    nameContainer.style.display = "none";
    chatContainer.style.display = "flex";
    ws.send(JSON.stringify({ type: "name", name: clientName }));
  }
});

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  const messageDiv = document.createElement("div");
  messageDiv.textContent = `${message.name}: ${message.data}`;
  messageDiv.className = "other-message";
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    const timestamp = new Date().toLocaleTimeString();
    ws.send(JSON.stringify({ type: "chat", data: message }));
    const messageDiv = document.createElement("div");
    messageDiv.textContent = `You: ${message} (${timestamp})`;
    messageDiv.className = "my-message";
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    messageInput.value = "";
  }
}
