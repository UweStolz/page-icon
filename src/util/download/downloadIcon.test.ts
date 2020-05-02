/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import * as getFileType from './getFileType';
import * as getSiteDomain from './getSiteDomain';

const URL = 'https://www.someUrl.com';

jest.mock('file-type');

// eslint-disable-next-line import/first
import downloadIcon from './downloadIcon';

test('Downloads the icon from the given URL', async () => {
  const mockGetFileType = jest.spyOn(getFileType, 'default').mockImplementationOnce(async (): Promise<any> => ({ ext: 'png' }));
  const mockData = {
    data: new ArrayBuffer(100),
  };
  const mockedGet = jest.spyOn(axios, 'get').mockImplementationOnce(async () => (mockData));
  const mockedGetSiteDomain = jest.spyOn(getSiteDomain, 'default').mockImplementationOnce(() => null);

  const result = await downloadIcon(URL);

  expect(mockedGet).toHaveBeenCalledWith(URL, { responseType: 'arraybuffer' });
  expect(mockGetFileType).toHaveBeenCalledWith(mockData.data);
  expect(mockedGetSiteDomain).toHaveBeenCalledWith(URL);
  expect(result).toHaveProperty('ext', '.png');
});

test('Returns null if the response status is 404', async () => {
  const mockData = { status: 404 };
  const mockGetFileType = jest.spyOn(getFileType, 'default').mockImplementationOnce(async (): Promise<any> => {});
  const mockedGet = jest.spyOn(axios, 'get').mockImplementationOnce(async () => (mockData));
  const mockedGetSiteDomain = jest.spyOn(getSiteDomain, 'default').mockImplementationOnce((): any => {});

  const result = await downloadIcon(URL);

  expect(mockedGetSiteDomain).not.toHaveBeenCalled();
  expect(mockedGet).toHaveBeenCalledWith(URL, { responseType: 'arraybuffer' });
  expect(mockGetFileType).not.toHaveBeenCalled();
  expect(result).toBe(null);
});

test('Returns null if there is no filetype', async () => {
  const mockData = {
    data: new ArrayBuffer(100),
  };
  const mockedGet = jest.spyOn(axios, 'get').mockImplementationOnce(async () => (mockData));
  const mockGetFileType = jest.spyOn(getFileType, 'default').mockImplementationOnce(async () => undefined);
  const mockedGetSiteDomain = jest.spyOn(getSiteDomain, 'default').mockImplementationOnce((): any => {});

  const result = await downloadIcon(URL);

  expect(mockedGetSiteDomain).not.toHaveBeenCalled();
  expect(mockedGet).toHaveBeenCalledWith(URL, { responseType: 'arraybuffer' });
  expect(mockGetFileType).toHaveBeenCalled();
  expect(result).toBe(null);
});
