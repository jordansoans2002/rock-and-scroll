import { createServer } from "./server/httpServer";
import config from "./config";

import dotenv from "dotenv"
dotenv.config();

async function start() {
  const app = await createServer();
  try {
    await app.listen({ port: config.port, host: "0.0.0.0" });
    console.log(`🚀 Server running on http://0.0.0.0:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();