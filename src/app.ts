import { Server } from "./server/server";

class Launcher {
  server: Server;

  constructor () {
    this.server = new Server();
  }

  public launchApp() {
    this.server.createServer();
  }
}

new Launcher().launchApp();