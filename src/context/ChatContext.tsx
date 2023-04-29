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

const INITIAL_STATE = { chatId: null, user: null };

export const ChatContext = createContext<ChatContextValue>({
  data: { chatId: null, user: null },
  dispatch: () => {
    //do nothing
  },
});

interface ChatAction {
  type: string;
  payload?: any;
}
interface ChatState {
  user: User;
  chatId: string;
}

function ChatContextProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useContext(AuthContext);

  const chatReducer = (state: ChatState, action: ChatAction) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser?.uid && currentUser.uid > action.payload.uid
              ? currentUser?.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid,
        };

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
