"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launcher = void 0;
const server_1 = require("./server/server");
class Launcher {
    constructor() {
        this.server = new server_1.Server();
    }
    launchApp() {
        this.server.startServer();
    }
}
exports.Launcher = Launcher;
new Launcher().launchApp();
