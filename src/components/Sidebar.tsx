import ChatList from "./ChatList";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = () => {
  return (
    <>
      <Navbar />
      <Search />
      <ChatList />
    </>
  );
};

export default Sidebar;
