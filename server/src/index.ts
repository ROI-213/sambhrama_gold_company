import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { getDataStore } from "./services/db.js";

async function bootstrap() {
  await getDataStore();
  const app = createApp();

  app.listen(env.port, () => {
    console.log(
      `[Sambhrama Gold Company Server] Running in ${env.nodeEnv} mode on http://localhost:${env.port}`
    );
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
