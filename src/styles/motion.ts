import type { Variants, Transition } from 'framer-motion';

// ============================================================
// ATELIER GROUPE — Motion System
// Centralized Framer Motion variant library.
// All animation grammar lives here for brand consistency.
// Rule: animations reveal, never distract.
// ============================================================

// ---- Easing curves -----------------------------------------
export const EASE_LUXURY = [0.25, 0.1, 0, 1] as const;
export const EASE_REVEAL = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.4, 0, 1, 1] as const;
export const EASE_OUT = [0, 0, 0.2, 1] as const;

// ---- Base transitions --------------------------------------
export const transitionSlow: Transition = {
  duration: 0.9,
  ease: EASE_REVEAL,
};

export const transitionMed: Transition = {
  duration: 0.6,
  ease: EASE_LUXURY,
};

export const transitionFast: Transition = {
  duration: 0.25,
  ease: EASE_LUXURY,
};

export const transitionCinematic: Transition = {
  duration: 1.2,
  ease: EASE_REVEAL,
};

// ---- Core reveal variants ----------------------------------

/** Primary content reveal — used on nearly every text block and card */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE_REVEAL,
    },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_REVEAL,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
};

export const fadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: {
    opacity: 0,
    transition: { duration: 0.4, ease: EASE_IN },
  },
};

/** Signature luxury reveal — clip-path wipe, like unveiling art */
export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0% 0%)',
    transition: {
      duration: 1.3,
      ease: EASE_REVEAL,
    },
  },
};

export const maskRevealRight: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.1,
      ease: EASE_REVEAL,
    },
  },
};

export const maskRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0 0 0 100%)' },
  visible: {
    clipPath: 'inset(0 0 0 0%)',
    transition: {
      duration: 1.1,
      ease: EASE_REVEAL,
    },
  },
};

/** Horizontal slide reveal — for split layout content */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_REVEAL },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: EASE_REVEAL },
  },
};

/** Scale reveal — hero images, full-bleed sections */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: EASE_LUXURY },
  },
};

// ---- Stagger orchestration ---------------------------------

/** Parent wrapper — staggers children with luxury timing */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

// ---- Page transitions ---------------------------------------

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.35, ease: EASE_IN },
  },
};

// ---- UI component animations --------------------------------

export const cartDrawerSlide: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: EASE_LUXURY },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.35, ease: EASE_IN },
  },
};

export const mobileNavSlide: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { duration: 0.45, ease: EASE_LUXURY },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.35, ease: EASE_IN },
  },
};

export const megaMenuReveal: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.22, ease: EASE_IN },
  },
};

export const dialogReveal: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_REVEAL },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25, ease: EASE_IN },
  },
};

export const overlayReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

export const dropdownReveal: Variants = {
  hidden: { opacity: 0, y: -4, scaleY: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: { duration: 0.2, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: EASE_IN },
  },
};

// ---- Marquee -----------------------------------------------

export const marqueeAnimation = {
  animate: { x: '-50%' },
  transition: {
    x: {
      duration: 36,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ---- Hover states (not variants — used directly) -----------

export const productImageHover = {
  whileHover: { scale: 1.042 },
  transition: { duration: 0.85, ease: EASE_LUXURY },
};

export const buttonHover = {
  whileHover: { y: -1 },
  whileTap: { y: 0 },
  transition: { duration: 0.2, ease: EASE_LUXURY },
};

export const linkHover = {
  whileHover: { x: 4 },
  transition: { duration: 0.2, ease: EASE_LUXURY },
};

// ---- SVG path animation ------------------------------------

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: EASE_REVEAL },
      opacity: { duration: 0.2 },
    },
  },
};

// ---- Scroll-linked parallax config -------------------------
export const PARALLAX_SLOW = 0.08;  // subtle parallax factor
export const PARALLAX_MED = 0.15;
export const PARALLAX_FAST = 0.25;
