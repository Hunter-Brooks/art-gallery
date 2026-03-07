// Animated starfield background component
import React, { useRef, useEffect } from "react";
import "./Starfield.css";

// Number of stars to render
const STAR_COUNT = 200;
// Speed at which stars move horizontally
const STAR_SPEED = 0.2;
// Parallax effect factor for vertical movement on scroll
const STAR_PARALLAX = 0.4;

// Utility function to get a random number between min and max
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// Main Starfield component
const Starfield = () => {
  // Ref to the canvas DOM element
  const canvasRef = useRef(null);
  // Ref to the array of star objects
  const stars = useRef([]);
  // Ref to track last scroll position for parallax
  const lastScrollY = useRef(window.scrollY);

  // Effect to initialize and animate the starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    // Set canvas size to window size
    canvas.width = width;
    canvas.height = height;

    // Initialize stars with random positions, radii, and depths
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      radius: randomBetween(0.5, 1.8),
      depth: randomBetween(0.2, 1),
    }));

    // Draw all stars on the canvas
    function drawStars() {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.fillStyle = "white";
      for (const star of stars.current) {
        ctx.globalAlpha = star.depth; // Dimmer stars appear further away
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
      }
      ctx.restore();
    }

    // Animate stars by moving them horizontally and redrawing
    function animate() {
      for (const star of stars.current) {
        star.x += STAR_SPEED * star.depth; // Move faster if closer (higher depth)
        if (star.x > width) star.x = 0; // Wrap around when off screen
      }
      drawStars();
      requestAnimationFrame(animate);
    }

    // Handle window resize: update canvas size and reposition stars
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Reposition stars within new bounds
      for (const star of stars.current) {
        star.x = randomBetween(0, width);
        star.y = randomBetween(0, height);
      }
    }

    function handleScroll() {
      const deltaY = window.scrollY - lastScrollY.current;
      for (const star of stars.current) {
        star.y += deltaY * STAR_PARALLAX * (1 - star.depth);
        if (star.y > height) star.y = 0;
        if (star.y < 0) star.y = height;
      }
      lastScrollY.current = window.scrollY;
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    animate();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="starfield-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default Starfield;
