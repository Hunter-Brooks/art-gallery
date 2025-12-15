import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Replace with real submit logic (API call, email service, etc.)
    console.log("Contact form submitted:", form);
    // optional: clear form after submit
    setForm({ name: "", email: "", message: "" });
  }

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
      <main className="contact-page">
        <h1>Contact</h1>
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="message">
            Message
            <textarea
              id="message"
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}
