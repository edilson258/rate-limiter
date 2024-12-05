import { z } from "zod"
import { UpperCase } from "./UpperCase";
import { Request, Response } from "express";
import { UpperCaseDTO } from "./UpperCaseDTO";

const upperCaseSchema = z.object({
  text: z.string({ message: "Text field is mandatory" })
    .min(5, { message: "Text must be at least 5 chars long" })
    .max(255, { message: "Text length cannot exceed 255 chars" })
})

export class UpperCaseController {
  private upperCaseUseCase: UpperCase;

  constructor(upperCaseUseCase: UpperCase) {
    this.upperCaseUseCase = upperCaseUseCase;
  }

  public handle = (request: Request, response: Response) => {
    const { data: requestData, error } = upperCaseSchema.safeParse(request.body);

    if (error) {
      console.error(error.message);
      return response.status(400).end(error.message)
    }

    const data: UpperCaseDTO = {
      text: requestData.text,
    };

    const result = this.upperCaseUseCase.handle(data);

    return response.status(200).end(result);
  };
}
