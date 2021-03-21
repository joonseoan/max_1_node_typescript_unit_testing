"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInputHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const main_1 = require("./main/main");
const server_1 = require("../models/server");
class MessageInputHandler extends main_1.Main {
    constructor() {
        super({}, {});
    }
    ;
    handleRequest() {
        const url = this.req.url;
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
    }
    handleGET() {
        this.res.setHeader('Content-Type', 'text/html');
        this.res.write(`
      <html>
        <head>
          <title>Enter Message</title>
          <body>
            <form action="/message" method="POST">
              <input type="text" name="message"/>
              <button type="submit">Send</button>
            </form>
          </body>
        </head>
      </html>
    `);
        this.res.end();
    }
    handlePOST() {
        const body = [];
        this.req.on('data', (chunk) => {
            body.push(chunk);
        });
        this.req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // use async function for write.
            fs_1.default.writeFile(`${path_1.default.dirname(__dirname)}/doc/message.txt`, message, () => {
                this.res.statusCode = server_1.STATUS_CODES.REDIRECT;
                // redirect
                this.res.setHeader('Location', '/');
                this.res.end();
            });
        });
        this.req.on('error', (err) => {
            console.log(err);
        });
    }
    handleDefault() {
        this.res.setHeader('Content-Type', 'text/html');
        this.res.write(`
    <html>
      <head>
        <title>First Page</title>
        <body>
          <h1>Hello from my Node.js server</h1>
        </body>
      </head>
    </html>
    `);
        this.res.end();
    }
}
exports.MessageInputHandler = MessageInputHandler;
;
