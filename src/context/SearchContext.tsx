import { createContext, useState, useContext, ReactNode } from "react";

export interface SearchContextType {
  busqueda: string;
  setBusqueda: React.Dispatch<React.SetStateAction<string>>;
}

export interface SearchProviderProps {
  children: ReactNode;
}
const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: SearchProviderProps) {
  const [busqueda, setBusqueda] = useState<string>("");

  const value: SearchContextType = {
    busqueda: busqueda,
    setBusqueda: setBusqueda,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch(): SearchContextType {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch debe usarse dentro de un SearchProvider");
  }
  return context;
}
