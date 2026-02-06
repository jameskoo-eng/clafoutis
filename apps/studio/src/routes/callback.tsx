import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/contexts/AuthProvider";

function CallbackPage() {
  const { handleCallback } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      handleCallback(code).then(() => navigate({ to: "/" }));
    }
  }, [handleCallback, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader />
    </div>
  );
}

export const Route = createFileRoute("/callback")({
  component: CallbackPage,
});
