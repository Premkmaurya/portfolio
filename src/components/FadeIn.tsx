import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'nav' | 'section' | 'header' | 'article' | 'span' | 'p';
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  style,
  as = 'div',
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Use motion.div as base and override tag via 'as' by mapping
  const Tag = motion[as as 'div'];

  return (
    <Tag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '50px', amount: 0 }}
    >
      {children}
    </Tag>
  );
};

export default FadeIn;
