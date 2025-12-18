/**
 * server/test.js - Backend Connectivity Test Script
 * 
 * This is a utility script to verify that your backend server is 
 * correctly communicating with Deepgram. It reads a local audio 
 * file and streams it to the local server.
 */

import fs from "fs";
import WebSocket from "ws";

// 1. Connect to our local proxy server
const ws = new WebSocket("ws://localhost:3001");

ws.on("open", () => {
  console.log("🟢 Connected to local backend");

  /**
   * Sending a dummy audio file to test the flow.
   * Note: You must have a 'sample.opus' file in the server directory for this to work.
   */
  try {
    const audio = fs.readFileSync("./sample.opus");
    ws.send(audio);
    console.log("🎤 Sample audio data sent successfully");
  } catch (err) {
    console.warn("⚠️ Could not find 'sample.opus'. Run the app in the browser to test with your mic instead.");
  }
});

/**
 * Log any transcription results received back from the server.
 */
ws.on("message", (data) => {
  console.log("📝 Received Transcript:", data.toString());
});

/**
 * Handle connection closure.
 */
ws.on("close", () => {
  console.log("🔴 Disconnected from backend");
});
