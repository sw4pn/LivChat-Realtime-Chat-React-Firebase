import { ReactNode, createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "firebase/auth";

interface ChatContextValue {
  data: {
    chatId: string | null;
    user: User | null;
  };
  dispatch: React.Dispatch<{ type: string; payload: any }>;
}

export const ChatContext = createContext({});

// export const ChatContext = createContext<ChatContextValue>({
//   data: {
//     chatId: null,
//     user: null,
//   },
//   dispatch: () => {
//     // do nothing
//   },
// });

interface InitialState {
  chatId: string | null;
  user: User | null;
}

function ChatContextProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE = { chatId: null, user: {} };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid && currentUser.uid > action.payload.uid
              ? currentUser?.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid,
        };
      // {
      //   const { payload: user } = action;
      //   const chatId =
      //     currentUser?.uid && currentUser.uid > user.uid
      //       ? currentUser.uid + user.uid
      //       : user.uid + currentUser?.uid;

      //   return {
      //     user,
      //     chatId,
      //   };
      // }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;
