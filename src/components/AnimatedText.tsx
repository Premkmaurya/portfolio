import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={ref} className={`relative ${className}`} style={style} aria-label={text}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + 1 / characters.length;

        return (
          <Character
            key={i}
            char={char}
            progress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </p>
  );
};

interface CharacterProps {
  char: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any;
  start: number;
  end: number;
}

const Character: React.FC<CharacterProps> = ({ char, progress, start, end }) => {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
      <motion.span
        className="absolute inset-0"
        style={{ opacity }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export default AnimatedText;
