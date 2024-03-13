import { createContext, useState } from "react";

export const appContext = createContext();

const AppProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <appContext.Provider value={{ username, setUsername }}>
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
