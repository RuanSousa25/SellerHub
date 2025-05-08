import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthApi } from "../Hooks/useAuthApi";
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { validityToken, exchangeToken } = useAuthApi();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const getToken = () => localStorage.getItem("jwtToken");

  const refreshToken = () => {
    console.log(location.pathname);
    const url = `${import.meta.env.VITE_LOGIN_URL}&state=${location.pathname}`;
    window.location.href = url;
  };

  const checkTokenValidity = async (token) => {
    try {
      let resp = await validityToken(token);
      return resp.data.active;
    } catch (error) {
      throw new Error("falha ao validar token");
    }
  };

  useEffect(() => {
    const handleAuth = async () => {
      const token = getToken();
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      try {
        if (!token && code) {
          const resp = await exchangeToken(code);
          if (resp.data) {
            localStorage.setItem("jwtToken", resp.data);
            navigate(state || '"/"');
            return;
          }
        }

        const currentToken = getToken();
        if (!currentToken) {
          refreshToken();
          return;
        }

        const isValid = await checkTokenValidity(currentToken);
        if (!isValid) {
          localStorage.removeItem("jwtToken");
          refreshToken();
          return;
        }
      } catch (error) {
        console.error("Erro na autenticação:", error);
        refreshToken();
      } finally {
        setLoading(false);
      }
    };

    handleAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        checkTokenValidity,
        getToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
