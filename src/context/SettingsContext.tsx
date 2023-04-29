import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

interface Settings {
  darkMode: boolean;
}

interface SettingsContextValue extends Settings {
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const storage = localStorage.getItem("livChatSettings");
const storedSettings: Settings = storage
  ? (JSON.parse(storage) as Settings)
  : {
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    };

export const SettingsContext = createContext<SettingsContextValue>({
  ...storedSettings,
  updateSettings: () => {
    //do nothing
  },
});

function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(storedSettings);

  useEffect(() => {
    localStorage.setItem("livChatSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback(
    (newSettings: Partial<Settings>) =>
      setSettings((prevSettings) => ({ ...prevSettings, ...newSettings })),
    []
  );

  const contextValue: SettingsContextValue = useMemo(
    () => ({
      ...settings,
      updateSettings,
    }),
    [settings, updateSettings]
  );

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}
export default SettingsProvider;
