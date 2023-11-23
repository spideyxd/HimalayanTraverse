export const backgroundLayer = {
  initial: { scale: 1.23, y: -400 },
  animate: { scale: 1, y: -100 },
  transition: {
    duration: 10,
    type: "spring",
  },
};

export const mountainLayer = {
  initial: { y: 150 },
  animate: { y: 0 },
  transition: {
    duration: 10,
    type: "spring",
  },
};

export const textLayer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
