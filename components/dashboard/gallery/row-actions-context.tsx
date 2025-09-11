"use client";

import { createContext, useContext } from "react";

type RowActionsContextValue = {
  startDeleteAnimation: (id: string) => Promise<void>;
  refresh: () => void;
};

export const RowActionsContext = createContext<RowActionsContextValue | null>(
  null
);

export function useRowActions() {
  const ctx = useContext(RowActionsContext);
  if (!ctx) {
    return {
      startDeleteAnimation: async () => {},
      refresh: () => {},
    } as RowActionsContextValue;
  }
  return ctx;
}
