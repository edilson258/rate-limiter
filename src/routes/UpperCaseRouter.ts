import { Router } from "express";
import { upperCaseController } from "../useCases/UpperCase";

export class UpperCaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("", upperCaseController.handle);
  }
}
