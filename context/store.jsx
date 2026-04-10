import { createContext, useEffect, useState } from "react";
import { apiConnector } from "../services/api-connect";
import { auth } from "../services/apis";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("tokenHMS"));
  const [isLoading, setIsLoading] = useState(true);

  const [signupData, setSignupData] = useState("");

  const [load, setLoad] = useState(true);

  const loadData = (value) => {
    setLoad(value);
  };

  const saveSignUpData = (data) => {
    setSignupData(data);
  };

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("tokenHMS", serverToken);

    localStorage.setItem("tokenHMSTime", Date.now());
    return;
  };


  const authorizationToken = `Bearer ${token}`;

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector("GET", auth.USER_API, "", headers);

      const userData = response.data.response[0];

      if (!response.data.success) {
        setUser(null);
        setIsLoading(false);
      } else {
        setUser(userData);
        setIsLoading(false);
      }
    } catch (error) {
  
      throw new Error(
        error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message
      );
    }
  };

  // automatically run this function
  useEffect(() => {
    userAuthentication();
  }, [token]);


  const logoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("tokenHMS");
    return;
  };

  const contextValue = {
    user,
    token,
    isLoading,
    load,
    authorizationToken,
    signupData,
    storeTokenInLS,
    logoutUser,
    setToken,
    setUser,
    saveSignUpData,
    loadData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
