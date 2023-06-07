export class Client {
  private APIKey: string
  private email: string

  constructor(APIKey: string, email: string) {
    this.APIKey = APIKey
    this.email = email
  }

  getAPIKey = () => this.APIKey
  getEmail = () => this.email
}
