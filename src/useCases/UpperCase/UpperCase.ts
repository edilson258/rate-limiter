import { UpperCaseDTO } from "./UpperCaseDTO"

export class UpperCase {
  public handle = (data: UpperCaseDTO) => {
    const lowerCaseText = data.text
    return lowerCaseText.toUpperCase()
  }
}
