import React, { useEffect, useRef, useState } from "react";
import "./videoPlayer.css";
import {
  FullScreenIcon,
  MiniPlayerIcon,
  PauseIcon,
  PlayIcon,
  TheaterIcon,
} from "@/svg/icons";

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [volume, setVolume] = useState(1);

  const [isPlaying, setIsPlaying] = useState(false);

  const [videoContainerClass, setVideoContainerClass] = useState(
    "video-container paused"
  );
  const playToggle = () => {
    if (videoRef.current != null) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        // setVideoContainerClass("video-container");
      } else {
        videoRef.current.pause();
        // setVideoContainerClass((prev) => prev + " paused");
      }
    }
  };
  const toggleTheater = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.classList.toggle("theater");
      console.log("TOGGLED");
    }
  };
  const toggleFullScreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.classList.toggle("fullscreen");
        videoContainerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };
  const handlePlayerStatus = () => {
    if (videoRef.current) {
      videoContainerRef.current?.classList.toggle("paused");
      console.log(videoRef.current.paused);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (videoRef.current) {
        const video = videoRef.current;
        const keyCode = e.code;

        switch (keyCode.toLowerCase()) {
          case "arrowdown":
            setVolume((prev) => (prev <= 0.1 ? (prev = 0) : prev - 0.1));
            console.log("Volume down");
            break;
          case "arrowup":
            setVolume((prev) => (prev < 0.9 ? prev + 0.1 : 1));
            console.log("Volume up");
            break;
          case "keyk":
          case "space":
            console.log("pause/play");
            break;
          case "keyf":
            toggleFullScreen();
            break;
          case "keyi":
            toggleTheater();
            break;
          default:
            console.log(keyCode);
            break;
        }
      }
    };

    videoRef.current?.addEventListener("play", handlePlayerStatus);
    videoRef.current?.addEventListener("pause", handlePlayerStatus);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      videoRef.current?.removeEventListener("play", handlePlayerStatus);
      videoRef.current?.removeEventListener("pause", handlePlayerStatus);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      console.log("Volume", videoRef.current.volume);
    }
  }, [volume]);
  return (
    <div
      ref={videoContainerRef}
      className={videoContainerClass}
    >
      <div className="video-controls-container">
        <div className="timeline-container"></div>
        <div className="controls">
          <button
            className="play-pause-btn play-icon"
            onClick={playToggle}
          >
            <PlayIcon />
          </button>
          <button
            className="play-pause-btn paused-icon"
            onClick={playToggle}
          >
            <PauseIcon />
          </button>
          <button className="mini-player-btn">
            <MiniPlayerIcon />
          </button>
          <button className="theater-btn">
            <TheaterIcon />
          </button>
          <button className="full-screen-btn">
            <FullScreenIcon />
          </button>
        </div>
      </div>
      <video
        ref={videoRef}
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
      />
    </div>
  );
}

export default VideoPlayer;
