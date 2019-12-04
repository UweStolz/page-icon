/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mockDefault = jest.fn();
jest.mock('../src', () => mockDefault);
jest.mock('@oclif/errors/handle');

// eslint-disable-next-line import/first
import Pageicon from './pageIcon';

test('Calls the function without an extension', async () => {
  const testUrl = 'https://www.example.com/';
  const args: string[] = [testUrl];
  const mockedResult = {
    result: 'someResult',
  };
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
  const mockedResult = {
    result: 'someResult',
  };
  mockDefault.mockImplementationOnce(async (): Promise<any> => mockedResult);
  const mockedConsolelog = jest.spyOn(console, 'log').mockImplementation(() => {});
  await Pageicon.run(args);

  expect(mockDefault).toHaveBeenCalledWith(testUrl, testExtension);
  expect(mockedConsolelog).toHaveBeenCalledWith(mockedResult);
});

test('Calls the function with an the -b flag', async () => {
  const testUrl = 'https://www.example.com/';
  const testFlag = '-b';
  const args: string[] = [testUrl, testFlag];
  const mockedResult = {
    data: '00000100010010100000010020006804',
  };
  mockDefault.mockImplementationOnce(async (): Promise<any> => mockedResult);
  const mockedConsolelog = jest.spyOn(console, 'log').mockImplementation(() => {});
  await Pageicon.run(args);

  expect(mockDefault).toHaveBeenCalledWith(testUrl, undefined);
  expect(mockedConsolelog).toHaveBeenCalledWith('00 00 01 00 01 00 10 10 00 00 01 00 20 00 68 04');
});

test('Calls the function with a wrong extension', async () => {
  const testUrl = 'https://www.example.com/';
  const testExtension = '.txt';
  const args: string[] = [testUrl, testExtension];

  mockDefault.mockImplementationOnce(async (): Promise<any> => {});

  let error;
  try {
    await Pageicon.run(args);
  } catch (err) {
    error = err;
  }

  expect(mockDefault).not.toHaveBeenCalled();
  expect(error).toHaveProperty('message', expect.stringContaining(`Expected ${testExtension} to be one of: .jpg, .png, .ico`));
});

test('Calls the function without any arguments', async () => {
  mockDefault.mockImplementationOnce(async (): Promise<any> => {});

  let error;
  try {
    await Pageicon.run();
  } catch (err) {
    error = err;
  }

  expect(mockDefault).not.toHaveBeenCalled();
  expect(error).toHaveProperty('message', expect.stringContaining('Missing 1 required arg'));
});
