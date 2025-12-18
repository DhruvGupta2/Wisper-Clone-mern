/**
 * WISPR Clone - Main Application Component
 * 
 * This component handles the UI state, microphone streaming lifecycle,
 * and WebSocket communication for real-time transcription.
 */
import { useRef, useState } from "react";
import { createTranscriptionSocket } from "./ws";
import { startAudioStream, stopAudioStream } from "./audio";
import "./App.css";

export default function App() {
  // References to store objects that don't need to trigger re-renders
  const wsRef = useRef(null);       // Persists the WebSocket connection
  const recorderRef = useRef(null); // Persists the MediaRecorder instance
  const streamRef = useRef(null);   // Persists the MediaStream (mic access)

  // Application State
  const [recording, setRecording] = useState(false); // UI toggle for recording status
  const [text, setText] = useState("");              // The accumulated transcription text
  const [error, setError] = useState("");            // Stores error messages (e.g., mic denied)
  const [copied, setCopied] = useState(false);       // Temporary state for "Copied!" feedback

  /**
   * setupSocket - Initializes the WebSocket connection for transcription.
   * Defines what happens when text arrives, when connection fails, or when it opens.
   */
  const setupSocket = () => {
    wsRef.current = createTranscriptionSocket(
      // Callback: when a "final" piece of transcript is received from server
      (finalText) => {
        setText((prev) => prev + " " + finalText);
      },
      // Callback: if the connection fails before it even starts
      (errMsg) => {
        setError(errMsg);
      },
      // Callback: when the connection is successfully established
      () => {
        setError("");
      }
    );
  };

  /**
   * startRecording - Triggers when the user presses the mic button.
   * Requests mic access and starts sending audio data to the server.
   */
  const startRecording = async () => {
    try {
      setText("");  // Reset text for new session
      setError(""); // Clear previous errors

      // 1. Initialize the WebSocket first
      setupSocket();

      // 2. Start capturing audio and link it to our socket
      const { recorder, stream } = await startAudioStream(
        wsRef.current
      );

      // 3. Store references for cleanup later
      recorderRef.current = recorder;
      streamRef.current = stream;

      setRecording(true);
      console.log("🎙 Recording started");
    } catch (err) {
      console.error(err);
      setError("Microphone access denied. Please check your browser permissions.");
    }
  };

  /**
   * stopRecording - Triggers when the user stops the recording.
   * Cleans up the mic stream and closes the WebSocket.
   */
  const stopRecording = () => {
    // 1. Stop the browser's recording mechanism
    stopAudioStream(recorderRef.current, streamRef.current);

    // 2. Gracefully close the WebSocket connection
    wsRef.current?.close();

    // 3. Reset internal references
    recorderRef.current = null;
    streamRef.current = null;

    setRecording(false);
    console.log("🛑 Recording stopped");
  };

  return (
    <div className="app-container">
      {/* Branding Header */}
      <header className="header">
        <h1>WISPR Clone</h1>
      </header>

      {/* Main Interaction Area: The Record Button */}
      <div className="recording-section">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`record-btn ${recording ? "recording" : "idle"}`}
          title={recording ? "Stop Recording" : "Press to Talk"}
        >
          {recording ? "⏹" : "🎙"}
        </button>
        <span style={{ fontSize: '14px', color: 'var(--text-dim)', fontWeight: '500' }}>
          {recording ? "Recording..." : "Tap to transcribe"}
        </span>
      </div>

      {/* Conditional Error Display */}
      {error && <div className="error-message">{error}</div>}

      {/* Transcription Display and Controls */}
      <div className="transcription-section">
        <h3>Transcription</h3>

        {/* The Textarea allows users to live-edit the transcription as it arrives */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Transcription will appear here... You can edit the text before copying."
          className="transcription-area"
        />

        {/* Action Buttons: Copy and Clear */}
        <div className="controls">
          <button
            className={`control-btn ${copied ? "copied" : ""}`}
            onClick={() => {
              if (!text) return;
              navigator.clipboard.writeText(text);
              setCopied(true);
              // Reset feedback after 2 seconds
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
          <button
            className="control-btn clear"
            onClick={() => setText("")}
          >
            🗑 Clear
          </button>
        </div>
      </div>
    </div>
  );
}
