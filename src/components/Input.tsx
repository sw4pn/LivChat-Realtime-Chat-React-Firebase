import { useState, useContext, KeyboardEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSend();
  };

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress updates if needed
          console.log("snapshot(progress): ", snapshot);
        },
        (error: any) => {
          console.log("error: ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            data?.chatId &&
              currentUser?.uid &&
              (await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              }));
          });
        }
      );
    } else {
      data?.chatId &&
        currentUser?.uid &&
        (await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        }));
    }

    currentUser?.uid &&
      (await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      }));

    data?.user?.uid &&
      (await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      }));

    setText("");
    setImage(null);
  };

  return (
    <div className="flex items-center justify-between w-full bg-white border-t-2 h-14 border-slate-400 ">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 text-lg outline-none text-slate-700 hover:text-gray-700"
      />
      <div className="flex items-center gap-2 ml-2">
        {/* <label htmlFor="file" className="block w-full">
          <img
            src="/images/attach.png"
            alt="+IMG"
            className="h-6 cursor-pointer w-14 "
          />
        </label>
        <input
          type="file"
          className="w-0 h-0 overflow-hidden opacity-0"
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
        /> */}
        <button
          onClick={handleSend}
          className="px-5 py-4 text-white bg-indigo-400 cursor-pointer hover:bg-indigo-500">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
