/**
 * audio.js - Audio Capture and Streaming Management
 * 
 * This module handles microphone access and uses the MediaRecorder API
 * to stream audio data chunks to the transcription WebSocket.
 */

/**
 * startAudioStream - Requests microphone access and begins streaming chunks.
 * @param {WebSocket} ws - The active WebSocket instance to send audio data to.
 */
export async function startAudioStream(ws) {
  // 1. Request microphone permission from the user
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  // 2. Initialize MediaRecorder with the standard Opus codec used for voice
  const recorder = new MediaRecorder(stream, {
    mimeType: "audio/webm;codecs=opus",
  });

  /**
   * ondataavailable - Triggered every 250ms with a new audio chunk.
   */
  recorder.ondataavailable = (event) => {
    // Only send data if the WebSocket is open and we actually have audio data
    if (
      ws?.readyState === WebSocket.OPEN &&
      event.data.size > 0
    ) {
      ws.send(event.data);
    }
  };

  // 3. Start the recorder, capturing audio in 250ms "slices"
  recorder.start(250);

  return { recorder, stream };
}

/**
 * stopAudioStream - Gracefully stops the microphone and recording.
 * @param {MediaRecorder} recorder - The recorder instance to stop.
 * @param {MediaStream} stream - The mic stream to release.
 */
export function stopAudioStream(recorder, stream) {
  // Stop the recorder
  recorder?.stop();
  
  // Explicitly turn off the microphone hardware (removes the "mic in use" browser icon)
  stream?.getTracks().forEach((t) => t.stop());
}
