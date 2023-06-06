import { UpperCaseUseCase } from "./UpperCaseUseCase";
import { UpperCaseController } from "./UpperCaseController";

const upperCaseUseCase = new UpperCaseUseCase();
const upperCaseController = new UpperCaseController(upperCaseUseCase);

export { upperCaseController };
