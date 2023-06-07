import morgan from "morgan";
import e, { Express } from "express";
import { UpperCaseRouter } from "./routes/UpperCaseRouter"
import {UserRouter} from "./routes/UserRouter";

export class Server {
  private app: Express;
  private port = 3000;

  constructor() {
    this.app = e();
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.app.use(e.json())
    this.app.use(morgan("dev"))
  }

  private routes() {
    this.app.use("/upper/", new UpperCaseRouter().router)
    this.app.use("/users/", new UserRouter().router)
  }

  public startServer = () => {
    this.app.listen(this.port, () => {
      console.log("Server running...");
    });
  };
}
