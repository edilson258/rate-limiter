import { RatelimiterSession } from "../../../../types/TRatelimiterSession";
import { RatelimiterSessionRepository } from "../../../RatelimiterSessionRepository";

export class InMemoryRatelimiterSessionRepository
  implements RatelimiterSessionRepository {

  private sessions: RatelimiterSession[];

  constructor() {
    this.sessions = [];
  }

  public storeSession = async (rateLimterSession: RatelimiterSession): Promise<void> => {
    this.sessions.push(rateLimterSession);
  };

  public updateSession = async (updatedSession: RatelimiterSession): Promise<void> => {
    const tmpSessions = this.sessions.filter(s => s.userEmail !== updatedSession.userEmail);
    tmpSessions.push(updatedSession);
    this.sessions = tmpSessions;
  };

  public getSessionByUserEmail = async (email: string): Promise<RatelimiterSession | undefined> => {
    return this.sessions.find((s) => s.userEmail === email);
  };
}
