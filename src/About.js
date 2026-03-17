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
      <section className="flex flex-col items-center w-full mt-10">
        <div className="bg-zinc-900/80 rounded-lg shadow-lg p-8 w-full max-w-xl flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-4 text-zinc-200 text-center">
            About Me
          </h1>
          <p className="text-zinc-300 leading-relaxed">
            Former galactic war hero. Former potato. Current developer and
            occasional artist. Life takes weird turns. I built this site myself
            because after years of repairing servitors, building ferrocrete
            pipelines, and generally fixing things the custodes broke, web
            development seemed like a relaxing hobby. Turns out debugging
            JavaScript is still less frustrating than politics in the Capitol.
            <br />
            <br />
            Most of my life has been engineering. If something explodes, stalls,
            or refuses to cooperate, I take it apart and rebuild it until it
            works. That approach applied pretty well to Machine Spirits. It
            works decently for websites too.
            <br />
            <br />
            The art on this site comes from a habit I’ve had for a long time:
            staring at random patterns until faces appear in them. Apparently
            this is called warp psychosis. Personally I blame years of
            interstellar travel and staring into starfields.
            <br />
            <br />
            A few things you should know about me: I built my first boltgun at
            12. I used to pilot starfighters in a major galactic war. I have
            extremely strong opinions about sand. I’m very good at fixing
            augmetic limbs. These days I mostly write code, build things, and
            post strange images of the things I see when I turn off the gellar
            field.
            <br />
            <br />
            If you see a face in one of the images, great. If you don’t see it
            yet, keep looking. Trust me. It's there, watching you.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
