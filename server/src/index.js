/**
 * server/src/index.js - Main Entry Point for the Transcription Backend
 * 
 * This file sets up a WebSocket server that acts as a bridge between the 
 * frontend client (the browser) and the Deepgram AI transcription service.
 */

import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { createDeepgramSocket } from "./deepgram.js";

// Load environment variables from .env file
dotenv.config();

// The port where our proxy server will listen
const PORT = 3001;

// Safety Check: We can't transcribe without an API key
if (!process.env.DEEPGRAM_API_KEY) {
  console.error("❌ Missing DEEPGRAM_API_KEY in environment variables!");
  process.exit(1);
}

// 1. Create a basic HTTP server to host our WebSocket
const server = http.createServer();

// 2. Initialize the WebSocket server (WSS) on top of the HTTP server
const wss = new WebSocketServer({ server });

/**
 * Triggered whenever a new client (like our React app) connects to this server.
 */
wss.on("connection", (clientSocket) => {
  console.log("🟢 New client connected to proxy server");

  let deepgramSocket = null; // Holds the connection to Deepgram
  let deepgramReady = false; // Tracks if Deepgram is ready to receive audio
  let audioQueue = [];       // Buffers audio chunks received while Deepgram is connecting

  /**
   * clientSocket.on("message") - Triggered when the browser sends audio data.
   */
  clientSocket.on("message", (data) => {
    
    // Lazy Initialization: Only connect to Deepgram once we actually receive audio
    if (!deepgramSocket) {
      console.log("🔗 Opening connection to Deepgram AI...");
      deepgramSocket = createDeepgramSocket();

      /**
       * deepgramSocket.on("open") - Successfully connected to the AI service.
       */
      deepgramSocket.on("open", () => {
        console.log("✅ Deepgram connection established");
        deepgramReady = true;

        // "Flush" the queue: Send any audio that was captured while we were connecting
        console.log(`📦 Sending ${audioQueue.length} queued chunks to Deepgram`);
        audioQueue.forEach((chunk) => deepgramSocket.send(chunk));
        audioQueue = []; // Clear the queue
      });

      /**
       * deepgramSocket.on("message") - Triggered when Deepgram returns text results.
       */
      deepgramSocket.on("message", (msg) => {
        // We simply forward the AI's response directly back to our React app
        clientSocket.send(msg.toString());
      });

      /**
       * deepgramSocket.on("error") - AI service error handling.
       */
      deepgramSocket.on("error", (err) => {
        console.error("❗ Deepgram error:", err);
      });

      /**
       * deepgramSocket.on("close") - AI service disconnected.
       */
      deepgramSocket.on("close", () => {
        console.log("❌ Deepgram connection closed");
      });
    }

    // Ensure the data is a binary Buffer (audio data)
    if (!(data instanceof Buffer)) return;

    // Buffer management: 
    // If Deepgram isn't ready yet, save the audio. Otherwise, stream it instantly.
    if (!deepgramReady) {
      audioQueue.push(data);
    } else {
      deepgramSocket.send(data);
    }
  });

  /**
   * clientSocket.on("close") - Triggered when the user stops recording in the browser.
   */
  clientSocket.on("close", () => {
    console.log("🔴 Client disconnected from proxy");

    // If we have an active connection to Deepgram, close it gracefully
    if (deepgramSocket?.readyState === WebSocket.OPEN) {
      // Deepgram prefers a "CloseStream" message to finalize transcription
      deepgramSocket.send(JSON.stringify({ type: "CloseStream" }));
      deepgramSocket.close();
    }
  });

  /**
   * clientSocket.on("error") - Browser connection error.
   */
  clientSocket.on("error", (err) => {
    console.error("⚠️ Client WebSocket error:", err);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Proxy server active on ws://localhost:${PORT}`);
  console.log(`📡 Ready to receive and forward audio for transcription.`);
});
