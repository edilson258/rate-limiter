import { Client } from "../entities/Client"

export interface IClientRepository {
  storeClient: (client: Client) => Promise<void>
  getClientByAPIKey: (APIKey: string) => Promise<Client | null>
  getClientByEmail: (email: string) => Promise<Client | null>
}
