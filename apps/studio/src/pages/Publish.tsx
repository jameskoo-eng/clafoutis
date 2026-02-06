import { serializeTokenFile } from "@clafoutis/studio-core";
import { useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import PublishView from "@/components/views/PublishView";
import { useAuth } from "@/contexts/AuthProvider";
import { pushTokenChanges } from "@/lib/github-commit";
import { getTokenStore } from "@/lib/studio-api";

export function Publish() {
  const { projectId } = useParams({ from: "/projects/$projectId/publish" });
  const { accessToken, isAuthenticated, login } = useAuth();
  const store = getTokenStore();
  const [message, setMessage] = useState("Update design tokens");
  const [branchName, setBranchName] = useState(`studio/${Date.now()}`);
  const [pushing, setPushing] = useState(false);
  const [result, setResult] = useState<{ sha?: string; prUrl?: string } | null>(
    null,
  );
  const [error, setError] = useState("");

  const diffs = useMemo(() => store.getState().getDiff(), [store]);
  const isLocal = projectId === "local";
  const [owner, repo] = isLocal ? ["", ""] : projectId.split("--");

  const handlePush = async () => {
    if (!accessToken || !owner || !repo) return;
    setError("");
    setPushing(true);
    try {
      const tokenFiles = store.getState().exportAsJSON();
      const files = Object.entries(tokenFiles).map(([path, file]) => ({
        path: `tokens/${path}`,
        content: serializeTokenFile(file),
      }));

      const pushResult = await pushTokenChanges(
        accessToken,
        owner,
        repo,
        files,
        message || "Update design tokens",
        { createPr: true, branchName },
      );
      setResult({ sha: pushResult.commitSha, prUrl: pushResult.prUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Push failed");
    } finally {
      setPushing(false);
    }
  };

  return (
    <PublishView
      isLocal={isLocal}
      isAuthenticated={isAuthenticated}
      diffs={diffs}
      message={message}
      branchName={branchName}
      pushing={pushing}
      error={error}
      result={result}
      onMessageChange={setMessage}
      onBranchNameChange={setBranchName}
      onPush={handlePush}
      onLogin={login}
    />
  );
}
