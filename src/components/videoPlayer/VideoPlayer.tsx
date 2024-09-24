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
  const togglePlay = () => {
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
  const toggleMiniPlayer = () => {
    if (videoContainerRef.current) {
      if (videoContainerRef.current.classList.contains("mini-player")) {
        document.exitPictureInPicture();
      } else {
        videoRef.current?.requestPictureInPicture();
      }
    }
  };
  const toggleTheater = () => {
    if (videoContainerRef.current) {
      videoContainerRef.current.classList.toggle("theater");
    }
  };
  const toggleFullScreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement == null) {
        videoContainerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };
  const handleFullScreenStatus = () => {
    if (videoContainerRef.current)
      // ? like this we are adding the full-screen only if a fullscreen element exists
      videoContainerRef.current.classList.toggle(
        "full-screen",
        document.fullscreenElement ? true : false
      );
  };
  const handlePlayerStatus = (e: Event) => {
    if (videoRef.current) {
      // ? like this we are adding the paused only if a videoRef is paused
      videoContainerRef.current?.classList.toggle(
        "paused",
        videoRef.current.paused
      );
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tagName = document.activeElement?.tagName.toLowerCase();
      // ? like this while we are interacting with an input element we wont interrupt with our hotkeys
      if (tagName === "input" || tagName === "button") return;
      if (videoRef.current) {
        const video = videoRef.current;
        const keyCode = e.code;

        switch (keyCode.toLowerCase()) {
          case "arrowdown":
            setVolume((prev) => (prev <= 0.1 ? (prev = 0) : prev - 0.1));
            break;
          case "arrowup":
            setVolume((prev) => (prev < 0.9 ? prev + 0.1 : 1));
            break;
          // case "keyk":
          case "space":
            togglePlay();
            break;
          case "keyf":
            toggleFullScreen();
            break;
          case "keyi":
            toggleMiniPlayer();
            break;
          case "keyt":
            toggleTheater();
            break;
          case "escape":
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

    document.addEventListener("fullscreenchange", handleFullScreenStatus);

    videoRef.current?.addEventListener("enterpictureinpicture", () => {
      videoContainerRef.current?.classList.add("mini-player");
    });
    videoRef.current?.addEventListener("leavepictureinpicture", () => {
      videoContainerRef.current?.classList.remove("mini-player");
    });

    return () => {
      videoRef.current?.removeEventListener("play", handlePlayerStatus);
      videoRef.current?.removeEventListener("pause", handlePlayerStatus);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullScreenStatus);
    };
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
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
            className="play-pause-btn"
            onClick={togglePlay}
          >
            <PlayIcon />
          </button>

          <button
            className="mini-player-btn"
            onClick={toggleMiniPlayer}
          >
            <MiniPlayerIcon />
          </button>
          <button
            className="theater-btn"
            onClick={toggleTheater}
          >
            <TheaterIcon />
          </button>
          <button
            className="full-screen-btn"
            onClick={toggleFullScreen}
          >
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