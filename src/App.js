import Gallery from "./Gallery";
import About from "./About";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import Starfield from "./components/Starfield";
import { useState } from "react";
import WinampPlayer from "./components/WinampPlayer";

// The main app component that sets up routing and layout
export default function ArtGalleryApp() {
  // State to track if the artwork modal is open (used to dim the Winamp player)
  const [artworkModalOpen, setArtworkModalOpen] = useState(false);

  // Render the app layout
  return (
    <>
      {/* Renders the animated starfield background. Placed outside the main content for layering. */}
      <Starfield />
      {/* Main content area, positioned above the starfield. */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Define routes for different pages using React Router. */}
        <Routes>
          {/* Home and gallery routes both render the Gallery component, passing modal state setter. */}
          <Route
            path="/"
            element={<Gallery setArtworkModalOpen={setArtworkModalOpen} />}
          />
          <Route
            path="/gallery"
            element={<Gallery setArtworkModalOpen={setArtworkModalOpen} />}
          />
          {/* About and Contact pages. */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {/* WinampPlayer is always visible, positioned at the bottom left by its own CSS. */}
      <div>
        <WinampPlayer dimmed={artworkModalOpen} />
      </div>
    </>
  );
}
