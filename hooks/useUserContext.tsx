import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import apiClient from "@/services/apiClient";

interface UserContext {
  currentUser: object | null;
  setCurrentUser: (arg: any) => void;
  isLoading: boolean;
  setIsLoading: (arg: any) => void;
}

const UserContext = createContext({} as UserContext);

const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const contextValue: UserContext = { currentUser, setCurrentUser, isLoading, setIsLoading };

  useEffect(() => {
    setIsLoading(true);

    apiClient.getCurrentUser()
      .then(setCurrentUser)
      .catch(Error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default useUserContext;
