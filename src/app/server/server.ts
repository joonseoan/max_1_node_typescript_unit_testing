import { createServer, IncomingMessage, ServerResponse } from 'http';
import { MessageInputHandler } from '../handlers/messageInput';
export class Server {
  
  messageInputHandler: MessageInputHandler = new MessageInputHandler();

  public startServer() {    
    createServer((req: IncomingMessage, res: ServerResponse) => {
      this.messageInputHandler.setRequest = req;
      this.messageInputHandler.setResponse = res;
      this.messageInputHandler.handleRequest();
      res.end();
    }).listen(5000);

    console.log('server started');
  }
}