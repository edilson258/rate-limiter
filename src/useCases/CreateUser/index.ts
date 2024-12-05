import { CreateUser } from "./CreateUser"
import { CreateUserController } from "./CreateUserController"
import { inMemoryUserRepository } from "../../repositories/implementations/inMemory/userRepository"

const createUser = new CreateUser(inMemoryUserRepository)
const createUserController = new CreateUserController(createUser)

export { createUserController }
