import { useCallback, useState } from "react";

import ComponentsPreviewView from "@/components/views/ComponentsPreviewView";
import { getTokenStore } from "@/lib/studio-api";

export function ComponentsPreview() {
  const [darkMode, setDarkMode] = useState(false);
  const colorTokens = getTokenStore().getState().getTokensByCategory("colors");

  const handleToggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return (
    <ComponentsPreviewView
      darkMode={darkMode}
      colorTokens={colorTokens}
      onToggleDarkMode={handleToggleDarkMode}
    />
  );
}
