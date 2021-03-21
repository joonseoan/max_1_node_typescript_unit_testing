"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInputHandler = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var main_1 = require("./main/main");
var server_1 = require("../models/server");
var MessageInputHandler = /** @class */ (function (_super) {
    __extends(MessageInputHandler, _super);
    function MessageInputHandler() {
        return _super.call(this, {}, {}) || this;
    }
    ;
    MessageInputHandler.prototype.handleRequest = function () {
        var url = this.req.url;
        switch (url) {
            case '/':
                this.handleGET();
                break;
            case '/message':
                if (this.req.method === server_1.HTTP_METHOD.POST) {
                    this.handlePOST();
                }
                break;
            default:
                this.handleDefault();
                break;
        }
    };
    MessageInputHandler.prototype.handleGET = function () {
        this.res.setHeader('Content-Type', 'text/html');
        this.res.write("\n      <html>\n        <head>\n          <title>Enter Message</title>\n          <body>\n            <form action=\"/message\" method=\"POST\">\n              <input type=\"text\" name=\"message\"/>\n              <button type=\"submit\">Send</button>\n            </form>\n          </body>\n        </head>\n      </html>\n    ");
        this.res.end();
    };
    MessageInputHandler.prototype.handlePOST = function () {
        var _this = this;
        var body = [];
        this.req.on('data', function (chunk) {
            body.push(chunk);
        });
        this.req.on('end', function () {
            var parsedBody = Buffer.concat(body).toString();
            var message = parsedBody.split('=')[1];
            // use async function for write.
            fs_1.default.writeFile(path_1.default.dirname(__dirname) + "/doc/message.txt", message, function () {
                _this.res.statusCode = server_1.STATUS_CODES.REDIRECT;
                // redirect
                _this.res.setHeader('Location', '/');
                _this.res.end();
            });
        });
        this.req.on('error', function (err) {
            console.log(err);
        });
    };
    MessageInputHandler.prototype.handleDefault = function () {
        this.res.setHeader('Content-Type', 'text/html');
        this.res.write("\n    <html>\n      <head>\n        <title>First Page</title>\n        <body>\n          <h1>Hello from my Node.js server</h1>\n        </body>\n      </head>\n    </html>\n    ");
        this.res.end();
    };
    return MessageInputHandler;
}(main_1.Main));
exports.MessageInputHandler = MessageInputHandler;
;
