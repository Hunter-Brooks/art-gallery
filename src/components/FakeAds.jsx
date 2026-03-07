import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const FakeAds = () => {
  const [ads, setAds] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const hasSpawned = useRef(false);

  const [adTexts, setAdTexts] = useState([]);

  React.useEffect(() => {
    axios
      .get("/ads.json")
      .then((res) => {
        setAdTexts(res.data);
      })
      .catch((err) => {
        setAdTexts([]);
      });
  }, []);

  function getRandomAdText() {
    if (!adTexts || adTexts.length === 0) return "";
    return adTexts[Math.floor(Math.random() * adTexts.length)];
  }

  function getRandomAdImage() {
    return `https://picsum.photos/160/600?random=${Math.floor(Math.random() * 100000)}`;
  }

  // spawnAd and prompt are not used, so removed to clean up code

  // Spawn 1 ad on adTexts load
  React.useEffect(() => {
    if (!hasSpawned.current && adTexts && adTexts.length > 0) {
      hasSpawned.current = true;
      const adText = adTexts[Math.floor(Math.random() * adTexts.length)];
      const imageUrl = getRandomAdImage();
      setAds([{ id: Date.now(), imageUrl, text: adText }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adTexts]);

  const clickAd = () => {
    setShowPopup(true);
    setAds([]); // Remove all ads when popup is shown
    setTimeout(() => setShowPopup(false), 2000);
  };

  // closeAd is not used, so removed to clean up code

  return (
    <>
      {/* Ads */}
      <AnimatePresence>
        {ads.map((ad) => (
          <motion.div
            key={ad.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute border-4 border-black p-2 cursor-pointer z-50 shadow-lg bg-yellow-300 top-[10%] right-6"
            onClick={clickAd}
            style={{
              width: "240px", // 50% wider than 160px
              minHeight: "600px",
              right: "60px", // move left from right edge
            }}
          >
            <div className="relative w-full h-[600px] flex items-center justify-center">
              <img
                src={ad.imageUrl}
                alt="ad"
                className="absolute inset-0 w-full h-full object-cover z-0"
                crossOrigin="anonymous"
                onLoad={(e) => {
                  console.log("Image loaded:", ad.imageUrl);
                }}
                onError={(e) => {
                  console.error("Image failed to load:", ad.imageUrl);
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="block font-extrabold text-red-600 drop-shadow-lg text-center select-none mb-4 w-full px-2 max-w-full break-words"
                  style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1.1 }}
                >
                  {ad.text}
                </span>
              </div>
            </div>
            <span className="block w-full text-xl text-blue-700 underline cursor-pointer animate-pulse select-none text-center mt-2">
              Click here!
            </span>
            <button
              // X button is now inert and stops propagation
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold opacity-60 cursor-not-allowed"
              onClick={(e) => e.stopPropagation()}
            >
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Popup on click */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white p-8 rounded text-center z-[60] font-bold text-2xl"
          >
            fuck ads
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FakeAds;
