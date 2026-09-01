import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/AdminsupabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = (session) => {
    if (!session?.user) {
      setUser(null);
      return;
    }
    setUser({
      id: session.user.id,
      email: session.user.email,
      role:
        session.user.app_metadata?.role ||
        session.user.user_metadata?.role ||
        "user",
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => handleSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message || "Invalid email or password.");

    const role = data.user.app_metadata?.role || data.user.user_metadata?.role;
    if (role !== "admin") {
      await supabase.auth.signOut();
      throw new Error("This account does not have admin access.");
    }
    handleSession(data.session);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}