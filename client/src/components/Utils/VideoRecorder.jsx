// VideoRecorder.jsx

import React, { useState, useRef } from "react";
import { toast } from "react-toastify";

const VideoRecorder = ({
  setRecordedURL,
  setIsRecordedAvailable,
  setVideo,
  setError,
  setIsCamera,
  setIsRecordingLive,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [streaming, setStreaming] = useState([]);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setIsCamera(false);
        toast.error(
          "Not able to access recording device, please update record through the other option"
        );
        console.error("getUserMedia is not supported in this browser");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      // console.log(stream);
      videoRef.current.srcObject = stream;
      setStreaming(stream);
      // console.log(stream);
      const mediaRecorder = new MediaRecorder(stream);
      console.log(mediaRecorder);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const timestamp = new Date().toISOString(); // Get current timestamp
        const fileName = `recording-${timestamp}.webm`;
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const file = new File([blob], fileName, { type: "video/webm" });
        setVideo({ file: file });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);

        setRecordedURL(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsRecordingLive(true);
    } catch (error) {
      setError(
        "Not able to access recording device, please update record through the other option. "
      );
      // toast.error()
      console.error("Error accessing media devices:", error);
      setIsCamera(false);
    }
  };
  console.log(streaming);
  // console.log(videoRef.current);

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    // Assume stream is the variable that holds the stream object
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;

    setIsRecording(false);
    setIsRecordedAvailable(true);
    setIsRecordingLive(false);
    // mediaRecorderRef.current = null
    // streaming.getTracks().forEach(function(track) {
    //   track.stop();
    // });
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted playsInline />
      <div>
        {!isRecording ? (
          <button
            className="focus-visible:outline-none  text-white text-[13px] px-4 py-1 rounded bg-[green]"
            type="button"
            onClick={startRecording}
          >
            Start Recording
          </button>
        ) : (
          <button
            className="focus-visible:outline-none  text-white text-[13px] px-4 py-1 rounded bg-[#410d0d]"
            type="button"
            onClick={stopRecording}
          >
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
