import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/services/appwrite";

const GlobalContext = createContext({});

const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const contextValue = { currentUser, setCurrentUser, isLoading, setIsLoading };

  useEffect(() => {
    setIsLoading(true);

    getCurrentUser()
      .then(setCurrentUser)
      .catch(Error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default useGlobalContext;