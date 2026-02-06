import { useParams } from "@tanstack/react-router";

import TokenCatalogView from "@/components/views/TokenCatalogView";
import { getTokenStore } from "@/lib/studio-api";

export function TokenCatalog() {
  const { projectId } = useParams({ from: "/projects/$projectId/tokens/" });
  const store = getTokenStore();
  const tokens = store.getState().resolvedTokens;
  const categoryCounts: Record<string, number> = {
    colors: store.getState().getTokensByCategory("colors").length,
    typography: store.getState().getTokensByCategory("typography").length,
    dimensions: store.getState().getTokensByCategory("dimensions").length,
    shadows: store.getState().getTokensByCategory("shadows").length,
  };

  return (
    <TokenCatalogView
      projectId={projectId}
      tokens={tokens}
      categoryCounts={categoryCounts}
    />
  );
}
