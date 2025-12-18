# Wispr Flow Clone — Real-Time Voice-to-Text Desktop App

## Project Overview

This project is a **functional clone of Wispr Flow**, focused on the **core voice-to-text workflow** rather than pixel-perfect UI replication.

The objective of this assignment was to demonstrate practical skills in building a **real-time, AI-powered desktop application** that solves a real user problem: converting spoken input into editable text with minimal latency.

The application allows users to:
- Press a button to start recording
- Speak naturally into their microphone
- Receive real-time transcription
- Edit and copy the transcribed text
- Run the application as a **cross-platform desktop app** using Tauri

The emphasis of this project is on **functionality, architecture, and problem-solving**, not UI polish.

---


## Final Project Structure

```text
wispr-flow-clone/
│
├── client/
│   ├── src/
│   │   ├── App.jsx        # Main UI (buttons, textarea, layout)
│   │   ├── App.css        # UI styles
│   │   ├── audio.js       # Microphone access & audio streaming
│   │   ├── ws.js          # WebSocket transcription logic
│   │   ├── main.jsx       # React entry point
│   │   └── index.css
│   │
│   ├── src-tauri/         # Tauri desktop configuration
│   │   ├── tauri.conf.json
│   │   ├── Cargo.toml
│   │   └── src/main.rs
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── server/
│   ├── src/
│   │   ├── index.js       # WebSocket proxy server
│   │   └── deepgram.js    # Deepgram connection logic
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── .env               # Deepgram API key (NOT committed)
│   └── test.js
│
└── README.md              # Main project documentation
```
---

## Tech Stack

### Frontend
- **React (Vite)**
- MediaRecorder API for microphone access and audio capture
- WebSocket for real-time audio streaming and transcription events

### Backend
- **Node.js**
- WebSocket server acting as a secure proxy
- Deepgram API integration (API key never exposed to frontend)

### Speech-to-Text
- **Deepgram Real-Time Speech-to-Text API**
- Streaming Opus-encoded audio for low-latency transcription

### Desktop Platform
- **Tauri**
- Lightweight, secure alternative to Electron
- Cross-platform support (Windows, macOS, Linux)

---

## Core Features Implemented

### 1. Push-to-Talk Voice Input
Users can start and stop voice recording using a single push-to-talk button, following an intuitive and familiar interaction pattern.

### 2. Microphone Access & Audio Capture
The app requests system microphone permissions and captures high-quality audio using the MediaRecorder API.

### 3. Real-Time Transcription
Audio is streamed to Deepgram in real time via a backend WebSocket proxy, enabling low-latency speech recognition.

### 4. Display & Edit Transcribed Text
Transcribed text is displayed in an editable textarea, allowing users to:
- Modify the text
- Correct transcription errors
- Copy the final result

### 5. Recording Controls & Visual Feedback
Clear start/stop controls indicate the current recording state and provide immediate feedback to the user.

### 6. Error Handling
The application gracefully handles common failure cases:
- Microphone permission denial
- Network connectivity issues
- Backend or transcription service errors

Errors are shown only when appropriate and do not trigger false warnings during normal recording lifecycle events.

---

## Architecture & Design Decisions


- **UI Layer** handles user interaction and presentation
- **Audio Layer** handles microphone access and streaming
- **Transcription Layer** handles real-time transcription events
- **Backend Layer** securely integrates with Deepgram

This modular design makes the codebase easy to understand, debug, and extend.

---

## Why Tauri?

Tauri was chosen to provide:
- Native desktop windowing
- Smaller bundle size than Electron
- Better security model
- Cross-platform compatibility

The application logic was intentionally developed and tested in the browser first, then wrapped with Tauri.  
This ensures that the core functionality is reliable and independent of the desktop container.

---

## Development Priorities

### Focused On
- Core user workflow
- Clean, maintainable architecture
- Reliable audio capture and streaming
- Accurate real-time transcription
- Clear separation of concerns

### Intentionally Not Focused On
- Pixel-perfect UI replication
- Advanced styling or animations
- Complex state management patterns
- Production-level optimization

A working, well-structured prototype was prioritized over visual polish.

---

## Known Limitations

- No global hotkey support (can be added using Tauri APIs)
- No system tray or background mode
- UI styling kept minimal by design

These features were excluded to keep the focus on core functionality and architecture.

---



## 🎨 Styling
The project uses custom CSS variables for easy theming. You can find these at the top of `client/src/App.css`. The primary color is a vivid purple (`#8b5cf6`) to give it that AI-first premium feel.

---

## 📄 License
MIT License - Feel free to use this for your own projects!

---
## How to Run This Project on a New Device

Follow the steps below to set up and run the project on any new machine.

---

### 1️⃣ Copy the Project

- Download or clone the project repository to your local machine
- Extract the ZIP file (if downloaded)
- Open the project folder in a terminal or VS Code

> Ensure that `node_modules` folders are not present before installation.

---

### 2️⃣ Create Environment Variables

Inside the `server` folder, create a file named `.env`:

```env
DEEPGRAM_API_KEY=YOUR_DEEPGRAM_API_KEY_HERE

```
### 3️⃣ Install Dependencies
Backend
cd server
npm install

Frontend
cd client
npm install

4️⃣ Start the Backend Server
cd server
npm run dev


The backend WebSocket server will start on:

ws://localhost:3001

5️⃣ Run the Frontend (Browser Mode)
cd client
npm run dev


Open the application in your browser at:

http://localhost:5173

---

Final Notes
This project demonstrates:

Real-time audio streaming

Secure AI service integration

Clean frontend-backend separation

Cross-platform desktop deployment
