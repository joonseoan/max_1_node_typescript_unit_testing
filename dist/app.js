"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
class Launcher {
    constructor() {
        this.server = new server_1.Server();
    }
    launchApp() {
        this.server.createServer();
    }
}
new Launcher().launchApp();
