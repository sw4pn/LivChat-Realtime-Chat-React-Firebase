import { AnimatePresence, motion } from "framer-motion";

const Cloud = ({
  first = false,
  type = "normal",
}: {
  first?: boolean;
  type?: string;
}) => {
  const getRandomDuration = () => {
    // Generate random animation durations between 8s and 15s as integer values
    // const seconds = Math.floor(Math.random() * 8) + 8;
    // const seconds = (Math.random() * 9 + 9).toFixed(1);
    const seconds = (Math.random() * 30 + 240).toFixed(1);

    return seconds;
  };

  const getRandomDelay = () => {
    // Generate random transition delay between 0s and 6s
    // return Math.random() * 6;
    return Math.random() * 100;
  };

  let normalScale = `scale(2)`;

  switch (type) {
    case "large":
      normalScale = "scale(4)";
      break;
    case "small":
      normalScale = "scale(1)";
      break;
    case "tiny":
      normalScale = "scale(.5)";
      break;
  }

  const cloudClass =
    "absolute bottom-0 w-3 h-3 rounded-full bg-orange-50 -left-1";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ left: first ? "0%" : "-25%", opacity: 0 }}
        animate={{ left: "100%", opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 10 },
          duration: getRandomDuration(),
          repeat: Infinity,
          ease: "linear",
          delay: first ? 0 : getRandomDelay(),
        }}
        className="relative h-1.5 w-14 rounded-xl  m-0 my-8 bg-pink-100  cloud-2 left-20 top-2"
        style={{ transform: normalScale }}>
        <div
          className={`${cloudClass}`}
          style={{ boxShadow: `inset -2px -3px 0 0 #f7e7eb` }}></div>
        <div
          className={`${cloudClass} z-30`}
          style={{
            boxShadow: `inset -2px -3px 0 0 #f7e7eb`,
            margin: "0 0 4px 13px",
            transform: "scale(1.6,1.6)",
          }}></div>
        <div
          className={`${cloudClass} z-30`}
          style={{
            boxShadow: `inset -2px -3px 0 0 #f7e7eb`,
            margin: "0 0 9px 32px",
            transform: "scale(2.4,2.4)",
          }}></div>
        <div
          className={`${cloudClass} z-30`}
          style={{
            boxShadow: `inset -2px -3px 0 0 #f7e7eb`,
            margin: "0 0 2px 50px",
            transform: "scale(1.3,1.3)",
          }}></div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cloud;
