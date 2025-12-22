import "./env"; // Load environment variables first
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import path from "path";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Serve attached_assets folder at /assets for product images
app.use('/assets', express.static(path.resolve(import.meta.dirname, '..', 'attached_assets')));

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5001", 10);
  const host = process.env.HOST || "0.0.0.0";
  
  // Handle server errors gracefully
  httpServer.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      log(`Port ${port} is already in use.`, "error");
      console.error(`\n❌ Error: Port ${port} is already in use.`);
      console.error(`\nTo fix this, you can:`);
      console.error(`  1. Stop the process using port ${port}:`);
      if (process.platform === "darwin" || process.platform === "linux") {
        console.error(`     lsof -ti:${port} | xargs kill -9`);
        console.error(`     or: kill -9 $(lsof -ti:${port})`);
      } else {
        console.error(`     netstat -ano | findstr :${port}`);
        console.error(`     taskkill /PID <PID> /F`);
      }
      console.error(`  2. Use a different port by setting PORT environment variable:`);
      console.error(`     PORT=5001 npm run dev`);
      process.exit(1);
    } else {
      log(`Server error: ${err.message}`, "error");
      console.error(`\n❌ Server error:`, err);
      process.exit(1);
    }
  });
  
  // Cross-platform server listening
  // Using standard listen() method that works on all platforms (macOS, Linux, Windows)
  // reusePort is Linux-specific and not needed for most use cases
  httpServer.listen(port, host, () => {
    log(`serving on ${host}:${port}`);
  });
})();
