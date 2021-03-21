import { Server } from "./server/server";

export class Launcher {
  server: Server;

  constructor () {
    this.server = new Server();
  }

  public launchApp() {
    this.server.startServer();
  }
}

new Launcher().launchApp();