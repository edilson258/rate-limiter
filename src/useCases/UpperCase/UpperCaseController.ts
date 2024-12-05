import { Request, Response } from "express";
import { IUpperCaseDTO } from "./UpperCaseDTO";
import type { UpperCaseUseCase } from "./UpperCaseUseCase";
import { z } from "zod"

const upperCaseValidatorSchema = z.object({
  text: z.string({ message: "Text field is mandatory" })
    .min(5, { message: "Text must be at least 5 chars long" })
    .max(255, { message: "Text length cannot exceed 255 chars" })
})

export class UpperCaseController {
  private upperCaseUseCase: UpperCaseUseCase;

  constructor(upperCaseUseCase: UpperCaseUseCase) {
    this.upperCaseUseCase = upperCaseUseCase;
  }

  public handle = (request: Request, response: Response) => {
    const { data: requestData, error } = upperCaseValidatorSchema.safeParse(request.body);

    if (error) {
      console.error(error.message);
      return response.status(400).end(error.message)
    }

    const data: IUpperCaseDTO = {
      lowerCaseText: requestData.text,
    };

    const result = this.upperCaseUseCase.perform(data);

    return response.status(200).json({ result });
  };
}
