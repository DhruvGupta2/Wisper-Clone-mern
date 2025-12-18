/**
 * ws.js - WebSocket Management for Real-time Transcription
 * 
 * This module handles the connection to the transcription server,
 * parses incoming messages, and manages connection error states.
 */

export function createTranscriptionSocket(
  onFinalTranscript, // Callback for when a full sentence is ready
  onConnectionError,  // Callback for connection failures
  onConnected        // Callback for successful connection
) {
  // Initialize connection to the local backend server
  const ws = new WebSocket("ws://localhost:3001");
  let opened = false; // Flag to track if the connection was ever established

  /**
   * onopen - Triggered when the connection is established.
   */
  ws.onopen = () => {
    opened = true;
    console.log("🟢 WebSocket connected");
    onConnected();
  };

  /**
   * onmessage - Triggered whenever the server sends a data packet.
   */
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);

    // Deepgram/Server format parsing: 
    // We look for the first alternative and check if it's marked as 'final'.
    const transcript = msg?.channel?.alternatives?.[0]?.transcript;
    const isFinal = msg?.is_final;

    // Only update the UI if we have a non-empty final transcript piece
    if (transcript && isFinal) {
      onFinalTranscript(transcript);
    }
  };

  /**
   * onerror - Triggered if the connection fails.
   */
  ws.onerror = () => {
    // ❗ Only notify the UI if the socket failed to open at all.
    // If it was already open and then dropped, it might be a normal close.
    if (!opened) {
      onConnectionError(
        "Transcription failed: Unable to reach transcription server. Please ensure the backend is running."
      );
    }
  };

  return ws;
}
