import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "interview/env";
import { appRouter } from "interview/server/api/root";
import { createTRPCContext } from "interview/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
