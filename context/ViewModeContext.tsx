// src/hooks/ViewModeContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type ViewMode = "gallery" | "table";

interface ViewModeContextType {
  viewMode: ViewMode;
  toggleView: () => void;
  setView: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const ViewModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("viewMode") as ViewMode;
    if (saved === "gallery" || saved === "table") {
      setViewMode(saved);
    }
  }, []);

  const toggleView = () => {
    const newMode = viewMode === "gallery" ? "table" : "gallery";
    setViewMode(newMode);
    localStorage.setItem("viewMode", newMode);
  };

  const setView = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleView, setView }}>
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
};
