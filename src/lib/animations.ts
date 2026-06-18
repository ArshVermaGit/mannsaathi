export const transitions = {
  smooth: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
  spring: { type: "spring", stiffness: 300, damping: 30 },
  gentle: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  fast:   { duration: 0.15, ease: [0.4, 0, 0.2, 1] as const }
};

export const variants = {
  pageEnter: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
    transition: transitions.smooth
  },
  
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  
  cardHover: {
    rest:  { scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.4)" },
    hover: { scale: 1.02, boxShadow: "0 0 20px rgba(245,158,11,0.2)" }
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: transitions.gentle
  },
  
  slideFromLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: 40 },
    transition: transitions.smooth
  },
  
  slideFromRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -40 },
    transition: transitions.smooth
  }
};
