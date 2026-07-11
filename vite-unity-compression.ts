import type { Connect, Plugin } from "vite";

const UNITY_TYPES: Record<string, string> = {
  ".js": "application/javascript",
  ".wasm": "application/wasm",
  ".data": "application/octet-stream",
};

function unityContentType(path: string): string | undefined {
  const base = path.split("?")[0].replace(/\.(br|gz)$/, "");
  for (const [ext, type] of Object.entries(UNITY_TYPES)) {
    if (base.endsWith(ext)) return type;
  }
  return undefined;
}

const unityCompressionMiddleware: Connect.NextHandleFunction = (req, res, next) => {
  const path = (req.url ?? "").split("?")[0];

  if (path.endsWith(".br")) {
    res.setHeader("Content-Encoding", "br");
    const type = unityContentType(path);
    if (type) res.setHeader("Content-Type", type);
  } else if (path.endsWith(".gz")) {
    res.setHeader("Content-Encoding", "gzip");
    const type = unityContentType(path);
    if (type) res.setHeader("Content-Type", type);
  }

  next();
};

/** Unity WebGL .br/.gz assets need Content-Encoding headers; Vite does not set them by default. */
export function unityCompressedAssets(): Plugin {
  return {
    name: "unity-compressed-assets",
    configureServer(server) {
      server.middlewares.use(unityCompressionMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(unityCompressionMiddleware);
    },
  };
}
