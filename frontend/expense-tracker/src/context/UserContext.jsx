import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  //Funtion to clear userdate
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
