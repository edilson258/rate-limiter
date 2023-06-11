import { fakeDBClientRepository } from "../../repositories/implementations/fakeDatabase/clientRepository";
import { CreateAPIKeyUseCase } from "./CreateAPIKeyUseCase";
import { CreateAPIKeyController } from "./CreateAPIKeyController";

const createAPIKeyUseCase = new CreateAPIKeyUseCase(fakeDBClientRepository)
const createAPIKeyController = new CreateAPIKeyController(createAPIKeyUseCase)

export { createAPIKeyController }
