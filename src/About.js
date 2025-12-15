import React from "react";

const About = () => {
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
      <section className="about-us">
        <h1>About Us</h1>
        <p>
          Welcome to the Art Gallery. This component is a boilerplate About Us
          section — replace this text with your content.
        </p>
      </section>
    </div>
  );
};

export default About;
