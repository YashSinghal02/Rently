import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent 🚀");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white dark:bg-[#0b0f1a] text-black dark:text-white rounded-2xl">

      {/* ================= CONTACT SECTION ================= */}
      <section className="min-h-screen px-6 py-32 rounded-2xl">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              Get in{" "}
              <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                touch
              </span>
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
              Have questions or need help with your booking? Our team is always
              ready to assist you with the best experience.
            </p>

            {/* CONTACT INFO */}
            <div className="space-y-5 pt-4">

              <div className="flex items-center gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition">
                <Mail className="text-violet-500" />
                <span>support@rently.com</span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition">
                <Phone className="text-violet-500" />
                <span>+91 1234 54639</span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition">
                <MapPin className="text-violet-500" />
                <span>Dehradun, India</span>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="p-8 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">

            <h2 className="text-2xl font-semibold mb-6">
              Send a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:border-violet-500"
                />
                <label className="absolute left-4 top-2 text-sm text-zinc-500 dark:text-zinc-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                  Your name
                </label>
              </div>

              {/* EMAIL */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:border-violet-500"
                />
                <label className="absolute left-4 top-2 text-sm text-zinc-500 dark:text-zinc-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                  Your email
                </label>
              </div>

              {/* MESSAGE */}
              <div className="relative">
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 pt-6 pb-2 focus:outline-none focus:border-violet-500"
                />
                <label className="absolute left-4 top-2 text-sm text-zinc-500 dark:text-zinc-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                  Your message
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white hover:scale-[1.02] active:scale-[0.98] transition shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)]"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h2 className="text-3xl font-semibold">
              Our{" "}
              <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                location
              </span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Visit us at our office or find us on the map below.
            </p>
          </div>

          {/* MAP CARD */}
          <div className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Dehradun&output=embed"
              className="w-full h-[400px]"
              loading="lazy"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}