/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomBtnComponent from "../Button/CustomBtnComponent";

export default function TextToVoiceComponent({ text }) {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);
    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        margin: "20px 0",
      }}
    >
      <CustomBtnComponent
        onClick={handlePlay}
        icon={<i className="fas fa-play"></i>}
        text="Play"
        style={{
          backgroundColor: isPaused ? "#007bff" : "#fff",
          color: isPaused ? "#fff" : "#007bff",
        }}
      />

      <CustomBtnComponent
        onClick={handlePause}
        icon={<i className="fas fa-pause"></i>}
        text="Pause"
        style={{
          backgroundColor: isPaused ? "#fff" : "#007bff",
          color: isPaused ? "#007bff" : "#fff",
        }}
      />

      <CustomBtnComponent
        onClick={handleStop}
        icon={<i className="fas fa-stop"></i>}
        text="Stop"
        style={{
          backgroundColor: isPaused ? "#fff" : "#007bff",
          color: isPaused ? "#007bff" : "#fff",
        }}
      />
    </div>
  );
}
