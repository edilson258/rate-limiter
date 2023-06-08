import { FakeDBClientRepository } from "../../repositories/implementations/fakeDatabase/FakeDBClientRepository";
import { CreateAPIKeyUseCase } from "./CreateAPIKeyUseCase";
import { CreateAPIKeyController } from "./CreateAPIKeyController";

const clientRepository = new FakeDBClientRepository()
const createAPIKeyUseCase = new CreateAPIKeyUseCase(clientRepository)
const createAPIKeyController = new CreateAPIKeyController(createAPIKeyUseCase)

export { createAPIKeyController }
