import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { MenuContext } from "../context/MenuContext";
import useMediaQuery from "../hooks/useMediaQuery";

type UserType = {
  uid: string;
  displayName: string;
  photoURL: string;
};

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
  userInfo: UserType;
  lastMessage?: {
    text: string;
    senderId: string;
    date: Timestamp;
  };
}
//   userInfo: UserType; // <-- Add this line

const ChatList = () => {
  const [chats, setChats] = useState<ChatMessage[] | []>([]);
  const { setOpen } = useContext(MenuContext);
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (!currentUser?.uid) return;

      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const data = doc.data();
        const chatsArray = data ? Object.values(data) : [];
        // const data = doc.data() as DocumentData;
        // setChats(data);
        setChats(chatsArray);
      });

      return () => {
        unSub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser?.uid]);

  const handleSelect = (u: UserType) => {
    dispatch({ type: "CHANGE_USER", payload: u });

    if (!isMediumScreen) {
      setOpen();
    }
  };

  return (
    <div className="m-1 chats">
      {chats &&
        Object.values(chats)
          ?.sort((a, b) => b.date.seconds - a.date.seconds)
          .map((chat, i) => {
            return (
              <div
                className={` p-2.5 flex items-center gap-3 border-b border-gray-600 text-white cursor-pointer hover:bg-slate-600 `}
                key={i}
                onClick={() => handleSelect(chat.userInfo)}>
                <img
                  src={chat.userInfo.photoURL}
                  alt=""
                  className="object-cover w-12 h-12 rounded-full"
                />

                <div className="userChatInfo">
                  <span className={`text-lg font-semibold `}>
                    {chat.userInfo.displayName}
                  </span>
                  <p className="text-sm text-gray-400">
                    {chat.lastMessage?.text}
                  </p>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default ChatList;
