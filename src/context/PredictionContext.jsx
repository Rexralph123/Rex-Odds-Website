import {
  createContext,
  useContext,
  useState,
} from "react";

import { seedPredictions } from "../data/mockData";

const PredictionContext = createContext(null);

export function PredictionProvider({ children }) {
  const [predictions, setPredictions] =
    useState(seedPredictions);

  return (
    <PredictionContext.Provider
      value={{
        predictions,
        setPredictions,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
}

export function usePredictions() {
  return useContext(PredictionContext);
}