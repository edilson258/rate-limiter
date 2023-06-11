import { TRatelimiterSession } from "../useCases/Ratelimiter/RatelimiterUseCase";

export interface IRatelimiterSessionRepository {
  storeSession: (rateLimterSession: TRatelimiterSession) => Promise<void>;
  updateSession: (rateLimterSession: TRatelimiterSession) => Promise<void>;
  getSessionByAPIKey: (APIKey: string) => Promise<TRatelimiterSession | null>;
}
