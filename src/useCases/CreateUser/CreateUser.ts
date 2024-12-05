import { User } from "../../entities/User";
import { ICreateUserDTO } from "./CreateUserDTO";
import { UserRepository } from "../../repositories/UserRepository";

export enum CreateUserErrorKind {
  EMAIL_ALREADY_USED = 1,
}

export type CreateUserError = {
  kind: CreateUserErrorKind,
  message: string,
}

export class CreateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public handle = async ({ email, password }: ICreateUserDTO): Promise<CreateUserError | undefined> => {
    let userAlreadyExists = await this.userRepository.findUserByEmail(email);
    if (userAlreadyExists) {
      return { kind: CreateUserErrorKind.EMAIL_ALREADY_USED, message: "Provided email is already in use" };
    }
    const user = new User(email, password);
    await this.userRepository.storeUser(user);
  };
}
