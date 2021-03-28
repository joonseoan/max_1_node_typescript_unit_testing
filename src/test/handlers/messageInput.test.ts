import { MessageInputHandler } from '../../app/handlers/messageInput';
import fs from 'fs';
import { HTTP_METHOD, STATUS_CODES } from '../../app/models/server';

describe('MessageInput test suite', () => {

  let messageInputHandler: MessageInputHandler;

  const requestMock = {
    url: '',
    method: '',
    on: jest.fn(),
  };
  
  const responseMock = {
    write: jest.fn(),
    setHeader: jest.fn(),
    end: jest.fn(),
    statusCode: 0,
  };

  jest.mock('http', () => {
    return {
      request: jest.fn().mockImplementation((url, options, cb) => {
        cb(requestMock);
      }),
    };
  });

  jest.mock('fs', () => {
    return {
      writeFile: jest.fn().mockImplementation((path, message, cb) => {
        cb();
      }),
    }
  });

  const someString = JSON.stringify({
    message: 'abcde',
  });

  beforeEach(() => {
    messageInputHandler = new MessageInputHandler();
    messageInputHandler.setRequest = requestMock as any;
    messageInputHandler.setResponse = responseMock as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle handleGET', () => {
    requestMock.url = '/';
    messageInputHandler.handleGET = jest.fn();
    messageInputHandler.handleRequest();

    expect(messageInputHandler.handleGET).toBeCalled();
  });

  it('should handle handlePOST', () => {
    requestMock.url = '/message';
    requestMock.method = HTTP_METHOD.POST;
    messageInputHandler.handlePOST = jest.fn();
    messageInputHandler.handleRequest();

    expect(messageInputHandler.handlePOST).toBeCalled();
  });

  it('should handle handleDefault', () => {
    requestMock.url = '/xxx';
    messageInputHandler.handleDefault = jest.fn();
    messageInputHandler.handleRequest();

    expect(messageInputHandler.handleDefault).toBeCalled();
  });

  it('should work in handleGET', () => {
    messageInputHandler.handleGET();
    
    expect(responseMock.setHeader).toBeCalledWith('Content-Type', 'text/html');
    expect(responseMock.write).toBeCalled();
    expect(responseMock.end).toBeCalled();    
  });

  it('should work in handlePOST', () => {
    jest.spyOn(global.Buffer, 'concat').mockImplementation(() => jest.fn() as any);
    requestMock.on.mockImplementation((event, cb) => {
      if (event == 'data') {
          cb(someString)
      } else if (event === 'end') {
          cb()
      }
    });
    
    const fsSpy = jest.spyOn(fs, 'writeFile');
    messageInputHandler.handlePOST();

    expect(fsSpy).toBeCalled();
  });

  test('should generate an error', () => {
    const someError = new Error('something went wrong!')
    requestMock.on.mockImplementation((event, cb) => {
      if (event === 'error') {
        cb(someError);
      } 
    });
    expect(() => { messageInputHandler.handlePOST() }).toThrow();
  });

  it('should work in handleDefault', () => {
    messageInputHandler.handleDefault();
    
    expect(responseMock.setHeader).toBeCalledWith('Content-Type', 'text/html');
    expect(responseMock.write).toBeCalled();
    expect(responseMock.end).toBeCalled();    
  });
});