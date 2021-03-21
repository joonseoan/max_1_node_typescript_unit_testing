"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    preset: 'test-jest',
    roots: ['<rootDir>/src/test'],
    transform: {
        // .ts and tsx file to ts.jest
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
};
