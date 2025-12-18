/**
 * server/src/deepgram.js - Deepgram AI Connection Factory
 * 
 * This module configures the WebSocket parameters for the Deepgram API
 * and exports a function to create a new authenticated connection.
 */

import WebSocket from "ws";

const DEEPGRAM_URL =
  "wss://api.deepgram.com/v1/listen" +
  "?model=nova-2" +
  "&punctuation=true" +
  "&interim_results=true" +
  "&encoding=opus" +
  "&channels=1";

/**
 * createDeepgramSocket - Creates a new WebSocket connection to Deepgram.
 * 
 * Uses the API key stored in your .env file for authentication.
 */
export function createDeepgramSocket() {
  return new WebSocket(DEEPGRAM_URL, {
    headers: {
      // Authorization header using the Deepgram API Key
      Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
    },
  });
}
