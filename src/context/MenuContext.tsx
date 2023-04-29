import { useState, createContext, ReactNode } from "react";

export const MenuContext = createContext({ isOpen: false });

function MenuContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setOpen = () => {
    setIsOpen(!isOpen);
  };

  const context = {
    isOpen,
    setOpen,
  };
  return (
    <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
  );
}

export default MenuContextProvider;
