import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const photoURL = currentUser?.photoURL || "/images/profile.png";
  const displayName = currentUser?.displayName;

  return (
    <div className="flex items-center justify-between h-16 p-3 border-b-2 border-slate-900 bg-slate-800 text-violet-200 ">
      {/* <span className="hidden font-bold md:block">LivChat</span> */}
      <div className="flex items-center justify-center text-lg font-thin select-none font-exo">
        <img src="/images/favicon.svg" className="w-12" />
        <span className="ml-2 text-white md:hidden lg:block">LivCHAT</span>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={photoURL}
          className="object-cover rounded-full w-7 h-7 bg-violet-200"
          alt="avatar"
        />
        <span>{displayName}</span>

        <motion.button
          whileHover={{ scale: 0.96 }}
          whileTap={{ scale: 0.85 }}
          onClick={() => signOut(auth)}
          className="p-1 text-sm duration-200 ease-in rounded-full cursor-pointer bg-slate-500 text-violet-200 hover:bg-slate-500/80 transition-color">
          <img src="/images/logout.svg" className="w-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default Navbar;
