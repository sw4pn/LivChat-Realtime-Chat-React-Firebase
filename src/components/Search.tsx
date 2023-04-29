import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { User } from "firebase/auth";

const Search = () => {
  const [username, setUsername] = useState("");

  const [user, setUser] = useState<User | null>(null);

  const [error, setError] = useState(false);

  const { currentUser }: { currentUser: User | null } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          setError(false);
          setUser(doc.data() as User);
        });
      } else {
        setError(true);
        setUser(null);
      }
    } catch (err: any) {
      setUser(null);
      setError(true);
    }
  };

  const handleKey = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === "Enter" || e?.keyCode === 13) {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const currentUserId = currentUser?.uid;
    const userId = user?.uid;
    //check whether the group(chats in firestore) exists, if not create
    // const combinedId =
    //   currentUserId && userId && currentUserId > userId
    //     ? currentUser.uid + userId
    //     : user?.uid + currentUser?.uid;
    const combinedId =
      currentUserId && userId && currentUserId > userId
        ? `${currentUserId}${userId}`
        : `${userId}${currentUserId}`;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log("combo: ", res);
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        currentUserId &&
          (await updateDoc(doc(db, "userChats", currentUserId), {
            [combinedId + ".userInfo"]: {
              uid: user?.uid,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }));

        userId &&
          (await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser?.uid,
              displayName: currentUser?.displayName,
              photoURL: currentUser?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }));
      }
    } catch (err) {
      // do nothing
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="border-b border-gray-500 bg-slate-800/30">
      <div className="p-2.5">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="w-full px-1.5 py-0.5 tracking-wide text-white bg-transparent outline-none placeholder:text-gray-500 "
        />
      </div>
      {error && (
        <div className="p-2.5 flex items-center  border-t border-gray-600 text-white gap-3 bg-slate-600/60">
          User not found!
        </div>
      )}
      {user && (
        <div
          className="p-2.5 flex border-t border-gray-600 items-center cursor-pointer text-white gap-3 hover:bg-slate-700"
          onClick={handleSelect}>
          <img
            src={user.photoURL?.toString()}
            alt="DP"
            className="object-cover w-12 h-12 rounded-full"
          />
          <div className="">
            <span className="text-lg font-semibold">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
