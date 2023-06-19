import { IRatelimiterDTO } from "./RatelimiterDTO";
import { IRatelimiterSessionRepository } from "../../repositories/IRatelimiterSessionRepository";
import moment from "moment";
import { IClientRepository } from "../../repositories/IClientRepository";

export type TRatelimiterSession = {
  APIKey: string;
  requestsPerWindow: number;
  numberOfDoneRequests: number;
  windowDurationInSeconds: number;
  windowStartTimeInSeconds: number;
};

interface IRate {
  requestsPerWindow: number;
  windowDurationInSeconds: number;
}

const standardRate: IRate = {
  requestsPerWindow: 5,
  windowDurationInSeconds: 1 * 60, // 1 min
}; // 5 requests/min

export class RatelimiterUseCase {
  private clientRepository: IClientRepository;
  private sessionRepository: IRatelimiterSessionRepository;

  constructor(
    clientRepository: IClientRepository,
    sessionRepository: IRatelimiterSessionRepository
  ) {
    this.clientRepository = clientRepository;
    this.sessionRepository = sessionRepository;
  }

  public perform = async (
    data: IRatelimiterDTO
  ): Promise<{
    isAllowed: boolean;
    status: number;
    reason: string;
  }> => {
    const APIKey = data.APIKey;

    if ((await this.isValidAPIKey(APIKey)) === false) {
      return {
        isAllowed: false,
        status: 403,
        reason: "Invalid API key",
      };
    }

    const session = await this.sessionRepository.getSessionByAPIKey(APIKey);

    if (session === null) {
      await this.createSession(APIKey);
      return {
        isAllowed: true,
        status: 200,
        reason: "is the first request",
      };
    }

    const windowDurationInSeconds = session.windowDurationInSeconds;
    const windowStartTimeInSeconds = session.windowStartTimeInSeconds;
    const actualTimeInseconds = this.getActualTimeInSeconds();

    const timePastSinceWindowStartInSeconds = this.calcTimeDifference(
      windowStartTimeInSeconds,
      actualTimeInseconds
    );

    if (timePastSinceWindowStartInSeconds > windowDurationInSeconds) {
      await this.updateWindowStartTime(session);
      return {
        isAllowed: true,
        status: 200,
        reason: "window expired",
      };
    }

    const numberOfDoneRequests = session.numberOfDoneRequests;
    const requestsPerWindow = session.requestsPerWindow;

    if (requestsPerWindow > numberOfDoneRequests) {
      await this.updateNumberOfDoneRequests(session);
      return {
        isAllowed: true,
        status: 200,
        reason: "didn't exceeded the limit of requests",
      };
    }

    const tryAgainWithin = this.calcWindowExpireTimeInSeconds(
      windowStartTimeInSeconds,
      windowDurationInSeconds
    ).toString();

    return {
      isAllowed: false,
      status: 429,
      reason: `try again after ${tryAgainWithin} seconds`,
    };
  };

  private isValidAPIKey = async (APIKey: string): Promise<boolean> => {
    const client = await this.clientRepository.getClientByAPIKey(APIKey);
    if (client) return true;
    return false;
  };

  private createSession = async (APIKey: string): Promise<void> => {
    const newSession: TRatelimiterSession = {
      APIKey: APIKey,
      requestsPerWindow: standardRate.requestsPerWindow,
      numberOfDoneRequests: 1,
      windowDurationInSeconds: standardRate.windowDurationInSeconds,
      windowStartTimeInSeconds: this.getActualTimeInSeconds(),
    };
    await this.sessionRepository.storeSession(newSession);
  };

  private async updateWindowStartTime(session: TRatelimiterSession) {
    const updatedSession: TRatelimiterSession = {
      APIKey: session.APIKey,
      numberOfDoneRequests: 1,
      requestsPerWindow: session.requestsPerWindow,
      windowDurationInSeconds: session.windowDurationInSeconds,
      windowStartTimeInSeconds: this.getActualTimeInSeconds(),
    };
    await this.sessionRepository.updateSession(updatedSession);
  }

  private async updateNumberOfDoneRequests(session: TRatelimiterSession) {
    const updatedSession: TRatelimiterSession = {
      APIKey: session.APIKey,
      numberOfDoneRequests: session.numberOfDoneRequests + 1,
      requestsPerWindow: session.requestsPerWindow,
      windowDurationInSeconds: session.windowDurationInSeconds,
      windowStartTimeInSeconds: session.windowStartTimeInSeconds,
    };
    await this.sessionRepository.updateSession(updatedSession);
  }

  private getActualTimeInSeconds = (): number => {
    return moment().utc().valueOf() / 1000;
  };

  private calcWindowExpireTimeInSeconds = (
    windowStartTimeInSeconds: number,
    windowDurationInSeconds: number
  ): number => {
    const actualTime = this.getActualTimeInSeconds();
    const expireTime =
      windowStartTimeInSeconds + windowDurationInSeconds - actualTime;
    return Math.floor(expireTime);
  };

  private calcTimeDifference = (
    windowStartTime: number,
    actualTime: number
  ): number => {
    return Math.floor(actualTime - windowStartTime);
  };
}
