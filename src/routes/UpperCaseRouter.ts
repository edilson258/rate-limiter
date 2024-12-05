import { Router } from "express";
import { upperCaseController } from "../useCases/UpperCase";
import { rateLimiter } from "../middlewares/Ratelimiter";

export class UpperCaseRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.use(rateLimiter.handle)
    this.routes();
  }

  private routes() {
    this.router.post("", upperCaseController.handle);
  }
}
