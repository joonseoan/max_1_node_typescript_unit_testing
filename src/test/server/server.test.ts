import { mocked } from 'ts-jest/dist/utils/testing';
import { MessageInputHandler } from '../../app/handlers/messageInput';
import { Server } from '../../app/server/server';

jest.mock('../../app/handlers/messageInput.ts');
jest.mock('http', () => {
  return {
    createServer: (cb: any) => {
      cb(requestMock, responseMock);
      return {
        listen: listenMock.listen,
      };
    },
  };
});

const requestMock = {
  url: '',
};

const responseMock = {
  end: jest.fn(),
};

const listenMock = {
  listen: jest.fn(),
};

describe('Server test suite', () => {
  it('should create server on port on 5000', () => {
    new Server().startServer();
    expect(listenMock.listen).toBeCalledWith(5000);
    expect(responseMock.end).toBeCalled();
  });

  it('should MessageInputHandler is requested', () => {
    const mockMessageInputHandler = mocked(MessageInputHandler, true);
  
    new Server().startServer()
    expect(mockMessageInputHandler).toBeCalled();
  });

  it('should MessageInputHandler handleRequest is requested', () => {
    MessageInputHandler.prototype.handleRequest = jest.fn();
    new Server().startServer();
    expect(MessageInputHandler.prototype.handleRequest).toBeCalled(); 
  });
});

