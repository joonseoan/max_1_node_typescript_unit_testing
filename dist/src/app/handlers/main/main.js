"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var Main = /** @class */ (function () {
    function Main(req, res) {
        this.req = req;
        this.res = res;
    }
    ;
    Object.defineProperty(Main.prototype, "setRequest", {
        set: function (req) {
            this.req = req;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main.prototype, "setResponse", {
        set: function (res) {
            this.res = res;
        },
        enumerable: false,
        configurable: true
    });
    return Main;
}());
exports.Main = Main;
