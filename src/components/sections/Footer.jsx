import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaXTwitter,
  FaInstagram,
  FaArrowUp,
  FaArrowRightLong,
} from "react-icons/fa6";
import { FiClock, FiCopy, FiCheck, FiMapPin } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const getScrollParent = (el) => {
  let node = el?.parentElement;
  while (node && node !== document.body) {
    const style = getComputedStyle(node);
    if (
      style.overflowY === "auto" ||
      style.overflowY === "scroll" ||
      style.overflowX === "hidden" ||
      node.classList?.contains("overflow-x-hidden")
    ) {
      return node;
    }
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
    return "02:30 PM";
  }
};

// 5 die-cut vinyl sticker social icons styled exactly like the reference
const stickers = [
  {
    name: "Email",
    label: "Say Hello",
    href: "mailto:premmaurya537@gmail.com",
    icon: FaEnvelope,
    iconSize: "w-7 h-7 sm:w-9 sm:h-9",
    tilt: "-rotate-7 hover:rotate-0",
    zIndex: "z-10",
  },
  {
    name: "LinkedIn",
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/prem-maurya-8640b5319/",
    icon: FaLinkedinIn,
    iconSize: "w-7 h-7 sm:w-9 sm:h-9",
    tilt: "rotate-4 hover:rotate-0",
    zIndex: "z-11",
  },
  {
    name: "GitHub",
    label: "GitHub Repositories",
    href: "https://github.com/premkmaurya",
    icon: FaGithub,
    iconSize: "w-7 h-7 sm:w-9 sm:h-9",
    tilt: "-rotate-4 hover:rotate-0",
    zIndex: "z-12",
  },
  {
    name: "X (Twitter)",
    label: "X / Twitter",
    href: "https://x.com/PremMaurya723",
    icon: FaXTwitter,
    iconSize: "w-6 h-6 sm:w-8 sm:h-8",
    tilt: "rotate-6 hover:rotate-0",
    zIndex: "z-13",
  },
  {
    name: "Instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    iconSize: "w-7 h-7 sm:w-9 sm:h-9",
    tilt: "-rotate-3 hover:rotate-0",
    zIndex: "z-14",
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
    navigator.clipboard.writeText("premmaurya537@gmail.com");
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

    let splitHeadline;
    const ctx = gsap.context(() => {
      // Headline reveal
      if (headlineRef.current) {
        splitHeadline = new SplitText(headlineRef.current, {
          type: "words,lines",
          linesClass: "line overflow-hidden",
          mask: "lines",
        });

        gsap.from(splitHeadline.lines, {
          scrollTrigger: {
            trigger: headlineRef.current,
            scroller,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          yPercent: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        });
      }

      // Panel entrance: animate y with subtle scale, but keep opacity safe
      if (panelRef.current) {
        gsap.from(panelRef.current, {
          scrollTrigger: {
            trigger: panelRef.current,
            scroller,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Refresh ScrollTrigger once everything is mounted
      ScrollTrigger.refresh();
    }, footerRef);

    // Refresh after fonts load
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      splitHeadline?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-screen bg-[#3A3632] text-[#F3EEE8] pt-20 pb-12 px-6 sm:px-12 md:px-16 lg:px-24 overflow-hidden selection:bg-[#FF4500] selection:text-white"
    >
      <div className="mx-auto max-w-[1600px] flex flex-col justify-between min-h-[90vh]">

        {/* Section 1: Closing Statement & Primary Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16 border-b border-white/10">
          <div className="max-w-4xl">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#FF4500] mb-4 flex items-center gap-2 font-mono">
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

          <div className="shrink-0 flex items-center gap-6">
            <a
              href="mailto:premmaurya537@gmail.com"
              className="group relative inline-flex items-center justify-center gap-4 bg-[#FF4500] hover:bg-[#E03D00] text-white px-8 py-5 rounded-full font-sans text-lg sm:text-xl font-medium tracking-tight transition-all duration-300 shadow-[0_10px_30px_rgba(255,69,0,0.35)] hover:shadow-[0_15px_40px_rgba(255,69,0,0.55)] hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Let's Talk</span>
              <FaArrowRightLong className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Section 2: Signature Vivid Orange Canvas (Faithful to Reference Design) */}
        <div
          ref={panelRef}
          className="my-14 relative w-full bg-[#FF4500] rounded-3xl p-6 sm:p-10 md:p-16 text-white overflow-visible shadow-2xl transition-all duration-500"
        >
          {/* Subtle noise grid pattern */}
          <div
            className="absolute inset-0 rounded-3xl opacity-10 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          {/* Top Metadata Header: LAST UPDATED & CURRENTLY */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-white/20 text-xs sm:text-sm tracking-wider uppercase font-medium">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs opacity-75 font-mono">LAST UPDATED</span>
              <span className="font-bold text-sm sm:text-base">October 2026</span>
            </div>

            <div className="flex flex-col sm:items-end">
              <span className="text-[10px] sm:text-xs opacity-75 font-mono flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5" /> CURRENTLY
              </span>
              <span className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                <FiMapPin className="w-3.5 h-3.5" /> Lucknow, GMT+5:30 ({time})
              </span>
            </div>
          </div>

          {/* Centerpiece: Dark Editorial Note Card with Overlapping Stickers */}
          <div className="relative z-10 flex flex-col items-center justify-center pt-8 sm:pt-12 pb-16 sm:pb-20">
            {/* The Floating Black Note Card */}
            <div className="relative w-full max-w-xl bg-[#181615] text-[#F3EEE8] rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-7 sm:p-10 pb-16 sm:pb-20 transition-transform duration-300">
              
              {/* Note Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#FF4500] font-semibold">
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

              {/* Note Body (with ruled notebook aesthetics like reference) */}
              <div className="space-y-3 font-sans text-lg sm:text-xl font-normal leading-relaxed text-[#F3EEE8]">
                <p className="border-b border-white/5 pb-2">
                  Hi, thank you for being here <span className="text-[#FF4500]">♡</span>
                </p>
                <p className="border-b border-white/5 pb-2">
                  Design, to me, is care and intentionality.
                </p>
                <p className="border-b border-white/5 pb-2">
                  If something here stayed with you,
                </p>
                <p className="pt-1">
                  say{" "}
                  <a
                    href="mailto:premmaurya537@gmail.com"
                    className="text-[#FF4500] hover:underline underline-offset-4 font-medium transition-colors"
                  >
                    premmaurya537@gmail.com
                  </a>
                  !
                </p>
              </div>

              {/* THE SIGNATURE SOCIAL STICKERS ROW (Directly adapted from visual reference) */}
              {/* Large, playful, die-cut vinyl stickers overlapping the bottom edge of the note card */}
              <div className="absolute -bottom-8 sm:-bottom-11 left-1/2 -translate-x-1/2 flex items-center justify-center z-30 pointer-events-auto">
                <div className="flex items-center justify-center">
                  {stickers.map((sticker) => {
                    const Icon = sticker.icon;
                    return (
                      <a
                        key={sticker.name}
                        href={sticker.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sticker.label}
                        title={sticker.name}
                        className={`group relative flex items-center justify-center 
                          w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 
                          bg-[#FF4500] hover:bg-[#E03D00] text-white 
                          rounded-2xl sm:rounded-[22px] 
                          border-[3.5px] sm:border-[4.5px] border-white 
                          shadow-[0_10px_25px_rgba(0,0,0,0.35)] 
                          cursor-pointer transform transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                          hover:-translate-y-3 hover:scale-115 hover:z-40 hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] 
                          -ml-2 sm:-ml-3 first:ml-0 
                          ${sticker.tilt} ${sticker.zIndex}`}
                      >
                        <Icon className={`${sticker.iconSize} text-white transition-transform duration-300 group-hover:scale-110 drop-shadow-sm`} />
                        
                        {/* Tooltip on hover */}
                        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#181615] px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-md border border-white/20">
                          {sticker.name}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar inside Orange Panel: Prem Info Pill (inspired by reference's AI voice chat badge) */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/20 text-xs font-mono text-white/90">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for freelance & full-time roles</span>
            </div>

            {/* Floating identity pill widget */}
            <a
              href="mailto:premmaurya537@gmail.com"
              className="group flex items-center gap-3 bg-white text-[#181615] px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-[#FF4500] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                PM
              </div>
              <div className="text-left font-sans">
                <div className="font-bold text-xs text-slate-900 leading-tight">Prem Maurya</div>
                <div className="text-[10px] text-slate-500 font-medium">Say hello →</div>
              </div>
            </a>
          </div>
        </div>

        {/* Section 3: Bottom Navigation Bar, Social Text Fallback & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 text-xs sm:text-sm text-[#F3EEE8]/60 tracking-wider">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-editorial text-lg text-[#F3EEE8] font-bold">PREM MAURYA™</span>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
          </div>

          {/* Quick social links list */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs font-mono uppercase tracking-widest text-[#F3EEE8]/80">
            <a
              href="https://github.com/premkmaurya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF4500] transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/in/prem-maurya-8640b5319/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF4500] transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href="https://x.com/PremMaurya723"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF4500] transition-colors"
            >
              X / Twitter
            </a>
            <span>•</span>
            <a
              href="mailto:premmaurya537@gmail.com"
              className="hover:text-[#FF4500] transition-colors"
            >
              Email
            </a>
          </div>

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
    </footer>
  );
};

export default Footer;
