import { useContext } from "react";
import { ERROR_HEADER_CONTENXT } from "../constants/errors";
import { HeaderContext } from "../store/HeaderContext";

// Custom hook to use the context
export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(ERROR_HEADER_CONTENXT);
  }
  return context;
};
