// Import React and hooks for state and lifecycle management
import React, { useEffect, useState } from "react";
// Import motion for animation effects
import { motion } from "framer-motion";
// Import an icon for the footer
import { ImageIcon } from "lucide-react";
// Import a fake ads component for fun/decoration
import FakeAds from "./components/FakeAds";

// Main gallery component, displays artwork grid and modal, handles cat easter egg
export default function Gallery({ setArtworkModalOpen }) {
  // Windows Vista-style scrollbar CSS
  const vistaScrollbarStyle = `
      .vista-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #7ecbff #e0f4ff;
      }
      .vista-scrollbar::-webkit-scrollbar {
        width: 16px;
        background: #e0f4ff;
        border-left: 1px solid #b0d8f8;
        box-shadow: 0 0 6px #b0d8f8 inset;
      }
      .vista-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #e0f4ff 0%, #b3e0ff 30%, #7ecbff 70%, #4fa3e3 100%);
        border-radius: 8px;
        border: 2px solid #f8fcff;
        box-shadow:
          0 1px 2px #fff inset,
          0 -1px 2px #7ecbff88 inset,
          0 2px 8px #b0d8f8;
        outline: 1px solid #7ecbff;
      }
      .vista-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #c6eaff 0%, #7ecbff 100%);
        box-shadow:
          0 2px 6px #a0d8ff,
          0 1px 2px #fff inset,
          0 -1px 2px #7ecbff88 inset;
      }
      .vista-scrollbar::-webkit-scrollbar-thumb:active {
        background: linear-gradient(180deg, #7ecbff 0%, #e0f4ff 100%);
        box-shadow:
          0 1px 2px #fff inset,
          0 -1px 2px #7ecbff88 inset,
          0 2px 8px #b0d8f8;
      }
      .vista-scrollbar::-webkit-scrollbar-track {
        background: linear-gradient(180deg, #f8fcff 0%, #e0f4ff 100%);
        border-radius: 8px;
        box-shadow: 0 1px 4px #b0d8f8 inset;
      }
      .vista-scrollbar::-webkit-scrollbar-corner {
        background: #e0f4ff;
      }
    `;

  // Inject Vista scrollbar style on mount
  useEffect(() => {
    if (!document.getElementById("vista-scrollbar-style")) {
      const style = document.createElement("style");
      style.id = "vista-scrollbar-style";
      style.innerHTML = vistaScrollbarStyle;
      document.head.appendChild(style);
    }
  }, []);
  // Index of selected artwork for modal, or null if none selected
  const [selected, setSelected] = useState(null);

  // Effect: Notify parent if modal is open/closed (for accessibility, overlays, etc)
  useEffect(() => {
    if (typeof setArtworkModalOpen === "function") {
      setArtworkModalOpen(selected !== null);
    }
  }, [selected, setArtworkModalOpen]);

  // List of artworks loaded from JSON
  const [artworks, setArtworks] = useState([]);

  // List of active cat animations (easter egg), each with unique id and direction
  const [cats, setCats] = useState([]);

  // Spawns a new cat animation in a random direction
  // Called when the secret cat button is clicked
  const spawnCat = () => {
    console.log("spawnCat called");
    // Possible directions for cat to move
    const directions = ["left", "right", "top", "bottom"];
    // Pick a random direction
    const dir = directions[Math.floor(Math.random() * directions.length)];
    // Add a new cat object with unique id and direction
    setCats((prev) => [...prev, { id: Date.now(), direction: dir }]);
  };

  // Effect: Load artworks from JSON file on mount
  // Using fetch allows for easy updates to art without code changes
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/art/art.json")
      .then((response) => response.json())
      .then((data) => setArtworks(data))
      .catch((error) => console.error("Error loading artworks:", error));
  }, []);

  // Effect: Keyboard navigation for modal
  // Escape closes modal, arrows cycle through artworks
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selected === null) return; // Only active if modal is open

      if (e.key === "Escape") {
        setSelected(null); // Close modal
        console.log("Escape", selected);
      } else if (e.key === "ArrowRight") {
        // Go to next artwork, wrap to start if at end
        setSelected((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
        console.log("ArrowRight", selected);
      } else if (e.key === "ArrowLeft") {
        // Go to previous artwork, wrap to end if at start
        setSelected((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
        console.log("ArrowLeft", selected);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Cleanup: remove event listener on unmount or dependency change
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, artworks.length]);

  // The currently selected artwork object, or null if none
  const currentArtwork = selected !== null ? artworks[selected] : null;

  // Render the gallery UI
  return (
    <>
      {/* Render fake ads for  fun/decora"ion" */}
      <FakeAds />
      <div
        className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-100 text-white flex flex-col items-center pt-0 pb-6 vista-scrollbar"
        style={{ cursor: 'url("./images/pixel-cat.png") 16 16, auto' }}
      >
        {/* Header with site title and navigation links */}
        <header className="w-full flex justify-between items-center p-4 border-b border-zinc-800">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-3">
              {/* crab */}
              <img
                src="/crab.png"
                alt="Crab"
                className="w-20 h-20"
                style={{ objectFit: "contain" }}
              />
              <h1 className="text-xl font-bold">Where memes become dreams</h1>
            </div>
            <nav className="flex gap-4 text-zinc-400">
              <a href="gallery" className="hover:text-white">
                Gallery
              </a>
              <a href="about" className="hover:text-white">
                About
              </a>
              <a href="contact" className="hover:text-white">
                Contact
              </a>
            </nav>
          </div>
        </header>
        {/* Animated gallery title */}
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pure Pareidolia
        </motion.h1>

        {/* ...existing code... */}

        {/* Artwork grid: displays all artworks as cards, clicking opens modal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {artworks.map((art, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }} // Animate card on hover
              onClick={() => setSelected(i)} // Open modal for this artwork
            >
              <div className="overflow-hidden bg-zinc-800 cursor-pointer hover:shadow-xl transition-all rounded-2xl">
                <div className="p-0">
                  <img
                    src={`/art/${art.image}`}
                    alt={art.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{art.title}</h2>
                    <p className="text-zinc-400 text-sm">{art.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal: shows selected artwork in detail, with close button */}
        {selected !== null && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6"
            onClick={() => setSelected(null)} // Click outside closes modal
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 rounded-2xl p-6 max-w-3xl w-full shadow-lg relative"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
            >
              <img
                src={currentArtwork ? `/art/${currentArtwork.image}` : ""}
                alt={currentArtwork ? currentArtwork.title : ""}
                className="w-full h-[70vh] object-contain rounded-xl mb-4"
              />
              <h2 className="text-2xl font-semibold mb-2">
                {currentArtwork ? currentArtwork.title : ""}
              </h2>
              <p className="text-zinc-400 mb-4">
                {currentArtwork ? currentArtwork.description : ""}
              </p>
              <button
                onClick={() => setSelected(null)}
                className="mt-2 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg transition"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* Render all active cat animations (easter egg) */}
        {cats.map((cat) => {
          // Determine animation start/end and style based on direction
          let initial,
            animate,
            rotation = 0,
            scaleX = 1;

          if (cat.direction === "left") {
            // Cat moves left to right
            const randomY = Math.random() * window.innerHeight;
            initial = { left: "-200px", top: randomY };
            animate = { left: "100vw", top: randomY };
            rotation = 0;
            scaleX = 1;
          } else if (cat.direction === "right") {
            // Cat moves right to left (flipped horizontally)
            const randomY = Math.random() * window.innerHeight;
            initial = { left: "100vw", top: randomY };
            animate = { left: "-200px", top: randomY };
            rotation = 0;
            scaleX = -1;
          } else if (cat.direction === "top") {
            // Cat moves top to bottom (rotated)
            const randomX = Math.random() * window.innerWidth;
            initial = { left: randomX, top: "-200px" };
            animate = { left: randomX, top: "100vh" };
            rotation = 90;
          } else if (cat.direction === "bottom") {
            // Cat moves bottom to top (rotated)
            const randomX = Math.random() * window.innerWidth;
            initial = { left: randomX, top: "100vh" };
            animate = { left: randomX, top: "-200px" };
            rotation = -90;
          }

          return (
            <motion.div
              key={cat.id}
              initial={initial}
              animate={animate}
              transition={{ duration: 4, ease: "linear" }} // 4s linear animation
              onAnimationComplete={
                () => setCats((prev) => prev.filter((c) => c.id !== cat.id)) // Remove cat after animation
              }
              className="pointer-events-none fixed w-96 h-96 bg-no-repeat bg-contain"
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/pixel-cat.png)`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg) scaleX(${scaleX})`,
              }}
            />
          );
        })}

        {/* Cat button at the bottom of the page */}
        <button
          onClick={spawnCat}
          className="mb-6 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-lg shadow transition"
          title="Summon Cat"
        >
          🐱 Cat
        </button>

        {/* Footer with copyright and icon */}
        <footer className="mt-12 text-zinc-500 text-sm flex items-center gap-2">
          <ImageIcon size={16} />
          <span>© {new Date().getFullYear()} Hunter Brooks </span>
        </footer>
      </div>
    </>
  );
}
