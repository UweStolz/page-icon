/* eslint-disable @typescript-eslint/no-explicit-any */
// import { expect, test } from '@oclif/test';

const mockDefault = jest.fn();
jest.mock('../src', () => mockDefault);

// eslint-disable-next-line import/first
import Pageicon from './pageIcon';

// FIXME

test('Calls the function without an extension', async () => {
  const testUrl = 'https://www.example.com/';
  const args: string[] = [testUrl];
  const mockedResult = 'someResult';
  mockDefault.mockImplementationOnce(async (): Promise<any> => mockedResult);
  const mockedConsolelog = jest.spyOn(console, 'log').mockImplementation(() => {});
  await Pageicon.run(args);

  expect(mockDefault).toHaveBeenCalledWith(testUrl, undefined);
  expect(mockedConsolelog).toHaveBeenCalledWith(mockedResult);
});

test('Calls the function with an extension', async () => {
  const testUrl = 'https://www.example.com/';
  const testExtension = '.png';
  const args: string[] = [testUrl, testExtension];
  const mockedResult = 'someResult';
  mockDefault.mockImplementationOnce(async (): Promise<any> => mockedResult);
  const mockedConsolelog = jest.spyOn(console, 'log').mockImplementation(() => {});
  await Pageicon.run(args);

  expect(mockDefault).toHaveBeenCalledWith(testUrl, testExtension);
  expect(mockedConsolelog).toHaveBeenCalledWith(mockedResult);
});

test('Calls the function without any arguments', async () => {
  mockDefault.mockImplementationOnce(async (): Promise<any> => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
  //   const mockedConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  // const mockedConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const stderr: any = [];
  jest.spyOn(process.stderr, 'write').mockImplementation((val) => stderr.push(val));
  console.log(stderr);

  await Pageicon.run();
  expect(mockDefault).toHaveBeenCalled();
  expect(mockedConsoleLog).not.toHaveBeenCalled();
  // expect(mockedConsoleError).toHaveBeenCalledWith(expect.stringContaining('Missing'));
});
