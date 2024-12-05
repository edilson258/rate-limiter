import { UpperCase } from "./UpperCase";
import { UpperCaseController } from "./UpperCaseController";

const upperCaseUseCase = new UpperCase();
const upperCaseController = new UpperCaseController(upperCaseUseCase);

export { upperCaseController };
