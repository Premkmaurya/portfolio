import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const navItems = [
    { number: '01.', title: 'HOME', href: '#home' },
    { number: '02.', title: 'ABOUT', href: '#about' },
    { number: '03.', title: 'WORKS', href: '#works' },
    { number: '04.', title: 'CONTACT', href: '#contact' },
  ]

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Behance', href: 'https://behance.net' },
    { name: 'Linkedin', href: 'https://linkedin.com' },
  ]

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      {/* Left Persistent Sidebar */}
      <nav aria-label="Main Sidebar" className="h-screen w-16 sm:w-18 shrink-0 fixed top-0 left-0 z-[100] pointer-events-auto">
        <div className="flex h-full w-full flex-col border-r border-[#58534f]/50 bg-[#262220]/40 backdrop-blur-[2px]">
          {/* Three horizontal lines button div */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="group flex flex-col justify-center items-center gap-[5px] border-b border-[#58534f]/50 p-4 sm:p-5 cursor-pointer hover:bg-white/5 transition-colors focus:outline-none"
          >
            <motion.div
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="w-7 h-[1.8px] rounded-full bg-[#F3EEE8] transition-all group-hover:bg-white"
            />
            <motion.div
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="w-7 h-[1.8px] rounded-full bg-[#F3EEE8] transition-all group-hover:bg-white"
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="w-7 h-[1.8px] rounded-full bg-[#F3EEE8] transition-all group-hover:bg-white"
            />
          </button>

          {/* Vertical Text Elements */}
          <div className="flex min-h-0 flex-1 flex-col text-[11px] sm:text-xs tracking-[0.18em] text-[#F3EEE8]/80 select-none">
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap uppercase">
                Folio — Edition
              </span>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap uppercase font-medium">
                PREM MAURYA™
              </span>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap text-[10px] sm:text-[11px] opacity-70">
                © 2026
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              transform: 'translateX(-100%)',
            }}
            animate={{
              transform: 'translateX(0%)'
            }}
            exit={{
              transform: 'translateX(-100%)'
            }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="fixed inset-0 z-[90] bg-[#262220] text-[#F3EEE8] flex flex-col justify-between pl-16 sm:pl-18 pr-6 sm:pr-12 md:pr-16 py-8 md:py-12 overflow-hidden selection:bg-[#F3EEE8] selection:text-[#262220]"
          >
            {/* Top Bar inside Overlay */}
            <div className="w-full flex items-center justify-end">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                onClick={() => setIsOpen(false)}
                className="group relative cursor-pointer py-1 px-2 font-editorial text-lg sm:text-xl md:text-2xl uppercase tracking-[0.15em] text-[#F3EEE8] hover:text-white transition-colors duration-200"
              >
                <span>CLOSE</span>
                <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-[#F3EEE8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="my-auto w-full max-w-6xl pl-4 sm:pl-10 md:pl-16 lg:pl-20 py-4">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {navItems.map((item, index) => {
                  const isHovered = hoveredIndex === index
                  const isCurrentActive = activeIndex === index && hoveredIndex === null
                  const isHighlighted = isHovered || isCurrentActive

                  return (
                    <div
                      key={item.title}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + index * 0.07,
                          ease: [0.215, 0.61, 0.355, 1],
                        }}
                      >
                        <a
                          href={item.href}
                          onClick={() => {
                            setActiveIndex(index)
                            setIsOpen(false)
                          }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          className="group inline-flex items-baseline gap-4 sm:gap-6 md:gap-8 cursor-pointer transition-all duration-300"
                        >
                          {/* Number Prefix */}
                          <span
                            className={`font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight transition-colors duration-300 ${isHighlighted ? 'text-[#F3EEE8]' : 'text-[#645e58]'
                              }`}
                          >
                            {item.number}
                          </span>

                          {/* Large Title */}
                          <span
                            className={`font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.9] transition-all duration-300 group-hover:translate-x-2 ${isHighlighted
                              ? 'text-[#F3EEE8] drop-shadow-[0_2px_15px_rgba(255,255,255,0.08)]'
                              : 'text-[#645e58]'
                              }`}
                          >
                            {item.title}
                          </span>
                        </a>
                      </motion.div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Right Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4, delay: 1.3, staggerChildren: 0.1 }}
              className="w-full flex items-center justify-end gap-6 sm:gap-8 md:gap-10 text-xs sm:text-sm tracking-wide text-[#A8A199]"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative pb-1 font-normal text-[#A8A199] hover:text-[#F3EEE8] transition-colors duration-300 inline-block"
                >
                  <span>{social.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F3EEE8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left pointer-events-none" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
