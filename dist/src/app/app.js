"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launcher = void 0;
var server_1 = require("./server/server");
var Launcher = /** @class */ (function () {
    function Launcher() {
        this.server = new server_1.Server();
    }
    Launcher.prototype.launchApp = function () {
        this.server.startServer();
    };
    return Launcher;
}());
exports.Launcher = Launcher;
new Launcher().launchApp();
