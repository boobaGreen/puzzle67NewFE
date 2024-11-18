import React, { createContext, useContext, useState, ReactNode } from "react";

interface SwitchContextProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

const SwitchContext = createContext<SwitchContextProps | undefined>(undefined);

export const useSwitch = () => {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error("useSwitch must be used within a SwitchProvider");
  }
  return context;
};

export const SwitchProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <SwitchContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </SwitchContext.Provider>
  );
};
