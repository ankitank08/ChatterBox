const express = require("express");
const http = require("http");
const path = require("path");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = 3000;
let clients = [];
let clientNames = {}; // This will store the names of clients by their WebSocket connections

// Serve static files
app.use(express.static(path.join(__dirname, "./public")));

// WebSocket logic
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Store the WebSocket connection to the clients array
  clients.push(ws);

  // Send welcome message (could be optional)
  ws.send(
    JSON.stringify({
      type: "chat",
      name: "Server",
      data: "Welcome to the chat!",
    })
  );

  // Handle incoming messages
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    if (Buffer.isBuffer(message)) {
      // Convert Buffer to a string
      message = message.toString(); // Decoding Buffer to string
      console.log(`Decoded message from buffer: ${message}`);
    }

    let parsedMessage;
    try {
      console.log(message);

      parsedMessage = JSON.parse(message);
    } catch (err) {
      console.error("Invalid message format:", err.message);
      return; // Skip invalid message formats
    }

    // If the message is setting the name (like { type: "name", name: "user_name" })
    if (parsedMessage.type === "name") {
      const clientName = parsedMessage.name;
      clientNames[ws] = clientName; // Store the client's name
      console.log(`Client name set to: ${clientName}`);

      // We do not broadcast name-setting messages
      return; // Exit the function early to prevent broadcasting the name-setting message
    }

    // Process chat message
    if (parsedMessage.type === "chat") {
      const clientName = clientNames[ws] || "Anonymous"; // Use the stored name or default to "Anonymous"
      const chatMessage = {
        type: "chat",
        name: clientName,
        data: parsedMessage.data,
      };

      // Broadcast to all other clients except the sender
      clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(chatMessage));
        }
      });
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clients = clients.filter((client) => client !== ws); // Remove client from the list
    delete clientNames[ws]; // Also remove their name from the clientNames map
  });

  // Handle WebSocket errors
  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
