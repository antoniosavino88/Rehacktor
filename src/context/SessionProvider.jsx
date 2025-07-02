import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/supabase-client";

export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkIfDeactivated = async () => {
      if (!session?.user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("is_active")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.warn("Errore nel controllo is_active:", error.message);
        return;
      }

      if (data?.is_active === false) {
        await supabase.auth.signOut();
      }
    };

    checkIfDeactivated();
  }, [session]);

  return (
    <SessionContext.Provider
      value={{
        session,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
