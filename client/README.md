# WISPR Flow Clone – Voice-to-Text Desktop App

## Overview

This project is a functional clone of **Wispr Flow**, focused on the **core voice-to-text workflow** rather than pixel-perfect UI replication.

The goal of this assignment was to demonstrate the ability to build a **real-time, AI-powered desktop application** using modern tools, with clean architecture and practical engineering decisions.

The application allows users to press a button, speak naturally, and receive real-time transcriptions that can be edited and copied anywhere.

---

## Tech Stack

### Frontend
- **React (Vite)**
- MediaRecorder API for audio capture
- WebSocket for real-time streaming

### Backend
- **Node.js**
- WebSocket proxy server
- Secure Deepgram integration (API key never exposed to frontend)

### Speech-to-Text
- **Deepgram Real-Time API**
- Streaming Opus audio for low latency transcription

### Desktop
- **Tauri** (cross-platform desktop support)
- Lightweight and secure alternative to Electron

---

## Core Features

### Push-to-Talk Voice Input
Users press a single button to start and stop voice recording, following a natural push-to-talk workflow.

### Microphone Access & Audio Capture
The app requests system microphone permissions and captures high-quality audio using the MediaRecorder API.

### Real-Time Transcription
Audio is streamed to Deepgram in real time via a backend WebSocket proxy, ensuring low latency and secure API usage.

### Editable Transcription
Transcribed text is displayed in an editable textarea, allowing users to modify the output before copying or inserting it elsewhere.

### Recording Controls
Clear start/stop controls with visual feedback indicate the current recording state.

### Error Handling
Common failure cases such as:
- Microphone permission denial
- Network connectivity issues
- Backend connection failures  
are handled gracefully with user-friendly messages.

---

## Architecture & Design Decisions

### Separation of Concerns

The project follows a clean modular structure:

- **UI Layer (`App.jsx`)**
  - Manages user interaction and state
- **Audio Layer (`audio.js`)**
  - Handles microphone access and audio streaming
- **Transcription Layer (`ws.js`)**
  - Manages WebSocket communication and transcription events
- **Backend Server**
  - Handles Deepgram integration securely

This separation makes the codebase easy to understand, debug, and extend.

---

## Why Tauri?

Tauri was chosen to provide:
- Cross-platform desktop support (Windows, macOS, Linux)
- Smaller bundle size than Electron
- Native system integration
- Improved performance and security

The application logic is intentionally developed and tested in the browser first, then wrapped with Tauri to ensure reliability.

---

## Known Limitations

- No global hotkey support (can be added with Tauri APIs)
- Minimal UI styling by design
- No background or tray mode yet

These were intentionally excluded to focus on core functionality and code quality.

---

## How to Run

### Backend
```bash
cd server
npm install
npm run dev
