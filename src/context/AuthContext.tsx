import { createContext, ReactNode, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { Unsubscribe, onAuthStateChanged, User } from "firebase/auth";
import Loader from "../components/Loader";

interface AuthContextValue {
  currentUser: User | null;
}

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log("user: ", user);
      setCurrentUser(user);
      setIsLoading(false);
      // console.log("USER", user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    // loading the user
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
