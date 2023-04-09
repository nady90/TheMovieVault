import React, { createContext, useState, useEffect, Children } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
  currentUser: {},
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("From UserContext:", user);
      setCurrentUser(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      navigate("/");
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
