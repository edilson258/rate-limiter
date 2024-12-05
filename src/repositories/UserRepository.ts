import { User } from "../entities/User"

export interface UserRepository {
  storeUser: (user: User) => Promise<void>
  findUserByEmail: (email: string) => Promise<User | undefined>,
}
