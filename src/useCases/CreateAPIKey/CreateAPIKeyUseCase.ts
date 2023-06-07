import crypto from "node:crypto";
import { Client } from "../../entities/Client";
import { IClientRepository } from "../../repositories/IClientRepository";
import { ICreateAPIKeyDTO } from "./CreateAPIKeyDTO";

export class CreateAPIKeyUseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public perform = async (data: ICreateAPIKeyDTO): Promise<string> => {
    if (await this.clientRepository.getClientByEmail(data.email)) {
      throw new Error("Email already in use");
    }

    let newAPIKey = this.genAPIKey();

    while (await this.clientRepository.getClientByAPIKey(newAPIKey)) {
      newAPIKey = this.genAPIKey();
    }

    const client = new Client(newAPIKey, data.email);

    await this.clientRepository.storeClient(client);

    return newAPIKey;
  };

  private genAPIKey = (length: number = 8): string => {
    return crypto.randomBytes(length).toString("hex");
  };
}
