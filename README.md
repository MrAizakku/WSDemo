# WebSocket Server API Documentation

## Overview

This WebSocket server allows clients to establish a WebSocket connection and send messages. It also provides an endpoint to open a WebSocket connection and send messages to the server.

## Startup

**Starting the WebSocket Server:**

1. Open your terminal or command prompt.
2. Navigate to the directory where your `websocket.js` file is located.
3. Run the following command to start the WebSocket server:

```bash
node websocket.js
```

1. Once the server is running, it will log a message indicating that it's listening on a specific port (e.g., `Server is listening on port 3030`). This means that the WebSocket server is now ready to accept WebSocket connections.

**Starting the WebSocket Client (Interacting with the WebSocket Server):**

1. Open another terminal or command prompt window.
2. Navigate to the directory where your `index.js` file (WebSocket client) is located.
3. Run the following command to start the WebSocket client:

```bash
node index.js
```

4. The WebSocket client will connect to the WebSocket server using the specified WebSocket URL (e.g., `ws://localhost:3030`). If the connection is successful, the client will be able to interact with the WebSocket server as programmed in the `index.js` file.

By following these instructions, you'll have both the WebSocket server and client up and running, allowing them to establish a connection and exchange messages.

## Client Endpoints

### 1. Open WebSocket Connection

- **Endpoint:** `/open-ws`
- **Method:** `POST`
- **Description:** Opens a WebSocket connection to the server.
- **Request Body:**
  - `port` (integer): The port number to connect to.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `{ "message": "WebSocket connection established" }`
- **Error Responses:**
  - **Code:** `500 Internal Server Error`
  - **Content:** `{ "error": "Failed to establish WebSocket connection" }`

### 2. Send Message

- **Endpoint:** `/send-message`
- **Method:** `GET`
- **Description:** Sends a message to the WebSocket server.
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** `{ "message": "Message sent successfully" }`
- **Error Responses:**
  - **Code:** `500 Internal Server Error`
  - **Content:**
    - `{ "error": "WebSocket connection is not open" }` (if WebSocket connection is not open)
    - `{ "error": "Failed to send message" }` (if failed to send message)
- **Notes:**
  - Ensure that a WebSocket connection is opened before calling this endpoint.

## WebSocket Events

### 1. Open Event

- **Event Name:** `open`
- **Description:** Indicates that the WebSocket connection has been successfully established.
- **Actions:**
  - Log a message indicating s successful connection.
  - Send a response to the client indicating a successful connection.

### 2. Close Event

- **Event Name:** `close`
- **Description:** Indicates that the WebSocket connection has been closed.
- **Actions:** Log a message indicating the closure of the WebSocket connection.

### 3. Error Event

- **Event Name:** `error`
- **Description:** Indicates that an error has occurred with the WebSocket connection.
- **Actions:**
  - Log the error.
  - Send an error response to the client indicating a WebSocket connection error.
