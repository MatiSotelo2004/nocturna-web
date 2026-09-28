import { create } from "zustand";

export interface SearchState {
  busqueda: string;
  setBusqueda: (busqueda: string) => void;
  clearBusqueda: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  busqueda: "",
  setBusqueda: (busqueda: string) => set({ busqueda }),
  clearBusqueda: () => set({ busqueda: "" }),
}));
