import { TRatelimiterSession } from "../types/TRatelimiterSession";

export interface IRatelimiterSessionRepository {
  storeSession: (rateLimterSession: TRatelimiterSession) => Promise<void>;
  updateSession: (rateLimterSession: TRatelimiterSession) => Promise<void>;
  getSessionByAPIKey: (APIKey: string) => Promise<TRatelimiterSession | null>;
}
