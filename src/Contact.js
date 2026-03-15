// Contact page component for the art gallery
import React, { useState } from "react";

// Main Contact component
export default function Contact() {
  // State to hold form field values
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes for all form fields
  function handleChange(e) {
    const { name, value } = e.target;
    // Update the corresponding field in the form state
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior
    // Here you would add real submit logic (API call, email service, etc.)
    console.log("Contact form submitted:", form);
    // Optionally clear the form after submit
    setForm({ name: "", email: "", message: "" });
  }

  // Render the contact page UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-100 text-white flex flex-col items-center p-6">
      {/* Page header with navigation links */}
      <header className="w-full flex justify-between items-center p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">Hunter Brooks Art</h1>
        <nav className="flex gap-4 text-zinc-400">
          <a href="gallery" className="hover:text-white">Gallery</a>
          <a href="about" className="hover:text-white">About</a>
          <a href="contact" className="hover:text-white">Contact</a>
        </nav>
      </header>
      <main className="flex flex-col items-center w-full mt-10">
        <h1 className="text-3xl font-bold mb-6 text-zinc-200">Contact</h1>
        {/* Contact form for user input */}
        <form onSubmit={handleSubmit} className="bg-zinc-900/80 rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6" noValidate>
          <label htmlFor="name" className="flex flex-col text-zinc-300">
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Baby Fark McGee-zax"
              className="mt-1 p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-blue-400 focus:outline-none"
            />
          </label>

          <label htmlFor="email" className="flex flex-col text-zinc-300">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Baby-Fark.McGee-zax@Spacecash.com"
              className="mt-1 p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-blue-400 focus:outline-none"
            />
          </label>

          <label htmlFor="message" className="flex flex-col text-zinc-300">
            Message
            <textarea
              id="message"
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="I mean how STUPID is your species? Spacejail? Baby Fark McGee-zax?"
              className="mt-1 p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:border-blue-400 focus:outline-none resize-none"
            />
          </label>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition">Send</button>
        </form>
      </main>
    </div>
  );
}
