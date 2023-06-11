import { fakeDBRatelimiterSessionRepository } from "../../repositories/implementations/fakeDatabase/ratelimiterSessionRepository";
import { fakeDBClientRepository } from "../../repositories/implementations/fakeDatabase/clientRepository";
import { RatelimiterController } from "./RatelimiterController";
import { RatelimiterUseCase } from "./RatelimiterUseCase";

const ratelimiterUseCase = new RatelimiterUseCase(
  fakeDBClientRepository,
  fakeDBRatelimiterSessionRepository
);
const ratelimiterController = new RatelimiterController(ratelimiterUseCase);

export { ratelimiterController as rateLimiter };
