import { Request, Response, NextFunction } from "express";
import { IRatelimiterDTO } from "./RatelimiterDTO";
import { RatelimiterUseCase } from "./RatelimiterUseCase";

export class RatelimiterController {
  private ratelimiterUseCase: RatelimiterUseCase;
  constructor(ratelimiterUseCase: RatelimiterUseCase) {
    this.ratelimiterUseCase = ratelimiterUseCase;
  }

  public handle = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { key } = request.query;

    if (!key) return response.status(400).end("Provide key in request query");

    const data: IRatelimiterDTO = {
      APIKey: key.toString(),
    };

    const keyCanMakeRequest = await this.ratelimiterUseCase.perform(data);

    if (keyCanMakeRequest.isAllowed) {
      console.log("Reason: ", keyCanMakeRequest.reason);
      return next();
    } else {
      return response.status(403).end(keyCanMakeRequest.reason);
    }
  };
}
