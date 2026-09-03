import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/AdminsupabaseClient";

const BookingCodeContext = createContext(null);

export function BookingCodeProvider({ children }) {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCodes = useCallback(async () => {
    const { data, error } = await supabase
      .from("booking_codes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load booking codes:", error.message);
      return;
    }
    setCodes(data || []);
  }, []);

  useEffect(() => {
    fetchCodes().finally(() => setLoading(false));

    const channel = supabase
      .channel("booking-codes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "booking_codes" },
        () => fetchCodes()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCodes]);

  const addCode = useCallback(async (data) => {
    const { error } = await supabase.from("booking_codes").insert(data);
    if (error) console.error("Failed to add booking code:", error.message);
  }, []);

  const updateCode = useCallback(async (id, changes) => {
    const { error } = await supabase
      .from("booking_codes")
      .update(changes)
      .eq("id", id);
    if (error) console.error("Failed to update booking code:", error.message);
  }, []);

  const removeCode = useCallback(async (id) => {
    const { error } = await supabase.from("booking_codes").delete().eq("id", id);
    if (error) console.error("Failed to delete booking code:", error.message);
  }, []);

  const value = { codes, loading, addCode, updateCode, removeCode };

  return (
    <BookingCodeContext.Provider value={value}>
      {children}
    </BookingCodeContext.Provider>
  );
}

export function useBookingCodes() {
  const ctx = useContext(BookingCodeContext);
  if (!ctx) {
    throw new Error("useBookingCodes must be used within a BookingCodeProvider");
  }
  return ctx;
}