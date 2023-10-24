import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CallStateAuth } from "../../../services/firebase/authFirebase";
export const contextAuth = createContext();

export const useAuth = () => {
  const authContext = useContext(contextAuth);
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setStateUser = (user) => setUser(user);

  useEffect(() => {
    const unSuscribe = CallStateAuth((user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log("user logeaddo", user);
        setLoading(false);
      } else {
        setUser(null);
        console.log("user fuera de sesion");
        setLoading(false);
      }
    });
    return () => unSuscribe();
  }, []);

  return (
    <contextAuth.Provider
      value={{
        user,
        setStateUser: setStateUser,
        loading,
        setLoading: setLoading,
      }}
    >
      {children}
    </contextAuth.Provider>
  );
};
