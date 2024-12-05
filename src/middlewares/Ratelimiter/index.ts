import { RatelimiterUseCase } from "./RatelimiterUseCase";
import { RatelimiterController } from "./RatelimiterController";
import { inMemoryRatelimiterSessionRepository } from "../../repositories/implementations/inMemory/ratelimiterSessionRepository";

const ratelimiterUseCase = new RatelimiterUseCase(
  inMemoryRatelimiterSessionRepository
);

const ratelimiterController = new RatelimiterController(ratelimiterUseCase);

export { ratelimiterController as rateLimiter };
