import React, { createContext } from "react";
import {
  HeaderContextProps,
  HeaderContextProviderProps,
} from "../interface/HeaderContext";

export const HeaderContext = createContext<HeaderContextProps>({
  isLoading: false,
  setIsLoading: () => {},
});

export const HeaderContextProvider: React.FC<HeaderContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <HeaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </HeaderContext.Provider>
  );
};
