"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = require("http");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server_1 = require("../models/server");
const server_2 = require("../models/server");
class Server {
    createServer() {
        http_1.createServer((req, res) => {
            const { url } = req;
            switch (url) {
                case '/':
                    res.setHeader('Content-Type', 'text/html');
                    res.write(`
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
                    res.end();
                    break;
                case '/message':
                    if (req.method === server_1.HTTP_METHOD.POST) {
                        const body = [];
                        req.on('data', (chunk) => {
                            body.push(chunk);
                        });
                        req.on('end', () => {
                            const parsedBody = Buffer.concat(body).toString();
                            const message = parsedBody.split('=')[1];
                            fs_1.default.writeFileSync(`${path_1.default.dirname(__dirname)}/doc/message.txt`, message);
                        });
                        req.on('error', (err) => {
                            console.log(err);
                        });
                        res.statusCode = server_2.STATUS_CODES.REDIRECT;
                        // redirect
                        res.setHeader('Location', '/');
                        res.end();
                        break;
                    }
                    break;
                default:
                    break;
            }
        }).listen(5000);
        console.log('server started');
    }
}
exports.Server = Server;
