import { Router } from "express";
import { upperCaseController } from "../useCases/UpperCase";
import { rateLimiter } from "../useCases/Ratelimiter";

export class UpperCaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("", rateLimiter.handle, upperCaseController.handle);
  }
}
