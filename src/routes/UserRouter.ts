import { Router } from "express";
import { createAPIKeyController } from "../useCases/CreateAPIKey";

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.get("/sign-key/", createAPIKeyController.handle);
  };
}
