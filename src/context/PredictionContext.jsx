import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/AdminsupabaseClient";

const PredictionContext = createContext(null);

export function PredictionProvider({ children }) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPredictions = useCallback(async () => {
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load predictions:", error.message);
      return;
    }
    setPredictions(data || []);
  }, []);

  useEffect(() => {
    fetchPredictions().finally(() => setLoading(false));

    const channel = supabase
      .channel("predictions-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "predictions" },
        () => fetchPredictions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPredictions]);

  const addPrediction = useCallback(async (data) => {
    const { error } = await supabase.from("predictions").insert(data);
    if (error) console.error("Failed to add prediction:", error.message);
  }, []);

  const updatePrediction = useCallback(async (id, changes) => {
    const { error } = await supabase
      .from("predictions")
      .update(changes)
      .eq("id", id);
    if (error) console.error("Failed to update prediction:", error.message);
  }, []);

  const removePrediction = useCallback(async (id) => {
    const { error } = await supabase.from("predictions").delete().eq("id", id);
    if (error) console.error("Failed to delete prediction:", error.message);
  }, []);

  const value = { predictions, loading, addPrediction, updatePrediction, removePrediction };

  return (
    <PredictionContext.Provider value={value}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePredictions() {
  const ctx = useContext(PredictionContext);
  if (!ctx) {
    throw new Error("usePredictions must be used within a PredictionProvider");
  }
  return ctx;
}