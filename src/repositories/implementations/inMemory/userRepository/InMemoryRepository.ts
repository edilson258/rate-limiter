import { User } from "../../../../entities/User";
import { UserRepository } from "../../../UserRepository";

interface UserModel extends User { }

export class InMemoryUserRepository implements UserRepository {
  private users: UserModel[];

  constructor() {
    this.users = [];
  }

  public storeUser = async (user: User): Promise<void> => {
    this.users.push({ ...user });
  };

  public findUserByEmail = async (email: string): Promise<User | undefined> => {
    for (let user of this.users) {
      if (user.email === email) {
        return user;
      }
    }
  }

  public findUserByID = async (id: string): Promise<User | undefined> => {
    for (let user of this.users) {
      if (user.id === id) {
        return user;
      }
    }
  }
}
