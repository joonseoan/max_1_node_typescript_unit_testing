import fs from 'fs';
import path from 'path';

import { Main } from './main/main';
import { HTTP_METHOD, STATUS_CODES } from "../models/server";

export class MessageInputHandler extends Main {  
  constructor () {
    super({} as any, {} as any);
  };

  handleRequest () {
    const url = this.req.url;
    console.log('url ----> ', url)
    switch (url) {
      case '/':
        this.handleGET();
        break;
      case '/message':
        if (this.req.method === HTTP_METHOD.POST) {
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

  handlePOST () {
    const body: Uint8Array [] = [];
    this.req.on('data', (chunk: Uint8Array) => {
      body.push(chunk);
    });

    this.req.on('end', () => {
      
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      // use async function for write.
      fs.writeFile(`${path.dirname(__dirname)}/doc/message.txt`, message, () => {
        this.res.statusCode = STATUS_CODES.REDIRECT;
        // redirect
        this.res.setHeader('Location', '/');
        this.res.end();
      });
    });

    this.req.on('error', (err: Error) => {
      // console.log(err);
      throw Error;
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
    `)
    this.res.end();
  }
};