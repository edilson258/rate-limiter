import jwt from "jsonwebtoken"
import { ENV } from "../../env";

export type TokenPayload = {
  email: string,
}

export class SignToken {
  public static handle = (email: string): string => {
    return jwt.sign({ email } satisfies TokenPayload, ENV.JWT_SECRET, { expiresIn: "30 days" });
  }
}
