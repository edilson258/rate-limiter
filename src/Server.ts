import morgan from "morgan";
import e, { Express } from "express";
import { UpperCaseRouter } from "./routes/UpperCaseRouter"

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
    this.app.use("", new UpperCaseRouter().router)
  }

  public startServer = () => {
    this.app.listen(this.port, () => {
      console.log("Server running...");
    });
  };
}
