export class ServerConfig {
  constructor(
    public host: string,
    public user: string,
    public password: string,
    public port: number,
    public sid: string
  ) {}
}
