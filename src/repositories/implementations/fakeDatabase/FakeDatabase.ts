import { Client } from "../../../entities/Client";
import { IClientRepository } from "../../IClientRepository";

interface ClientModel {
  email: string;
  APIKey: string;
}

export class FakeDatabase implements IClientRepository {
  private clients: ClientModel[];
  constructor() {
    this.clients = [];
  }

  public storeClient = async (client: Client): Promise<void> => {
    this.clients.push({
      APIKey: client.getAPIKey(),
      email: client.getEmail(),
    });
  };

  public getClientByAPIKey = async (APIKey: string): Promise<Client | null> => {
    const client = this.clients.find((c) => {
      return c.APIKey === APIKey;
    });

    if (!client) return null;
    return new Client(client.APIKey, client.email);
  };

  public getClientByEmail = async (email: string): Promise<Client | null> => {
    const client = this.clients.find((c) => {
      return c.email === email;
    });

    if (!client) return null;
    return new Client(client.APIKey, client.email);
  };
}
