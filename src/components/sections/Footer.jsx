import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaXTwitter,
  FaInstagram,
  FaArrowUp,
  FaArrowRightLong
} from "react-icons/fa6";
import { FiArrowUpRight, FiClock, FiCopy, FiCheck } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const getScrollParent = (el) => {
  let node = el?.parentElement;
  while (node && node !== document.body) {
    const { overflowY } = getComputedStyle(node);
    if (overflowY === "auto" || overflowY === "scroll") return node;
    node = node.parentElement;
  }
  return window;
};

const getIndiaTime = () => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date());
  } catch {
    return "11:00 AM";
  }
};

const socialStickers = [
  {
    name: "Email",
    label: "Mail",
    href: "mailto:premmaurya537@gmail.com",
    icon: FaEnvelope,
    textColor: "text-[#FF4500]",
    tiltClass: "-rotate-6 group-hover:rotate-0 group-hover:scale-110",
  },
  {
    name: "LinkedIn",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prem-maurya-8640b5319/",
    icon: FaLinkedin,
    textColor: "text-[#0A66C2]",
    tiltClass: "rotate-3 group-hover:rotate-0 group-hover:scale-110",
  },
  {
    name: "GitHub",
    label: "GitHub",
    href: "https://github.com/premkmaurya",
    icon: FaGithub,
    textColor: "text-[#181717]",
    tiltClass: "-rotate-3 group-hover:rotate-0 group-hover:scale-110",
  },
  {
    name: "X (Twitter)",
    label: "X",
    href: "https://x.com/PremMaurya723",
    icon: FaXTwitter,
    textColor: "text-[#000000]",
    tiltClass: "rotate-6 group-hover:rotate-0 group-hover:scale-110",
  },
  {
    name: "Instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    textColor: "text-[#E4405F]",
    tiltClass: "-rotate-2 group-hover:rotate-0 group-hover:scale-110",
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const headlineRef = useRef(null);
  const panelRef = useRef(null);
  const [time, setTime] = useState(getIndiaTime());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getIndiaTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("prem.maurya.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackToTop = () => {
    const scroller = getScrollParent(footerRef.current);
    if (scroller && scroller !== window) {
      scroller.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const scroller = getScrollParent(footerRef.current);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const splitHeadline = new SplitText(headlineRef.current, {
        type: "words,lines",
        linesClass: "line overflow-hidden",
        mask: "lines",
      });

      // Animate big editorial headline reveal on scroll into footer
      gsap.from(splitHeadline.lines, {
        scrollTrigger: {
          trigger: headlineRef.current,
          scroller,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: "power3.out",
      });

      // Animate Signature Orange Panel entrance
      gsap.from(panelRef.current, {
        scrollTrigger: {
          trigger: panelRef.current,
          scroller,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 1.2,
        ease: "power3.out",
      });

      // Animate sticker buttons staggered entrance
      gsap.from(".sticker-btn", {
        scrollTrigger: {
          trigger: panelRef.current,
          scroller,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      return () => {
        splitHeadline.revert();
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-screen bg-[#181615] text-[#F3EEE8] pt-20 pb-10 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden selection:bg-[#FF4500] selection:text-white"
    >
      {/* Container aligned with main site margin */}
      <div className="mx-auto max-w-[1600px] flex flex-col justify-between min-h-[90vh]">

        {/* Section 1: Top Statement & Primary Contact Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 border-b border-white/10">
          <div className="max-w-4xl">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#FF4500] mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF4500] animate-pulse" />
              What's Next?
            </p>

            <h2
              ref={headlineRef}
              className="font-editorial text-[clamp(3.2rem,8.5vw,10.5rem)] leading-[0.85] tracking-[-0.04em] text-[#F3EEE8]"
            >
              HAVE A GOOD PROJECT IN MIND?
            </h2>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href="mailto:prem.maurya.dev@gmail.com"
              className="group relative inline-flex items-center justify-center gap-4 bg-[#FF4500] hover:bg-[#E03D00] text-white px-8 py-5 rounded-full font-sans text-lg sm:text-xl font-medium tracking-tight transition-all duration-300 shadow-[0_10px_30px_rgba(255,69,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,69,0,0.5)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Let's Talk</span>
              <FaArrowRightLong className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Section 2: Signature Vivid Orange Canvas Panel (Adapted from Visual Reference) */}
        <div
          ref={panelRef}
          className="my-14 relative w-full bg-[#FF4500] rounded-3xl p-6 sm:p-10 md:p-14 text-white overflow-hidden shadow-2xl transition-all duration-500"
        >
          {/* Subtle noise texture & geometric backdrop accent */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top Panel Meta Info Header */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/20 text-xs sm:text-sm tracking-wider uppercase font-medium">
            <div className="flex items-center gap-2">
              <span className="opacity-75">LAST UPDATED:</span>
              <span className="font-bold">OCTOBER 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 opacity-80" />
              <span className="opacity-75">CURRENTLY:</span>
              <span className="font-bold">LUCKNOW, GMT+5:30 ({time})</span>
            </div>

            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] tracking-normal capitalize">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
              <span>Available for collaborations</span>
            </div>
          </div>

          {/* Main Content inside Orange Panel */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-10 pb-8">
            {/* Left Column: Personal Statement & Note Card */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Floating Dark Note Card */}
              <div className="bg-[#181615] text-[#F3EEE8] p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl transform transition-transform duration-300 hover:scale-[1.01]">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FF4500]">
                    NOTE FROM PREM MAURYA
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-3.5 h-3.5" />
                        <span>Copy email</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="font-sans text-lg sm:text-xl md:text-2xl font-normal leading-snug tracking-tight text-[#F3EEE8]/95 mb-6">
                  "Hi, thank you for being here <span className="text-[#FF4500]">♡</span> Design & engineering, to me, are rooted in craftsmanship, intentionality, and smooth user interaction. If something here resonated with you, say hello!"
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <a
                    href="mailto:prem.maurya.dev@gmail.com"
                    className="font-editorial text-xl sm:text-2xl text-[#FF4500] hover:underline underline-offset-4 tracking-wide"
                  >
                    prem.maurya.dev@gmail.com
                  </a>

                  <span className="text-xs text-white/50 font-mono">
                    Lucknow • IN
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Tilted Social Sticker Badges Grid */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/90 font-mono">
                CONNECT ACROSS THE WEB
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 max-w-md">
                {socialStickers.map((sticker) => {
                  const Icon = sticker.icon;
                  return (
                    <a
                      key={sticker.name}
                      href={sticker.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`sticker-btn group relative flex items-center gap-2.5 bg-white ${sticker.textColor} px-5 py-3 rounded-2xl shadow-lg border-2 border-white transition-all duration-300 ease-out cursor-pointer ${sticker.tiltClass}`}
                    >
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-125" />
                      <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900">
                        {sticker.label}
                      </span>
                      <FiArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Badge Bar inside Orange Panel */}
          <div className="relative z-10 flex flex-wrap items-center justify-between pt-6 border-t border-white/20 text-xs font-mono text-white/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/40 shadow-inner bg-black/20 flex items-center justify-center font-bold text-sm">
                PM
              </div>
              <span className="font-sans font-medium text-white">Prem Maurya — Creative Developer</span>
            </div>

            <span className="hidden sm:block opacity-75">
              Crafted with React, Tailwind & GSAP
            </span>
          </div>
        </div>

        {/* Section 3: Bottom Navigation Bar & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 text-xs sm:text-sm text-[#F3EEE8]/60 tracking-wider">
          <div className="flex items-center gap-4">
            <span className="font-editorial text-lg text-[#F3EEE8] font-bold">PREM MAURYA™</span>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="mailto:prem.maurya.dev@gmail.com"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              GET IN TOUCH
            </a>

            <button
              onClick={handleBackToTop}
              type="button"
              className="group flex items-center gap-2 text-[#F3EEE8] hover:text-[#FF4500] transition-colors cursor-pointer font-medium uppercase tracking-widest text-xs"
              aria-label="Back to top of page"
            >
              <span>BACK TO TOP</span>
              <span className="p-2 rounded-full border border-white/20 group-hover:border-[#FF4500] group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-300">
                <FaArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
