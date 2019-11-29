/* eslint-disable @typescript-eslint/no-explicit-any */
import { stdout, stderr } from 'stdout-stderr';

const mockDefault = jest.fn();
jest.mock('../src', () => mockDefault);

// eslint-disable-next-line import/first
import Pageicon from './pageIcon';

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
  stdout.print = true;
  stderr.print = true;
  stdout.start();
  stderr.start();
  mockDefault.mockImplementationOnce(async (): Promise<any> => {});
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const stdOutOutput = stdout;
  const stdErrOutput = stderr;

  await Pageicon.run();
  expect(mockDefault).toHaveBeenCalled();
  expect(stdErrOutput).toHaveBeenCalled();
  // expect(mockedConsoleError).toHaveBeenCalledWith(expect.stringContaining('Missing'));
  stdout.stop();
  stderr.stop();
});
