import React, { createContext, useCallback, useContext, useState } from "react";

interface Alert {
  id: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface AlertState {
  alerts: Alert[];
  addAlert: (message: string, type?: Alert["type"]) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertState | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = useCallback(
    (message: string, type: Alert["type"] = "info") => {
      const id = crypto.randomUUID();
      setAlerts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, 5000);
    },
    [],
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlerts must be used within AlertProvider");
  return context;
}
