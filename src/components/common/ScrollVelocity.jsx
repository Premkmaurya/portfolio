'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useReducedMotion
} from 'motion/react';
import './ScrollVelocity.css';

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        const nextWidth = ref.current.offsetWidth;
        setWidth(currentWidth => currentWidth === nextWidth ? currentWidth : nextWidth);
      }
    }

    updateWidth();

    let active = true;
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (active) updateWidth();
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateWidth);
      return () => {
        active = false;
        window.removeEventListener('resize', updateWidth);
      };
    }

    return () => { active = false; };
  }, [ref]);

  return width;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle,
  overlayRows = [],
  overlayClassName = 'scroll-velocity-overlay-text'
}) => {
  const [overlayRoot, setOverlayRoot] = useState(null);

  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
    renderClone,
    overlayRoot,
    overlayClassName,
    overlayActive
  }) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );
    const shouldReduceMotion = useReducedMotion();

    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min, max, v) {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
      if (shouldReduceMotion) return;

      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    function renderTrack(isClone = false) {
      const spans = [];
      for (let i = 0; i < numCopies; i++) {
        spans.push(
          <span
            className={isClone ? `${className} ${overlayClassName}${overlayActive ? '' : ' scroll-velocity-overlay-text--hidden'}` : className}
            key={i}
            ref={!isClone && i === 0 ? copyRef : null}
          >
            {children}&nbsp;
          </span>
        );
      }

      return (
        <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
          {spans}
        </motion.div>
      );
    }

    return (
      <>
        <div className={parallaxClassName} style={parallaxStyle}>
          {renderTrack()}
        </div>
        {renderClone && overlayRoot && createPortal(
          <div className={`${parallaxClassName} scroll-velocity-clone-row`} style={parallaxStyle}>
            {renderTrack(true)}
          </div>,
          overlayRoot
        )}
      </>
    );
  }

  return (
    <section className={overlayRows.length ? 'scroll-velocity-root scroll-velocity-root--layered' : undefined}>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          renderClone={overlayRows.length > 0}
          overlayRoot={overlayRoot}
          overlayClassName={overlayClassName}
          overlayActive={overlayRows.includes(index)}
        >
          {text}
        </VelocityText>
      ))}
      {overlayRows.length > 0 && <div ref={setOverlayRoot} className="scroll-velocity-overlay" aria-hidden="true" />}
    </section>
  );
};

export default ScrollVelocity;
