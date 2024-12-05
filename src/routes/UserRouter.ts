import { Router } from "express";
import { createUserController } from "../useCases/CreateUser";

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes = () => {
    this.router.post("/register", createUserController.handle);
  };
}
