import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

interface ChatMessage {
  id: string;
  img?: string;
  text: string;
  senderId: string;
  timestamp: number;
}

const Message = ({ message }: { message: ChatMessage }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-3 mb-5   ${
        message.senderId === currentUser?.uid && " flex-row-reverse"
      } `}>
      <div className="flex flex-col items-center text-gray-400 ">
        <img
          src={
            message.senderId === currentUser?.uid
              ? currentUser?.photoURL?.toString()
              : data.user?.photoURL?.toString()
          }
          className="object-cover w-10 h-10 rounded-full"
          alt=""
        />
        <span className="text-sm">just now</span>
      </div>
      <div className=" max-w-[80%] flex flex-col gap-3">
        <p className="bg-white py-2.5 px-5 max-w-max border-4 border-t-0 ">
          {message.text}
        </p>
        {message.img && <img src={message.img} alt="" className="w-1/2" />}
      </div>
    </div>
  );
};

export default Message;
