import { useState, useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Message from "./Message";

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
}

const Messages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (!data.chatId) return;
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    // <div className="bg-violet-200 p-2.5 overflow-y-scroll h-[100%_-_160px]">
    <div className="flex-1 p-5 overflow-y-scroll bg-violet-200">
      {/* 
          <div className="flex-1 bg-stone-700">A</div> */}
      {/* <div className="flex-1 flex-grow h-full p-5 overflow-y-scroll bg-violet-200"> */}
      {messages.map((msg) => (
        <Message message={msg} key={msg.id} />
      ))}
    </div>
  );
};

export default Messages;
