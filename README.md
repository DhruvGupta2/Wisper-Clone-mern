# 🎙️ WISPR Clone - Real-time AI Transcription

A professional-grade, real-time voice-to-text application inspired by WISPR. This project uses React for the frontend and a Node.js proxy server to stream audio directly to the Deepgram AI transcription service.

---

## ✨ Features

- **Real-time Transcription**: See your words appear instantly as you speak.
- **Push-to-Talk Interface**: A modern, circular button with smooth ripple animations for recording.
- **Glassmorphism UI**: A premium, production-ready dark theme with background blurs and refined typography.
- **Live Editing**: Edit the transcribed text directly in the app before copying it.
- **Smart Feedback**: Instant "Copied!" feedback when saving text to your clipboard.
- **Responsive Layout**: Designed to fit perfectly in your browser window.

---

## 🏗️ Project Structure

The codebase is split into two main parts:

### 1. Client (`/client`)
Built with **React** and **Vite**.
- `App.jsx`: The heart of the UI. Manages recording states and displays transcripts.
- `audio.js`: Handles microphone access and streams audio chunks in `opus` format.
- `ws.js`: Manages the WebSocket connection to the backend server.
- `App.css`: Contains the professional "WISPR" styling and animations.

### 2. Server (`/server`)
A lightweight **Node.js** proxy server.
- `index.js`: Acts as a bridge. It receives audio from the browser and forwards it to Deepgram.
- `deepgram.js`: Configures the connection to Deepgram using the `nova-2` model for high accuracy.
- `test.js`: A utility script to test backend connectivity independently.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A [Deepgram API Key](https://console.deepgram.com/) (Free tier available).

### 1. Setup the Server
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` root and add your key:
   ```env
   DEEPGRAM_API_KEY=your_actual_api_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 2. Setup the Client
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to the URL shown (usually `http://localhost:5173`).

---

## 🛠️ How it Works (The Technical Bit)

1. **Audio Capture**: When you click the microphone, the browser requests mic access. We capture audio in small 250ms "chunks" to ensure low latency.
2. **WebSocket Streaming**: These audio chunks are sent over a WebSocket to our Node.js server. 
3. **AI Processing**: The server immediately forwards the audio to Deepgram's `nova-2` model.
4. **Live Feedback**: Deepgram sends back JSON data containing the transcribed text. Our server forwards this to the React app, which updates the UI in real-time.
5. **Finalization**: When you stop recording, we send a "CloseStream" signal to Deepgram to get the most accurate final version of your speech.

---

## 🎨 Styling
The project uses custom CSS variables for easy theming. You can find these at the top of `client/src/App.css`. The primary color is a vivid purple (`#8b5cf6`) to give it that AI-first premium feel.

---

## 📄 License
MIT License - Feel free to use this for your own projects!


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

3️⃣ Install Dependencies
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
