
import { FakeDatabase } from "../../repositories/implementations/fakeDatabase/FakeDatabase";
import { CreateAPIKeyUseCase } from "./CreateAPIKeyUseCase";
import { CreateAPIKeyController } from "./CreateAPIKeyController";

const clientRepository = new FakeDatabase()
const createAPIKeyUseCase = new CreateAPIKeyUseCase(clientRepository)
const createAPIKeyController = new CreateAPIKeyController(createAPIKeyUseCase)

export { createAPIKeyController }
