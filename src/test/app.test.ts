import { mocked } from 'ts-jest/utils';
import { Launcher } from '../app/app';
import { Server } from '../app/server/server';

jest.mock('../app/server/server.ts', () => {
  return {
    Server: jest.fn(() => {
      return {
        startServer: () => {
          console.log('start mock server');
        }
      }
    })
  }
})

jest.mock('../app/server/server.ts');

describe('launch test suit', () => {
  const mockedServer = mocked(Server, true);

  it('tests Launcher class', () => {
    new Launcher();
    expect(mockedServer).toBeCalled();
  });

  it('tests launchApp method', () => {
    Launcher.prototype.launchApp = jest.fn();
    new Launcher().launchApp();
    expect(Launcher.prototype.launchApp).toBeCalled();
  });
});