import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const login = (email, name = "Member") => {
    setUser({
      name,
      email,
      role: email.includes("admin") ? "admin" : "user",
    });
  };

  const logout = () => {
    setUser(null);
    setSubscription(null);
  };

  const subscribe = () => {
    setSubscription({
      status: "active",
      expiry: "2026-09-26",
    });
  };

  const isActive = subscription?.status === "active";

  return (
    <AuthContext.Provider
      value={{
        user,
        subscription,
        isActive,
        login,
        logout,
        subscribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}