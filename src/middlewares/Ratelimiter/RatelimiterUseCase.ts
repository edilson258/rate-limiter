import moment from "moment";
import { RatelimiterDTO } from "./RatelimiterDTO";
import { RatelimiterSession } from "../../types/TRatelimiterSession";
import { RatelimiterSessionRepository } from "../../repositories/RatelimiterSessionRepository";

export enum RatelimiterErrorKind {
  LIMIT_EXCEED = 1,
};

export type RatelimiterError = {
  kind: RatelimiterErrorKind,
  message: string,
}

interface Rate {
  requestsPerWindow: number;
  windowDurationInSeconds: number;
}

const standardRate: Rate = {
  requestsPerWindow: 5,
  windowDurationInSeconds: 1 * 60, // 1 min
}; // 5 requests/min

export class RatelimiterUseCase {
  private sessionRepository: RatelimiterSessionRepository;

  constructor(sessionRepository: RatelimiterSessionRepository) {
    this.sessionRepository = sessionRepository;
  }

  public handle = async ({ email }: RatelimiterDTO): Promise<RatelimiterError | undefined> => {
    const session = await this.sessionRepository.getSessionByUserEmail(email);
    if (!session) {
      await this.createSession(email);
      return;
    }

    const windowDurationInSeconds = session.windowDurationInSeconds;
    const windowStartTimeInSeconds = session.windowStartTimeInSeconds;
    const actualTimeInseconds = this.getActualTimeInSeconds();

    const timePastSinceWindowStartInSeconds = this.calcTimeDifference(
      windowStartTimeInSeconds,
      actualTimeInseconds
    );

    // Window expired
    if (timePastSinceWindowStartInSeconds > windowDurationInSeconds) {
      await this.updateWindowStartTime(session);
      return;
    }

    const numberOfDoneRequests = session.numberOfDoneRequests;
    const requestsPerWindow = session.requestsPerWindow;

    // Limit not exceeded yet
    if (requestsPerWindow > numberOfDoneRequests) {
      await this.updateNumberOfDoneRequests(session);
      return;
    }

    return { kind: RatelimiterErrorKind.LIMIT_EXCEED, message: "Requests limit exceeded" };
  };

  private createSession = async (email: string): Promise<void> => {
    const newSession: RatelimiterSession = {
      userEmail: email,
      requestsPerWindow: standardRate.requestsPerWindow,
      numberOfDoneRequests: 1,
      windowDurationInSeconds: standardRate.windowDurationInSeconds,
      windowStartTimeInSeconds: this.getActualTimeInSeconds(),
    };
    await this.sessionRepository.storeSession(newSession);
  };

  private async updateWindowStartTime(session: RatelimiterSession) {
    const updatedSession: RatelimiterSession = {
      userEmail: session.userEmail,
      numberOfDoneRequests: 1,
      requestsPerWindow: session.requestsPerWindow,
      windowDurationInSeconds: session.windowDurationInSeconds,
      windowStartTimeInSeconds: this.getActualTimeInSeconds(),
    };
    await this.sessionRepository.updateSession(updatedSession);
  }

  private async updateNumberOfDoneRequests(session: RatelimiterSession) {
    const newNumberOfDoneRequests = session.numberOfDoneRequests + 1;
    const updatedSession: RatelimiterSession = {
      userEmail: session.userEmail,
      numberOfDoneRequests: newNumberOfDoneRequests,
      requestsPerWindow: session.requestsPerWindow,
      windowDurationInSeconds: session.windowDurationInSeconds,
      windowStartTimeInSeconds: session.windowStartTimeInSeconds,
    };
    await this.sessionRepository.updateSession(updatedSession);
  }

  private getActualTimeInSeconds = (): number => {
    return Math.floor(moment().utc().valueOf() / 1000);
  };

  private calcTimeDifference = (windowStartTime: number, actualTime: number): number => {
    return Math.floor(actualTime - windowStartTime);
  };
}
