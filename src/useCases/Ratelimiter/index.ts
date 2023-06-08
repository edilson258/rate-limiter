import { FakeDBRatelimiterRepository } from "../../repositories/implementations/fakeDatabase/FakeDBRatelimiterRepository";
import { RatelimiterController } from "./RatelimiterController";
import { RatelimiterUseCase } from "./RatelimiterUseCase";

const fakeDatabaseRatelimiterRepository = new FakeDBRatelimiterRepository();
const ratelimiterUseCase = new RatelimiterUseCase(
  fakeDatabaseRatelimiterRepository
);
const ratelimiterController = new RatelimiterController(ratelimiterUseCase);

export { ratelimiterController as rateLimiter };
