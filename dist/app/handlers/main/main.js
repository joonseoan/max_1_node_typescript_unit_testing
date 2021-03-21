"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
class Main {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    ;
    set setRequest(req) {
        this.req = req;
    }
    set setResponse(res) {
        this.res = res;
    }
}
exports.Main = Main;
