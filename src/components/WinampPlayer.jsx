// WinampPlayer component: retro-styled audio player for the gallery
import React, { useEffect, useState, useRef } from "react";
import "./WinampPlayer.css";
// Number of bars in the equalizer
const NUM_BARS = 24;

// Main WinampPlayer component
export default function WinampPlayer({ dimmed }) {
  const canvasRef = useRef();
  const animationRef = useRef();
  const analyserRef = useRef();
  const audioCtxRef = useRef();
  const audioRef = useRef();
  const [eqReady, setEqReady] = useState(false);

  // Setup Web Audio API for equalizer visualization only after play is pressed
  useEffect(() => {
    if (!eqReady || !audioRef.current) return;
    let ctx, analyser, src;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioCtxRef.current = ctx;
    analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyserRef.current = analyser;
    src = ctx.createMediaElementSource(audioRef.current);
    src.connect(analyser);
    analyser.connect(ctx.destination);

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx2d = canvas.getContext("2d");
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      // Center the bars in the canvas
      const gap = 2; // gap between bars
      const barWidth = (canvas.width - gap * (NUM_BARS - 1)) / NUM_BARS;
      const totalBarsWidth = NUM_BARS * barWidth + (NUM_BARS - 1) * gap;
      const xOffset = (canvas.width - totalBarsWidth) / 2;
      for (let i = 0; i < NUM_BARS; i++) {
        // Calculate the range of bins for this bar
        const start = Math.floor((i / NUM_BARS) * bufferLength);
        const end = Math.floor(((i + 1) / NUM_BARS) * bufferLength);
        let sum = 0;
        let count = 0;
        for (let j = start; j < end; j++) {
          sum += dataArray[j];
          count++;
        }
        const value = count > 0 ? sum / count : 0;
        // Scale down the first 3 bars and boost the last 5 bars for visual balance
        let scale = 1;
        if (i === 0) scale = 0.5;
        else if (i === 1) scale = 0.7;
        else if (i === 2) scale = 0.85;
        else if (i >= NUM_BARS - 5) {
          // Gradually increase scale for the last 5 bars
          const boost = [1.2, 1.3, 1.4, 1.5, 1.6];
          scale = boost[i - (NUM_BARS - 5)];
        }
        const barHeight = (value / 255) * canvas.height * scale;
        ctx2d.fillStyle = `hsl(${120 - (value / 255) * 120}, 100%, 60%)`;
        const x = xOffset + i * (barWidth + gap);
        ctx2d.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      }
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (src) src.disconnect();
      if (analyser) analyser.disconnect();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [eqReady]);
  // State for the list of tracks loaded from playlist.json
  const [tracks, setTracks] = useState([]);
  // State for the current track index
  const [current, setCurrent] = useState(0);
  // State for play/pause (starts paused)
  const [playing, setPlaying] = useState(false);
  // State for volume (0.0 to 1.0), default to 0.25 (25%)
  const [volume, setVolume] = useState(0.25);

  // On mount, fetch the playlist and set tracks
  useEffect(() => {
    fetch("/audio/playlist.json")
      .then((res) => res.json())
      .then((data) => {
        setTracks(data.tracks);
        // Start on a random track if available
        if (data.tracks && data.tracks.length > 0) {
          setCurrent(Math.floor(Math.random() * data.tracks.length));
        }
      });
  }, []);

  // Ensure audio element starts at correct volume on mount and when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    // eslint-disable-next-line
  }, [current, tracks]);

  // Play or pause audio when state changes
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        // Start equalizer if not already started
        if (!eqReady) setEqReady(true);
        audioRef.current.play().catch(() => {}); // Ignore play errors
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing, current, tracks, eqReady]);

  // Set audio volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Go to next track (wraps around)
  const nextTrack = () => setCurrent((c) => (c + 1) % tracks.length);
  // Go to previous track (wraps around)
  const prevTrack = () =>
    setCurrent((c) => (c - 1 + tracks.length) % tracks.length);

  // If no tracks loaded, render nothing
  if (!tracks.length) return null;

  // Render the Winamp player UI
  return (
    <div className={`winamp-player${dimmed ? " winamp-player-dimmed" : ""}`}>
      {/* Audio element for playback */}
      <audio ref={audioRef} src={tracks[current].url} onEnded={nextTrack} />
      <div className="winamp-ui">
        {/* Top bar with title */}
        <div className="winamp-topbar">
          <span className="winamp-dot" />
          <span className="winamp-title">Winamp Player</span>
        </div>
        {/* Display current track title */}
        <div className="winamp-screen">
          <span style={{ fontWeight: "bold" }}>{tracks[current].title}</span>
        </div>
        <div className="winamp-controls">
          <button onClick={prevTrack} title="Previous">
            ⏮️
          </button>
          <button onClick={() => setPlaying(!playing)} title="Play/Pause">
            {playing ? "⏸️" : "▶️"}
          </button>
          <button onClick={nextTrack} title="Next">
            ⏭️
          </button>
        </div>
        {/* Volume control slider */}
        <div
          className="winamp-volume"
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <label htmlFor="winamp-volume-slider" style={{ fontSize: 12 }}>
            🔊 Volume
          </label>
          <input
            id="winamp-volume-slider"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: 100 }}
          />
          <span style={{ fontSize: 12 }}>{Math.round(volume * 100)}%</span>
        </div>
        {/* Equalizer visualization */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "8px 0 0 0",
          }}
        >
          <canvas
            ref={canvasRef}
            width={192}
            height={32}
            style={{
              background: "#181c22",
              borderRadius: 4,
              border: "1.5px inset #0ff",
              boxShadow: "0 0 8px #0ff4 inset",
            }}
          />
        </div>
      </div>
    </div>
  );
}
