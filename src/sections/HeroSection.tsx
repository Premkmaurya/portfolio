import React from "react";
import Magnet from "../components/Magnet";
import ContactButton from "../components/ContactButton";
import FadeIn from "../components/FadeIn";
import SideRays from "../components/SideRays";

import charImage from "../assets/character.png"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const HeroSection: React.FC = () => {
  return (
    <section
      className="h-screen flex flex-col relative"
      style={{ overflowX: "clip", background: "#0C0C0C" }}
    >
      {/* Background SideRays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SideRays
          speed={1.5}
          rayColor1="#B600A8"
          rayColor2="#7621B0"
          intensity={2.0}
          spread={1.8}
          origin="top-right"
          tilt={0}
          saturation={1.2}
          blend={0.5}
          falloff={0.8}
          opacity={0.4}
        />
      </div>

      {/* Navbar */}
      <FadeIn delay={0} y={-20} as="nav" className="relative z-30">
        <nav className="flex justify-between px-4 sm:px-10 pt-5 sm:pt-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-xs sm:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Center text container - vertically centers heading + subtitle on mobile */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-auto sm:block sm:flex-none">
        {/* Hero Heading */}
        <div className="overflow-hidden w-full flex justify-center relative z-10">
          <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-center text-[11.5vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-0 sm:mt-4 md:-mt-5"
              style={{ display: "block" }}
            >
              Hi, i&apos;m Prem
            </h1>
          </FadeIn>
        </div>

        {/* Mobile description - visible only on small screens below sm */}
        <FadeIn
          delay={0.35}
          y={20}
          className="block sm:hidden text-center mt-4 px-6 z-30 relative"
        >
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-relaxed text-xs max-w-[280px] mx-auto opacity-80">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
      </div>

      {/* Portrait — absolute bottom-0 */}
      <FadeIn
        delay={0.6}
        y={30}
        className="absolute left-1/2 -translate-x-1/2 z-20 w-[65vw] sm:w-[360px] md:w-[440px] lg:w-[520px] bottom-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
        >
          <img
            src={charImage}
            alt="Prem — 3D Creator portrait"
            className="w-full h-auto object-contain select-none"
            draggable={false}
          />
        </Magnet>
      </FadeIn>

      {/* Bottom bar */}
      <div className="mt-auto flex justify-center sm:justify-between items-end pb-6 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-30">
        {/* Left text — visible only on sm and up */}
        <div className="hidden sm:block">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}
            >
              a 3d creator driven by crafting striking and unforgettable projects
            </p>
          </FadeIn>
        </div>

        {/* Contact button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
