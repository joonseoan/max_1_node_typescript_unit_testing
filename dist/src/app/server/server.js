"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var http_1 = require("http");
var messageInput_1 = require("../handlers/messageInput");
var Server = /** @class */ (function () {
    function Server() {
        this.messageInputHandler = new messageInput_1.MessageInputHandler();
    }
    Server.prototype.startServer = function () {
        var _this = this;
        http_1.createServer(function (req, res) {
            _this.messageInputHandler.setRequest = req;
            _this.messageInputHandler.setResponse = res;
            _this.messageInputHandler.handleRequest();
        }).listen(5000);
        console.log('server started');
    };
    return Server;
}());
exports.Server = Server;
