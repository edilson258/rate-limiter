import { Request, Response } from "express";
import { ICreateAPIKeyDTO } from "./CreateAPIKeyDTO";
import { CreateAPIKeyUseCase } from "./CreateAPIKeyUseCase";

export class CreateAPIKeyController {
  private createAPIKeyUseCase: CreateAPIKeyUseCase;

  constructor(createAPIKeyUseCase: CreateAPIKeyUseCase) {
    this.createAPIKeyUseCase = createAPIKeyUseCase;
  }

  public handle = async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const { email } = request.query;

    if (!email) return response.status(400).end("Provide valid email");

    const data: ICreateAPIKeyDTO = {
      email: email.toString(),
    };

    let newAPIKey: string;

    try {
      newAPIKey = await this.createAPIKeyUseCase.perform(data);
    } catch (err: any) {
      return response.status(400).end(err?.message);
    }
    return response.status(200).json({ key: newAPIKey });
  };
}
