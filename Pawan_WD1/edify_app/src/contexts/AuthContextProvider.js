import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { Buffer } from "buffer";

const AuthContext = createContext();

/**
 * Role definitions
 */
export const ROLES = {
  User: "ordinary",
  Admin: "admin",
};

/**
 * { user, token, setToken }
 * @param {*} props
 * @returns
 */
const AuthContextProvider = (props) => {
  /**
   * Takes care of the token by using localStorage
   */
  const [token, setToken] = useToken();

  /**
   * Decodes the payload part in the given token
   * @param {*} token Encoded token value
   * @returns Decoded token payload
   */
  const getPayloadFromToken = (token) => {
    try {
      const encodedToken = token.split(".")[1];
      const decodedToken = JSON.parse(Buffer.from(encodedToken, "base64"));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      }
      return decodedToken;
    } catch {
      return null;
    }
  };

  /**
   * User object in token payload
   * User { id, name, email, role }
   */
  const [user, setUser] = useState(
    // will be executed only on the initial render
    () => {
      if (!token) {
        return null;
      }
      return getPayloadFromToken(token);
    }
  );

  /**
   * If token changes update the user value
   */
  useEffect(() => {
    setUser(getPayloadFromToken(token));
  }, [token]);
  // TODO: this useEffect has a problem

  return (
    <AuthContext.Provider value={{ user, token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
};

/**
 * useAuthContext return AuthContext
 * Simplifies a few importing steps
 * Prevents AuthContext usage directly
 * @returns AuthContext
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useAuthContext was used outside of its Provider");
  }

  return context;
};

/**
 * Keeps token state
 * @returns [token, setToken]
 */
const useToken = () => {
  const [token, setInternalToken] = useState(
    // will be executed only on the initial render
    () => {
      return localStorage.getItem("token");
    }
  );

  const setToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setInternalToken(newToken);
  };

  return [token, setToken];
};

export default AuthContextProvider;
