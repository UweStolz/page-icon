/* eslint-disable @typescript-eslint/no-explicit-any */
import url from 'url';
import * as util from './util';

// eslint-disable-next-line import/first
import pageIcon from './index';

test('Get the best icon from the given page', async () => {
  const URL = 'http://www.facebook.com/';
  const mockedParse = jest.spyOn(url, 'parse');
  const mockedFormat = jest.spyOn(url, 'format');
  const mockedFindBestIcon = jest.spyOn(util, 'findBestIcon');
  const mockedGetPage = jest.spyOn(util, 'getPage');
  const mockedGetIconLinks = jest.spyOn(util, 'getIconLinks');
  const mockedDownloadIcons = jest.spyOn(util, 'downloadIcons');
  const icon = await pageIcon(URL);

  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(mockedFormat).toHaveBeenCalled();
  expect(mockedGetPage).toHaveBeenCalledWith(URL);
  expect(mockedGetIconLinks).toHaveBeenCalledWith(URL, expect.anything());
  expect(mockedDownloadIcons).toHaveBeenCalled();
  expect(mockedFindBestIcon).toHaveBeenCalled();
  expect(icon).toBeDefined();
});

test('Get the best icon from the given page with a specific extension', async () => {
  const URL = 'http://www.facebook.com/';
  const mockedParse = jest.spyOn(url, 'parse');
  const mockedFormat = jest.spyOn(url, 'format');
  const mockedFindBestIcon = jest.spyOn(util, 'findBestIcon');
  const mockedGetPage = jest.spyOn(util, 'getPage');
  const mockedGetIconLinks = jest.spyOn(util, 'getIconLinks');
  const mockedDownloadIcons = jest.spyOn(util, 'downloadIcons');
  const icon = await pageIcon(URL, '.ico');

  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(mockedFormat).toHaveBeenCalled();
  expect(mockedGetPage).toHaveBeenCalledWith(URL);
  expect(mockedGetIconLinks).toHaveBeenCalledWith(URL, expect.anything());
  expect(mockedDownloadIcons).toHaveBeenCalled();
  expect(mockedFindBestIcon).toHaveBeenCalled();
  expect(icon).toHaveProperty('ext', '.ico');
});
