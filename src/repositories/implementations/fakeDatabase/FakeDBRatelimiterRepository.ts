import { TRatelimiterSession } from "../../../useCases/Ratelimiter/RatelimiterUseCase";
import { IRatelimiterSessionRepository } from "../../IRatelimiterRepository";

export class FakeDBRatelimiterRepository
  implements IRatelimiterSessionRepository
{
  private sessions: TRatelimiterSession[];

  constructor() {
    this.sessions = [];
  }

  public storeSession = async (
    rateLimterSession: TRatelimiterSession
  ): Promise<void> => {
    this.sessions.push(rateLimterSession);
  };

  public updateSession = async (
    updatedSession: TRatelimiterSession
  ): Promise<void> => {
    const tmpSessions = this.sessions.filter(
      (s) => s.APIKey !== updatedSession.APIKey
    );

    tmpSessions.push(updatedSession);
    this.sessions = tmpSessions;
  };

  public getSessionByAPIKey = async (
    APIKey: string
  ): Promise<TRatelimiterSession | null> => {
    return this.sessions.find((s) => s.APIKey === APIKey) || null;
  };
}
