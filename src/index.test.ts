/* eslint-disable @typescript-eslint/no-explicit-any */
import url from 'url';
import * as util from './util';

// eslint-disable-next-line import/first
import pageIcon from './index';
import { PageIcon } from '../types';

const mockedResponseData = `
<head>
    <meta content="default" />
    <meta content="https://www.someurl.com/" />
    <meta property="og:image" content="https://www.someurl.com/images/fb_icon_325x325.png" />
    <link href="https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico" />
    <link href="https://www.someurl.com/not/an/image" />
</head>
`;

const mockedIconLinks = [
  'https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico',
  'https://www.someurl.com/images/fb_icon_325x325.png',
  'http://www.someurl.com/apple-touch-icon.png',
];

const mockedIconResponses: PageIcon.IconResponse[] = [
  {
    data: 'someData',
    ext: '.ico',
    mime: 'image/x-icon',
    name: 'someName',
    size: 5,
    source: 'https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico',
  },
  {
    data: 'someOtherData',
    ext: '.png',
    mime: 'image/png',
    name: 'someName',
    size: 10,
    source: 'https://www.someurl.com/images/fb_icon_325x325.png',
  },
  {
    data: 'someMoreData',
    ext: '.png',
    mime: 'image/png',
    name: 'someName',
    size: 8,
    source: 'https://www.someurl.com/apple-touch-icon.png',
  },
];

test('Get the best icon from the given page', async () => {
  const URL = 'http://www.someurl.com/';
  const mockedParse = jest.spyOn(url, 'parse').mockImplementation((): any => {});
  const mockedFormat = jest.spyOn(url, 'format').mockImplementation((): any => {});
  const mockedFindBestIcon = jest.spyOn(util, 'findBestIcon');
  const mockedGetPage = jest.spyOn(util, 'getPage').mockImplementation(async () => mockedResponseData);
  const mockedGetIconLinks = jest.spyOn(util, 'getIconLinks').mockImplementation(() => mockedIconLinks);
  const mockedDownloadIcons = jest.spyOn(util, 'downloadIcons').mockImplementation(async (): Promise<PageIcon.IconResponse[]> => mockedIconResponses);
  const icon = await pageIcon(URL);

  expect(mockedParse).not.toHaveBeenCalled();
  expect(mockedFormat).not.toHaveBeenCalled();
  expect(mockedGetPage).toHaveBeenCalledWith(URL);
  expect(mockedGetIconLinks).toHaveBeenCalledWith(URL, expect.anything());
  expect(mockedDownloadIcons).toHaveBeenCalled();
  expect(mockedFindBestIcon).toHaveBeenCalled();
  expect(icon).toBeDefined();
});

test('Get the best icon from the given page with a specific extension', async () => {
  const URL = 'http://www.someurl.com/';
  const mockedParse = jest.spyOn(url, 'parse').mockImplementation((): any => {});
  const mockedFormat = jest.spyOn(url, 'format').mockImplementation((): any => {});
  const mockedFindBestIcon = jest.spyOn(util, 'findBestIcon');
  const mockedGetPage = jest.spyOn(util, 'getPage').mockImplementation(async () => mockedResponseData);
  const mockedGetIconLinks = jest.spyOn(util, 'getIconLinks').mockImplementation(() => mockedIconLinks);
  const mockedDownloadIcons = jest.spyOn(util, 'downloadIcons').mockImplementation(async (): Promise<PageIcon.IconResponse[]> => mockedIconResponses);
  const icon = await pageIcon(URL, '.ico');

  expect(mockedParse).not.toHaveBeenCalled();
  expect(mockedFormat).not.toHaveBeenCalled();
  expect(mockedGetPage).toHaveBeenCalledWith(URL);
  expect(mockedGetIconLinks).toHaveBeenCalledWith(URL, expect.anything());
  expect(mockedDownloadIcons).toHaveBeenCalled();
  expect(mockedFindBestIcon).toHaveBeenCalled();
  expect(icon).toHaveProperty('ext', '.ico');
});

test('If the given page, has http and leads to no result retry with https', async () => {
  const mockedParsedUrl = {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.someurl.com',
    port: null,
    hostname: 'www.someurl.com',
    hash: null,
    search: null,
    query: null,
    pathname: '/',
    path: '/',
    href: 'http://www.someurl.com/',
  };
  const URL = 'http://www.someurl.com/';
  const mockedParse = jest.spyOn(url, 'parse').mockImplementation((): any => mockedParsedUrl);
  const mockedFormat = jest.spyOn(url, 'format').mockImplementation((): any => 'https://www.someurl.com/');
  const mockedFindBestIcon = jest.spyOn(util, 'findBestIcon').mockImplementationOnce((): any => undefined);
  const mockedGetPage = jest.spyOn(util, 'getPage').mockImplementation(async () => mockedResponseData);
  const mockedGetIconLinks = jest.spyOn(util, 'getIconLinks').mockImplementation(() => mockedIconLinks);
  const mockedDownloadIcons = jest.spyOn(util, 'downloadIcons').mockImplementation(async (): Promise<PageIcon.IconResponse[]> => mockedIconResponses);
  const icon = await pageIcon(URL);

  expect(mockedParse).toHaveBeenCalledTimes(2);
  expect(mockedFormat).toHaveBeenCalled();
  expect(mockedGetPage).toHaveBeenCalledWith(URL);
  expect(mockedGetIconLinks).toHaveBeenCalledWith(URL, expect.anything());
  expect(mockedDownloadIcons).toHaveBeenCalled();
  expect(mockedFindBestIcon).toHaveBeenCalled();
  expect(icon).toBeDefined();
});
