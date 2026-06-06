import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import emailjs from "@emailjs/browser";

// Inline SVG icons for socials not in this lucide version
const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socials = [
  { label: "Twitter", icon: TwitterIcon, href: "https://x.com/PremMaurya723" },
  { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/premmaurya222/" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/prem-maurya-8640b5319/" },
];

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSent(true);

      setFormState({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-20 overflow-hidden"
    >
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #B600A8 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #7621B0 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-5 sm:px-8 md:px-10 lg:px-20 pt-24 sm:pt-32 md:pt-40 pb-0">
        {/* Big heading */}
        <FadeIn delay={0} y={50}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(3rem, 13vw, 160px)" }}
          >
            Let&apos;s Talk
          </h2>
        </FadeIn>

        {/* Sub-text */}
        <FadeIn delay={0.15} y={30}>
          <p
            className="text-center text-[#D7E2EA] font-light mt-6 mb-16 sm:mb-20 opacity-70"
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.25rem)" }}
          >
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </FadeIn>

        {/* Email CTA pill */}
        <FadeIn delay={0.2} y={20}>
          <div className="flex justify-center mb-20 sm:mb-28">
            <a
              href="mailto:premmaurya537@gmail.com"
              className="group flex items-center gap-3 rounded-full border border-[#D7E2EA]/20 bg-white/5 backdrop-blur-sm px-6 py-4 sm:px-8 sm:py-5 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-white/10"
            >
              <Mail className="text-[#D7E2EA] w-5 h-5 flex-shrink-0" />
              <span
                className="text-[#D7E2EA] font-medium tracking-wide"
                style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.2rem)" }}
              >
                premmaurya537@gmail.com
              </span>
              <ArrowUpRight className="text-[#D7E2EA] w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </a>
          </div>
        </FadeIn>

        {/* Two-column layout: form + availability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* LEFT — Contact form */}
          <FadeIn delay={0.25} y={40}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full gap-4 py-16 border border-[#D7E2EA]/10 rounded-[32px] bg-white/5"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  }}
                >
                  <Send className="text-white w-7 h-7" />
                </div>
                <p className="text-[#D7E2EA] font-medium text-xl uppercase tracking-widest">
                  Message sent!
                </p>
                <p className="text-[#D7E2EA]/50 font-light text-sm">
                  I&apos;ll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                id="contact-form"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="text-[#D7E2EA]/60 text-sm uppercase tracking-widest font-light"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Prem Maurya"
                    className="bg-white/5 border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA]/25 outline-none focus:border-[#D7E2EA]/50 transition-colors duration-200"
                    style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="text-[#D7E2EA]/60 text-sm uppercase tracking-widest font-light"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-white/5 border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA]/25 outline-none focus:border-[#D7E2EA]/50 transition-colors duration-200"
                    style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="text-[#D7E2EA]/60 text-sm uppercase tracking-widest font-light"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="bg-white/5 border border-[#D7E2EA]/15 rounded-2xl px-5 py-4 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA]/25 outline-none focus:border-[#D7E2EA]/50 transition-colors duration-200 resize-none"
                    style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="self-start mt-2 rounded-full font-medium uppercase tracking-widest text-white cursor-pointer
                    px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
                    text-xs sm:text-sm md:text-base
                    transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
                  style={{
                    background:
                      "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                    boxShadow:
                      "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
                    outline: "2px solid white",
                    outlineOffset: "-3px",
                  }}
                >
                  Send Message
                </button>
              </form>
            )}
          </FadeIn>

          {/* RIGHT — Info block */}
          <FadeIn delay={0.35} y={40}>
            <div className="flex flex-col gap-10 lg:pt-4">
              {/* Availability badge */}
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
                </span>
                <span className="text-[#D7E2EA]/70 font-light uppercase tracking-widest text-sm">
                  Available for new projects
                </span>
              </div>

              {/* What I offer */}
              <div className="flex flex-col gap-4">
                <p className="text-[#D7E2EA]/40 text-xs uppercase tracking-widest font-light">
                  What I can help with
                </p>
                {[
                  "Frontend Development",
                  "Full Stack Web Apps",
                  "API Integration",
                  "Responsive Web Design",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-4 border-b border-[#D7E2EA]/10"
                  >
                    <span
                      className="text-[#D7E2EA] font-medium uppercase tracking-wide"
                      style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)" }}
                    >
                      {item}
                    </span>
                    <ArrowUpRight className="text-[#D7E2EA]/30 w-4 h-4" />
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-4">
                <p className="text-[#D7E2EA]/40 text-xs uppercase tracking-widest font-light">
                  Find me on
                </p>
                <div className="flex gap-3">
                  {socials.map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-11 h-11 rounded-full border border-[#D7E2EA]/15 flex items-center justify-center text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 hover:bg-white/5 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Footer */}
        <footer className="mt-24 sm:mt-32 border-t border-[#D7E2EA]/10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#D7E2EA]/30 text-sm font-light tracking-wider uppercase">
            © {new Date().getFullYear()} Prem — 3D Creator
          </p>
          <p className="text-[#D7E2EA]/20 text-xs font-light tracking-widest uppercase">
            Crafted with passion
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;
