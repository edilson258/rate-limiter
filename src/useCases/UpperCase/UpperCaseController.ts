import { Request, Response } from "express";
import { IUpperCaseDTO } from "./UpperCaseDTO";
import type { UpperCaseUseCase } from "./UpperCaseUseCase";

export class UpperCaseController {
  private upperCaseUseCase: UpperCaseUseCase;

  constructor(upperCaseUseCase: UpperCaseUseCase) {
    this.upperCaseUseCase = upperCaseUseCase;
  }

  public handle = (request: Request, response: Response) => {
    let { text } = request.query;

    if (!text) text = "";

    const data: IUpperCaseDTO = {
      lowerCaseText: text.toString(),
    };

    const output = this.upperCaseUseCase.perform(data);

    return response.status(200).json({ result: output });
  };
}
