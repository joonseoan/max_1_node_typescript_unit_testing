import { createServer, IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';

import { HTTP_METHOD } from '../models/server';
import { STATUS_CODES } from '../models/server';

export class Server {
  public createServer() {
    createServer((req: IncomingMessage, res: ServerResponse) => {

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
          if (req.method === HTTP_METHOD.POST) {
            const body: Uint8Array [] = [];

            req.on('data', (chunk: Uint8Array) => {
              body.push(chunk);
            });

            req.on('end', () => {
              const parsedBody = Buffer.concat(body).toString();
              const message = parsedBody.split('=')[1];
              fs.writeFileSync(`${path.dirname(__dirname)}/doc/message.txt`, message);
            });

            req.on('error', (err: Error) => {
              console.log(err);
            });

            res.statusCode = STATUS_CODES.REDIRECT;
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