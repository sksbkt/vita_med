import React, { useEffect, useRef, useState } from "react";
import "./videoPlayer.css";
import {
  Captions,
  FullScreenIcon,
  MiniPlayerIcon,
  PauseIcon,
  PlayIcon,
  TheaterIcon,
  VolumeIcon,
} from "@/svg/icons";
import { formatDuration, minDigit } from "@/helpers/time";

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const thumbnailImgRef = useRef<HTMLImageElement>(null);
  const TimeLineContainerRef = useRef<HTMLDivElement>(null);
  const speedBtnRef = useRef<HTMLButtonElement>(null);

  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCaptions, setIsCaptions] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [wasPaused, setWasPaused] = useState(false);

  const [duration, setDuration] = useState<number | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<number | undefined>(undefined);
  const [videoContainerClass, setVideoContainerClass] = useState(
    "video-container paused"
  );
  const togglePlay = () => {
    if (videoRef.current != null) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setWasPaused(false);
        // setVideoContainerClass("video-container");
      } else {
        videoRef.current.pause();
        setWasPaused(true);
        // setVideoContainerClass((prev) => prev + " paused");
      }
    }
  };
  const toggleCaptions = () => {
    setIsCaptions((prev) => !prev);
  };

  const togglePlayBackSpeed = () => {
    if (videoRef.current) {
      let newPlayBackRate = videoRef.current.playbackRate + 0.25;
      if (newPlayBackRate > 2) newPlayBackRate = 0.25;
      videoRef.current.playbackRate = newPlayBackRate;
      if (speedBtnRef.current) {
        speedBtnRef.current.textContent = `${newPlayBackRate}x`;
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
  const toggleMute = () => {
    if (videoRef.current) {
      const isMuted = videoRef.current.muted;
      videoRef.current.muted = !isMuted;
      if (videoContainerRef.current) {
        videoContainerRef.current.dataset.volumeLevel = videoRef.current.muted
          ? "muted"
          : volumeLevel();
      }
      console.log(videoRef.current.muted);
    }
  };
  const handleVolume = (value: number) => {
    setVolume(value);
    if (videoContainerRef.current) {
      videoContainerRef.current.dataset.volumeLevel = volumeLevel();
    }
  };
  const volumeLevel = () => {
    switch (true) {
      case volume > 0.4 && volume <= 1:
        return "high";
      case volume > 0 && volume <= 0.4:
        return "low";
      default:
        return "muted";
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
    if (TimeLineContainerRef.current) {
      if (videoRef.current) {
        const percent =
          videoRef.current!.currentTime / videoRef.current?.duration;
        TimeLineContainerRef.current.style.setProperty(
          "--progress-position",
          percent.toString()
        );
      }
    }
  };
  const skip = (duration: number) => {
    if (videoRef.current) videoRef.current.currentTime += duration;
  };
  const toggleScrubbing = (e: MouseEvent) => {
    e.preventDefault();
    if (TimeLineContainerRef.current) {
      const rect = TimeLineContainerRef.current.getBoundingClientRect();
      const percent =
        Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;

      // setIsScrubbing(e.button === 0);
      if (videoContainerRef.current) {
        videoContainerRef.current.classList.toggle("scrubbing", isScrubbing);
      }
      console.log(isScrubbing, e.button);

      if (videoRef.current) {
        if (isScrubbing) {
          videoRef.current.pause();
          setWasPaused(videoRef.current.paused);
          console.log("IS SCRUBING");
        } else {
          videoRef.current.currentTime = percent * videoRef.current.duration;
          console.log("IS NOT SCRUBING");

          if (wasPaused) videoRef.current.play();
        }
      }
    }
  };
  // useEffect(() => {
  //   console.log("SCRUBBING", isScrubbing);
  // }, [isScrubbing]);
  const handleTimeLineUpdate = (e: MouseEvent) => {
    if (TimeLineContainerRef.current) {
      const rect = TimeLineContainerRef.current.getBoundingClientRect();
      const percent =
        Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
      const previewImgNumber = Math.max(
        0,
        Math.floor(
          percent * videoRef.current!.duration
          // ? set number of seconds that you are using for preview images splits
          // / 10
        )
      );
      const previewImgSrc = `/videos/previewImgs/out_${minDigit(
        previewImgNumber,
        4
      )}.png`;

      TimeLineContainerRef.current.style.setProperty(
        "--preview-position",
        percent.toString()
      );

      if (previewImgRef.current) {
        previewImgRef.current.src = previewImgSrc;
      }
      if (isScrubbing) {
        e.preventDefault();
        if (thumbnailImgRef.current) {
          thumbnailImgRef.current.src = previewImgSrc;
        }

        TimeLineContainerRef.current.style.setProperty(
          "--progress-position",
          percent.toString()
        );
      }
    }
  };

  useEffect(() => {
    console.log("start");

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
          case "keyc":
            toggleCaptions();
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
          case "arrowleft":
          case "keyj":
            skip(-5);
            break;
          case "arrowright":
          case "keyl":
            skip(5);
            break;
          case "escape":
            break;
          default:
            break;
        }
      }
    };
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current!.duration);
      };
      // ? captions: disabled by default
      videoRef.current.textTracks[0].mode = "hidden";
    }
    videoRef.current?.addEventListener("play", handlePlayerStatus);
    videoRef.current?.addEventListener("pause", handlePlayerStatus);

    TimeLineContainerRef.current?.addEventListener(
      "mousemove",
      handleTimeLineUpdate
    );

    document.addEventListener("keydown", handleKeyDown);

    document.addEventListener("fullscreenchange", handleFullScreenStatus);

    TimeLineContainerRef.current?.addEventListener(
      "mousedown",
      toggleScrubbing
    );
    document.addEventListener("mouseup", (e) => {
      setIsScrubbing(false);

      if (isScrubbing) toggleScrubbing(e);
    });

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
      TimeLineContainerRef.current?.removeEventListener(
        "mousedown",
        toggleScrubbing
      );
      document.removeEventListener("mouseup", toggleScrubbing);
    };
  }, []);
  useEffect(() => {}, [isScrubbing]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
    if (videoContainerRef.current) {
      videoContainerRef.current.dataset.volumeLevel = volumeLevel();
    }
  }, [volume]);
  useEffect(() => {
    if (videoContainerRef.current) {
      videoContainerRef.current.classList.toggle("captions", isCaptions);
      if (videoRef.current) {
        videoRef.current.textTracks[0].mode = isCaptions ? "showing" : "hidden";
      }
    }
  }, [isCaptions]);
  return (
    <div
      ref={videoContainerRef}
      className={videoContainerClass}
      // data-volume-level={volumeLevel()}
    >
      <img
        className="thumbnail-img"
        ref={thumbnailImgRef}
      />
      <div className="video-controls-container">
        <div
          className="timeline-container"
          ref={TimeLineContainerRef}
        >
          <div className="timeline">
            <img
              className="preview-img"
              ref={previewImgRef}
            />
            <div className="thumb-indicator"></div>
          </div>
        </div>
        <div className="controls">
          <button
            className="play-pause-btn"
            onClick={togglePlay}
          >
            <PlayIcon />
          </button>
          <div className="volume-container">
            <button
              className="mute-btn"
              onClick={toggleMute}
            >
              <VolumeIcon />
            </button>
            <input
              value={volume}
              className="volume-slider"
              style={{
                height: 5,
                background: `linear-gradient(
                to right,
                rgb(255, 255, 255) ${100 * volume}%,
                rgba(255, 255, 255, 0.11) ${100 * volume}%
              )`,
              }}
              type="range"
              min={0}
              max={1}
              step={0.1}
              onChange={(value) =>
                handleVolume(Number(value.currentTarget.value))
              }
            />
          </div>
          <div className="duration-container">
            <div className="current-time">
              {formatDuration(currentTime ?? 0)}
            </div>
            /<div className="total-time">{formatDuration(duration ?? 0)}</div>
          </div>
          <button
            className="captions-btn"
            onClick={toggleCaptions}
          >
            <Captions />
          </button>
          <button
            ref={speedBtnRef}
            className="speed-btn wide-btn"
            onClick={togglePlayBackSpeed}
          >
            1x
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
        src="/videos/ForBiggerJoyrides.mp4"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      >
        <track
          kind="captions"
          srcLang="en"
          src="/assets/test_subs.vtt"
          default
        />
      </video>
    </div>
  );
}

export default VideoPlayer;
