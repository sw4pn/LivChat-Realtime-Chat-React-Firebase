import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Messages from "./Messages";
import Input from "./Input";
import useMediaQuery from "../hooks/useMediaQuery";
import { MenuContext } from "../context/MenuContext";
const Chat = () => {
  const { data } = useContext(ChatContext);
  const { setOpen } = useContext(MenuContext);
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const goToBack = () => {
    if (!isMediumScreen) {
      setOpen();
    }
  };
  return (
    <div className="flex flex-col h-full">
      {/* md:w-3/5 md:flex md:flex-col w-full overflow-hidden bg-red-200 md:justify-between */}
      <div className="flex items-center justify-between h-16 p-3 text-gray-700 bg-slate-600 shadow-down ">
        {data.chatId && (
          <>
            <span className="ml-4 text-lg font-bold text-violet-200">
              {data.user?.displayName}
            </span>
            <div className="flex gap-3 chatIcons">
              {/* <img
                src="/images/cam.png"
                alt=""
                className="h-6 cursor-pointer"
              />
              <img
                src="/images/add.png"
                alt=""
                className="h-6 cursor-pointer"
              />
              <img
                src="/images/more.png"
                alt=""
                className="h-6 cursor-pointer"
              /> */}

              <img
                src="/images/backArrow.svg"
                alt=""
                onClick={goToBack}
                className="w-6 h-6 rounded-full cursor-pointer md:hidden hover:bg-slate-500"
              />
            </div>
          </>
        )}
      </div>
      {!data.chatId && (
        <div className="flex items-center justify-center flex-1 bg-violet-200">
          No Conversations.
          <br />
          Click on user and Start the conversation.
        </div>
      )}
      {data.chatId && (
        <div className="flex flex-col h-[calc(100%-60px)] bg-violet-200">
          <Messages />
          <Input />
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default Chat;
