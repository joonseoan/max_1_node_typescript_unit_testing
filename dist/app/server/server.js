"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = require("http");
const messageInput_1 = require("../handlers/messageInput");
class Server {
    constructor() {
        this.messageInputHandler = new messageInput_1.MessageInputHandler();
    }
    startServer() {
        http_1.createServer((req, res) => {
            this.messageInputHandler.setRequest = req;
            this.messageInputHandler.setResponse = res;
            this.messageInputHandler.handleRequest();
            res.end();
        }).listen(5000);
        console.log('server started');
    }
}
exports.Server = Server;
