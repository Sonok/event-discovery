// frontend/src/pages/BuilderPage.tsx
import { useEffect, useState } from "react";
import { BuilderComponent, builder } from "@builder.io/react";

// 1) Init with env key (fallback to literal for quick testing)
const KEY = import.meta.env.VITE_BUILDER_API_KEY || "5941f629ea2140ffb7e7c1f43f1210c8";
builder.init(KEY);

export default function BuilderPage() {
  const urlPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        console.log("Using Builder key:", KEY.slice(0, 6));
        console.log("Fetching Builder content for:", urlPath);
        const data = await builder.get("page", {
          userAttributes: { urlPath },
        }).toPromise();
        if (mounted) setContent(data || null);
      } catch (e: any) {
        console.error(e);
        if (mounted) setError(e?.message || "Failed to load Builder content");
      }
    })();
    return () => { mounted = false; };
  }, [urlPath]);

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h3>Builder load error</h3>
        <pre>{error}</pre>
        <p>Check DevTools → Network for requests to <code>cdn.builder.io</code> and verify your page URL & API key.</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ padding: 24 }}>
        <h3>No Builder content found for “{urlPath}”.</h3>
        <ol>
          <li>Create a <b>Page</b> in Builder with URL <code>{urlPath}</code>.</li>
          <li>Add some visible text, then <b>Publish</b>.</li>
          <li>Refresh this page.</li>
        </ol>
      </div>
    );
  }

  return <BuilderComponent model="page" content={content} />;
}
