import { AnimatePresence, motion } from "framer-motion";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import useMediaQuery from "../hooks/useMediaQuery";
import { useContext } from "react";
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
            <motion.div>
              <Sidebar />
            </motion.div>
          </div>
          <motion.div
            className={`${
              !isMediumScreen && !isOpen && "hidden"
            }  w-full md:w-3/5 `}>
            {<Chat />}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Home;
