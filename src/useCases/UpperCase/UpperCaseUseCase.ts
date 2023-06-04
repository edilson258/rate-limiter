import { IUpperCaseDTO } from "./UpperCaseDTO"

export class UpperCaseUseCase {
  public perform = (data: IUpperCaseDTO) => {
    const lowerCaseText = data.lowerCaseText
    return lowerCaseText.toUpperCase()
  }
}
