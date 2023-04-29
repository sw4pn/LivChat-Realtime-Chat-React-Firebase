import { AnimatePresence, motion } from "framer-motion";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import useMediaQuery from "../hooks/useMediaQuery";
import { useState, useContext } from "react";
import { MenuContext } from "../context/MenuContext";

const Home = () => {
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const { isOpen } = useContext(MenuContext);

  return (
    <AnimatePresence>
      <div className="fixed flex justify-center w-full h-full">
        {/* sm:overflow-hidden sm:h-[90%]  md:w-[90%]   */}
        {/* <div className="flex justify-center w-full overflow-hidden md:border sm:border-white sm:rounded-xl sm:max-w-xl md:max-w-5xl"> */}
        <div className="flex justify-center flex-1 w-full h-full overflow-hidden sm:max-w-xl md:max-w-5xl sm:rounded-xl sm:border-white md:border">
          <div
            className={` ${
              !isMediumScreen && isOpen && "hidden"
            }  relative w-full bg-slate-700 md:w-2/5`}>
            <motion.div
            // initial={{ x: "0" }}
            // animate={{ x: !isMediumScreen && isOpen ? "-100%" : "0%" }}
            // exit={{ x: !isMediumScreen && isOpen ? "-100%" : "0%" }}
            // transition={{ duration: 0.4 }}
            // initial={{ x: !isMediumScreen ? "0%" : "0" }}
            // animate={{ x: isOpen && !isMediumScreen ? "-100%" : "0%" }}
            >
              <Sidebar />
            </motion.div>
          </div>
          <motion.div
            // initial={{ x: "0%" }}
            // animate={{ x: !isMediumScreen && isOpen ? "0%" : "" }}
            // transition={{ duration: 0.4 }}
            // initial={{ x: !isMediumScreen ? "100%" : "0" }}
            // animate={{ x: isOpen && !isMediumScreen ? "0%" : "100%" }}
            // className={`  ${
            //   !isMediumScreen && !isOpen && "hidden"
            // } md:w-3/5 md:flex md:flex-col w-full overflow-hidden  md:justify-between`}

            className={`${
              !isMediumScreen && !isOpen && "hidden"
            }  w-full md:w-3/5 `}>
            {<Chat />}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
    // <div className="flex items-center justify-center h-screen bg-indigo-300">
    //   <div className="md:w-[65%] border border-white rounded-xl h-5/6 flex overflow-hidden w-[90%]">
    //     <div className="relative w-1/3 bg-slate-700">
    //       <Sidebar />
    //     </div>
    //     <div className="w-2/3">{<Chat />}</div>
    //   </div>
    // </div>
  );
};

export default Home;
