export interface HeaderContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export interface HeaderContextProviderProps {
  children: React.ReactNode;
}
