import Gallery from "./Gallery";
import About from "./About";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact";

export default function ArtGalleryApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
