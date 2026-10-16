import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaInstagram, FaLinkedinIn, FaGithub, FaXTwitter, FaEnvelope } from 'react-icons/fa6'

export const Nav = ({ reveal = false, isLight, progress: explicitProgress }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [internalProgress, setInternalProgress] = useState(0)

  const isLightNav = isLight
  const navBackground = isOpen ? 'bg-[#262220]' : isLightNav ? 'bg-[#FAF9F6]' : reveal ? 'bg-[#3A3632]' : ''
  const navTextColor = isOpen ? 'text-[#F3EEE8]' : isLightNav ? 'text-[#3A3632]' : 'text-[#F3EEE8]'
  const navLineColor = isOpen ? 'bg-[#F3EEE8]' : isLightNav ? 'bg-[#3A3632]' : 'bg-[#F3EEE8]'

  // Mobile navbar background with backdrop blur
  const navBackgroundMobile = isOpen
    ? 'bg-[#262220]'
    : isLightNav
      ? 'bg-[#FAF9F6]/95 backdrop-blur-md'
      : 'bg-[#3A3632]/95 backdrop-blur-md'

  const navBorderColor = isLightNav ? 'bg-[#3A3632]/15' : 'bg-[#FAF9F6]/15'

  // Scroll Progress Calculation (fallback if not explicitly passed as prop)
  useEffect(() => {
    if (typeof explicitProgress === 'number') return

    const updateProgress = () => {
      const scroller = document.querySelector('.overflow-y-auto')
      if (scroller && scroller.scrollHeight > scroller.clientHeight) {
        const maxScroll = scroller.scrollHeight - scroller.clientHeight
        const p = maxScroll > 0 ? (scroller.scrollTop / maxScroll) * 100 : 0
        setInternalProgress(Math.min(100, Math.max(0, p)))
        return
      }

      const docEl = document.documentElement
      const winScroll = window.scrollY || docEl.scrollTop || 0
      const winMax = (docEl.scrollHeight || document.body.scrollHeight) - window.innerHeight
      const p = winMax > 0 ? (winScroll / winMax) * 100 : 0
      setInternalProgress(Math.min(100, Math.max(0, p)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })

    const scroller = document.querySelector('.overflow-y-auto')
    if (scroller) {
      scroller.addEventListener('scroll', updateProgress, { passive: true })
    }

    const intervalId = setInterval(updateProgress, 250)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      if (scroller) {
        scroller.removeEventListener('scroll', updateProgress)
      }
      clearInterval(intervalId)
    }
  }, [explicitProgress])

  const activeProgress = typeof explicitProgress === 'number'
    ? (explicitProgress <= 1 ? explicitProgress * 100 : explicitProgress)
    : internalProgress

  const navItems = [
    { number: '01.', title: 'HOME', href: '/' },
    { number: '02.', title: 'ABOUT', href: '#about' },
    { number: '03.', title: 'WORKS', href: '#works' },
    { number: '04.', title: 'CONTACT', href: '#contact' },
  ]

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/premkmaurya', icon: FaGithub },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/prem-maurya-8640b5319/', icon: FaLinkedinIn },
    { name: 'X / Twitter', href: 'https://x.com/PremMaurya723', icon: FaXTwitter },
    { name: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
    { name: 'Email', href: 'mailto:premmaurya537@gmail.com', icon: FaEnvelope },
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

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile Top Navigation Bar (< md) */}
      <header
        aria-label="Mobile Navigation"
        className={`md:hidden fixed top-0 left-0 right-0 z-[100] pointer-events-auto transition-colors duration-500 ${navBackgroundMobile} ${navTextColor}`}
      >
        <div className="flex items-center justify-between px-5 h-14 sm:h-16">
          {/* Monogram Brand Logo */}
          <a
            href="/"
            aria-label="Prem Maurya Home"
            className="font-editorial text-2xl sm:text-[1.75rem] tracking-tight inline-flex items-start select-none group"
          >
            <span className="leading-none">PM</span>
            <sup className="text-[10px] font-sans font-medium tracking-normal ml-0.5 opacity-80 -top-1">™</sup>
          </a>

          {/* Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="group flex flex-col justify-center items-center gap-[4.5px] p-2 -mr-2 cursor-pointer focus:outline-none"
          >
            <motion.div
              animate={isOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className={`w-6 h-[1.8px] rounded-full ${navLineColor} transition-colors group-hover:opacity-80`}
            />
            <motion.div
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className={`w-6 h-[1.8px] rounded-full ${navLineColor} transition-colors group-hover:opacity-80`}
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className={`w-6 h-[1.8px] rounded-full ${navLineColor} transition-colors group-hover:opacity-80`}
            />
          </button>
        </div>

        {/* Custom Scroll Progress Bar */}
        <div className={`w-full h-[2px] ${navBorderColor} overflow-hidden relative`}>
          <div
            className="h-full bg-[#FF4500] transition-all duration-150 ease-out relative"
            style={{ width: `${Math.min(100, Math.max(0, activeProgress))}%` }}
          >
            {activeProgress > 0 && activeProgress < 100 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#FF4500]" />
            )}
          </div>
        </div>
      </header>

      {/* Left Persistent Sidebar (Desktop >= md) */}
      <nav aria-label="Main Sidebar" className="hidden md:block h-screen w-16 sm:w-18 shrink-0 fixed top-0 left-0 z-[100] pointer-events-auto">
        <div className={`flex h-full w-full flex-col border-r border-[#58534f]/50 relative ${navBackground} ${navTextColor} transition-colors duration-500`}>
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
              className={`w-7 h-[1.8px] rounded-full ${navLineColor} transition-all group-hover:opacity-80`}
            />
            <motion.div
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className={`w-7 h-[1.8px] rounded-full ${navLineColor} transition-all group-hover:opacity-80`}
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className={`w-7 h-[1.8px] rounded-full ${navLineColor} transition-all group-hover:opacity-80`}
            />
          </button>

          {/* Vertical Text Elements */}
          <div className={`flex min-h-0 flex-1 flex-col text-[11px] sm:text-xs tracking-[0.18em] select-none ${navTextColor}/80`}>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap uppercase">
                Folio — Edition
              </span>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center">
              <span className="-rotate-90 whitespace-nowrap uppercase text-[0.8rem] font-normal tracking-normal">
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
            transition={{ duration: 0.4, ease: "easeIn" }}
            className="fixed inset-0 z-[120] bg-[#262220] text-[#F3EEE8] flex flex-col justify-between px-6 sm:px-12 md:pl-24 md:pr-16 pt-6 md:pt-12 pb-8 overflow-y-auto overflow-x-hidden selection:bg-[#F3EEE8] selection:text-[#262220]"
          >
            {/* Top Bar inside Overlay */}
            <div className="w-full flex items-center justify-between md:justify-end">
              {/* Monogram inside overlay for mobile */}
              <div className="md:hidden font-editorial text-2xl tracking-tight inline-flex items-start select-none">
                <span className="leading-none text-[#F3EEE8]">PM</span>
                <sup className="text-[10px] font-sans font-medium tracking-normal ml-0.5 opacity-80 -top-1 text-[#F3EEE8]">™</sup>
              </div>

              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                onClick={() => setIsOpen(false)}
                className="group relative cursor-pointer px-2 font-editorial text-lg sm:text-xl md:text-2xl whitespace-nowrap leading-none uppercase tracking-[0.15em] text-[#F3EEE8] hover:text-white transition-colors duration-200"
              >
                <span className="text-target">CLOSE</span>
                <span className="absolute bottom-0 left-2 right-2 h-[1px] bg-[#F3EEE8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col justify-center w-full max-w-6xl pl-0 sm:pl-4 md:pl-16 lg:pl-20 py-6">
              <div className="flex flex-col gap-3 md:gap-2">
                {navItems.map((item, index) => {
                  const isHovered = hoveredIndex === index
                  const isCurrentActive = activeIndex === index
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
                          delay: 0.2 + index * 0.07,
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
                          className="group inline-flex items-baseline gap-3.5 sm:gap-6 md:gap-8 cursor-pointer transition-all duration-300 w-full"
                        >
                          {/* Number Prefix */}
                          <span
                            className={`font-editorial text-2xl sm:text-3xl md:text-4xl tracking-tight transition-colors duration-300 ${isHighlighted ? 'text-[#F3EEE8]' : 'text-[#645e58]'
                              }`}
                          >
                            {item.number}
                          </span>

                          {/* Large Title */}
                          <span
                            className={`font-editorial text-[clamp(2.8rem,10vw,6rem)] tracking-[-0.04em] leading-[0.88] transition-all duration-300 group-hover:translate-x-2 ${isHighlighted
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
              transition={{ duration: 0.4, delay: 0.5 }}
              className="w-full flex flex-wrap items-center justify-between md:justify-end gap-x-5 gap-y-2.5 text-xs sm:text-sm tracking-wide text-[#A8A199] pt-5 border-t border-white/10 md:border-t-0"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative tracking-tight font-normal text-[#A8A199] hover:text-[#F3EEE8] transition-colors duration-300 inline-flex items-center gap-1.5 sm:gap-2 py-1"
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#F3EEE8]/80 group-hover:text-white transition-transform duration-300 group-hover:scale-115" />}
                    <span>{social.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#F3EEE8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left pointer-events-none" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
