import { RatelimiterDTO } from "./RatelimiterDTO";
import { Request, Response, NextFunction } from "express";
import { RatelimiterErrorKind, RatelimiterUseCase } from "./RatelimiterUseCase";
import * as jwt from "jsonwebtoken";
import { TokenPayload } from "../../useCases/CreateUser/SignToken";

export class RatelimiterController {
  private ratelimiterUseCase: RatelimiterUseCase;

  constructor(ratelimiterUseCase: RatelimiterUseCase) {
    this.ratelimiterUseCase = ratelimiterUseCase;
  }

  public handle = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    if (!request.headers.authorization) {
      return response.status(401).end("Authorization token was not provided");
    }

    const authTokens = request.headers.authorization.split(" ");

    if (2 != authTokens.length) {
      return response.status(401).end("Invalid authorization token");
    }

    const decoded = jwt.decode(authTokens[1]);
    if (!decoded) {
      return response.status(401).end("Invalid authorization token");
    }

    const payload = decoded as unknown as TokenPayload;
    const data: RatelimiterDTO = {
      email: payload.email,
    };

    let error = await this.ratelimiterUseCase.handle(data);
    if (error) {
      switch (error.kind) {
        case RatelimiterErrorKind.LIMIT_EXCEED:
          return response.status(429).end(error.message);
      }
    }

    next();
  };
}
