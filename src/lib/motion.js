
// One motion language: direction, momentum, reveal.

export const ease = [0.16, 1, 0.3, 1];
export const easeInOut = [0.76, 0, 0.24, 1];

export const dur = {
  fast: 0.35,
  base: 0.8,
  slow: 1.3,
};

// Standard entrance animations.
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: dur.base,
      ease,
      delay: i * 0.07,
    },
  }),
};

export const maskUp = {
  hidden: {
    y: "108%",
  },
  show: (i = 0) => ({
    y: "0%",
    transition: {
      duration: 1.05,
      ease,
      delay: i * 0.08,
    },
  }),
};

export const clipReveal = (from = "left") => {
  const hiddenMap = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    up: "inset(0 0 100% 0)",
    down: "inset(100% 0 0 0)",
  };

  return {
    hidden: {
      clipPath: hiddenMap[from] ?? hiddenMap.left,
    },
    show: {
      clipPath: "inset(0 0% 0 0%)",
      transition: {
        duration: 1.2,
        ease,
      },
    },
  };
};

// Reduced-motion variants.
// Use these only when the component detects
// prefers-reduced-motion via useReducedMotion.
export const reducedFade = {
  hidden: {
    opacity: 1,
    y: 0,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0,
      delay: 0,
    },
  },
};

export const reducedMask = {
  hidden: {
    y: "0%",
  },
  show: {
    y: "0%",
    transition: {
      duration: 0,
      delay: 0,
    },
  },
};

export const reducedClip = {
  hidden: {
    clipPath: "inset(0 0% 0 0%)",
  },
  show: {
    clipPath: "inset(0 0% 0 0%)",
    transition: {
      duration: 0,
      delay: 0,
    },
  },
};

// Shared viewport settings.
export const viewport = {
  once: true,
  margin: "-12% 0px -8% 0px",
};
