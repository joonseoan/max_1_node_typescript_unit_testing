const { mocked } = require('ts-jest/utils');

const { Launcher } = require('../app/app');
const { Server } = require('../app/server/server');

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

  it('Launcher class', () => {
    new Launcher();
    expect(mockedServer).toBeCalled();
  });
});