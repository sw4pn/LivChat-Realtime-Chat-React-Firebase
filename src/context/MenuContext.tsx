import { useState, createContext, ReactNode } from "react";

interface MenuContextType {
  isOpen: boolean;
  setOpen: () => void;
}

export const MenuContext = createContext<MenuContextType>({
  isOpen: false,
  setOpen: () => {
    // nothing to do here
  },
});

function MenuContextProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setOpen = (): void => {
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
