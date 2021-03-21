import { IncomingMessage, ServerResponse } from "node:http";

export class Main {
  constructor (protected req: IncomingMessage, protected res: ServerResponse) {};

  public set setRequest (req: IncomingMessage) {
    this.req = req;
  }

  public set setResponse (res: ServerResponse) {
    this.res = res;
  }
}