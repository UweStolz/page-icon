/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import url from 'url';

const URL = 'https://www.someUrl.com';
const mockedFileType = jest.fn();
jest.mock('file-type', () => mockedFileType);

// eslint-disable-next-line import/first
import downloadIcon from './downloadIcon';

test('Downloads the icon from the given URL', async () => {
  mockedFileType.mockImplementationOnce(() => ({ ext: 'png' }));
  const mockData = { data: 'someData' };
  const mockedGet = jest.spyOn(axios, 'get').mockImplementationOnce(async () => (mockData));
  const mockedParse = jest.spyOn(url, 'parse').mockImplementationOnce((): any => ({
    hostname: 'www.someUrl.com',
  }));

  const result = await downloadIcon(URL);

  expect(mockedGet).toHaveBeenCalledWith(URL, { responseType: 'arraybuffer' });
  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(mockedFileType).toHaveBeenCalledWith(mockData.data);
  expect(result).toHaveProperty('ext', '.png');
});

test('Returns null if the response status is 404', async () => {
  const mockData = { status: 404 };
  const mockedGet = jest.spyOn(axios, 'get').mockImplementationOnce(async () => (mockData));
  const mockedParse = jest.spyOn(url, 'parse').mockImplementationOnce((): any => {});

  const result = await downloadIcon(URL);

  expect(mockedGet).toHaveBeenCalledWith(URL, { responseType: 'arraybuffer' });
  expect(mockedFileType).not.toHaveBeenCalled();
  expect(mockedParse).not.toHaveBeenCalled();
  expect(result).toBe(null);
});

test('Returns null if there is no filetype', async () => {
  const mockData = { data: 'someData' };
  const mockedGet = jest.spyOn(axios, 'get').mockImplementationOnce(async () => (mockData));
  const mockedParse = jest.spyOn(url, 'parse').mockImplementationOnce((): any => {});
  mockedFileType.mockImplementationOnce(() => undefined);

  const result = await downloadIcon(URL);

  expect(mockedGet).toHaveBeenCalledWith(URL, { responseType: 'arraybuffer' });
  expect(mockedFileType).toHaveBeenCalled();
  expect(mockedParse).not.toHaveBeenCalled();
  expect(result).toBe(null);
});
