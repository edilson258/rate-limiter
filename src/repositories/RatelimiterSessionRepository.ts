import { RatelimiterSession } from "../types/TRatelimiterSession";

export interface RatelimiterSessionRepository {
  storeSession: (rateLimterSession: RatelimiterSession) => Promise<void>;
  updateSession: (rateLimterSession: RatelimiterSession) => Promise<void>;
  getSessionByUserEmail: (email: string) => Promise<RatelimiterSession | undefined>;
}
