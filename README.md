# Chit Chat

**Chit Chat** is a real-time messaging web application that allows users to communicate instantly in a shared chatroom. It features a minimalistic and user-friendly interface while leveraging WebSocket technology for seamless, live updates.

---

## Deployment

The application is deployed on Render and accessible via [Chit Chat Live](https://chatterbox-wxdm.onrender.com/).

---

## Features

- **Real-Time Messaging**: Send and receive messages instantly.
- **Username Identification**: Users must provide a unique name before joining the chatroom.
- **Responsive UI**: Optimized for desktop and mobile devices.
- **Secure WebSocket Communication**: Automatically uses secure WebSocket (`wss://`) for HTTPS connections.

---

## Assumptions & Design Choices

- Users are required to provide a name; anonymous names are not allowed.
- A simple and modern text-based UI was implemented to emphasize core functionality.
- The app supports secure communication over WebSocket connections.

---

## How to Access the Application

1. Visit the deployment link: [Chit Chat Live](https://chatterbox-wxdm.onrender.com/).
2. Enter your name to join the chatroom.
3. Start chatting in real-time with other users!

---

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **WebSocket**: Real-time communication using `ws` library
- **Deployment**: Render

---

## Local Setup

Follow these steps to set up the application on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ankitank08/ChatterBox.git
   cd ChatterBox
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   node server/server.js
   ```

4. **Access the app**:
   Open your browser and go to `http://localhost:3000`.

---
