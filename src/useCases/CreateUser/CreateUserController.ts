import { z } from "zod";
import { Request, Response } from "express";
import { CreateUser, CreateUserErrorKind } from "./CreateUser";
import { ICreateUserDTO as CreateUserDTO } from "./CreateUserDTO";
import { SignToken } from "./SignToken";

const createUserSchema = z.object({
  email: z.string({ message: "Email field is mandatory" }).email({ message: "Invalid email format" }),
  password: z.string().min(8).max(100),
});

export class CreateUserController {
  private createUser: CreateUser;

  constructor(createUser: CreateUser) {
    this.createUser = createUser;
  }

  public handle = async (request: Request, response: Response): Promise<Response> => {
    const { data: requestData, error } = createUserSchema.safeParse(request.body);
    if (error) {
      console.error(error.message);
      return response.status(400).end(error.message)
    }

    const data: CreateUserDTO = {
      email: requestData.email,
      password: requestData.password,
    };

    let createUserError = await this.createUser.handle(data);
    if (createUserError) {
      switch (createUserError.kind) {
        case CreateUserErrorKind.EMAIL_ALREADY_USED:
          return response.status(409).end(createUserError.message)
      }
    }

    const token = SignToken.handle(data.email);

    return response.status(201).end(token);
  };
}
