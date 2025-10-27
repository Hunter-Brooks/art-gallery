import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ArtGalleryApp() {
  const [selected, setSelected] = useState(null);

  const artworks = [
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/1.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/2.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/3.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/4.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/5.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/6.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/7.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/8.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/9.PNG",
    },
    {
      title: "Ethereal Skies",
      description: "A dreamy blend of pastel clouds and starlight.",
      image: process.env.PUBLIC_URL + "/art/10.PNG",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-100 text-white flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">Hunter Brooks Art</h1>
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
      </header>
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Hunter Brooks Art Gallery
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {artworks.map((art, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelected(art)}
          >
            <div className="overflow-hidden bg-zinc-800 cursor-pointer hover:shadow-xl transition-all rounded-2xl">
              <div className="p-0">
                <img
                  src={art.image}
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

      {selected && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 rounded-2xl p-6 max-w-3xl w-full shadow-lg relative"
          >
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-[70vh] object-contain rounded-xl mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{selected.title}</h2>
            <p className="text-zinc-400 mb-4">{selected.description}</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-2 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      <footer className="mt-12 text-zinc-500 text-sm flex items-center gap-2">
        <ImageIcon size={16} />
        <span>© {new Date().getFullYear()} Hunter Brooks</span>
      </footer>
    </div>
  );
}
