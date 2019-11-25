/* eslint-disable @typescript-eslint/no-explicit-any */
import url from 'url';
import getSiteDomain from './getSiteDomain';

test('Returns the hostname of the given url', () => {
  const mockedResult = {
    protocol: 'https:',
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
    href: 'https://www.someurl.com/',
  };
  const URL = 'https://www.someurl.com';
  const mockedParse = jest.spyOn(url, 'parse').mockImplementationOnce((): any => mockedResult);
  const result = getSiteDomain(URL);
  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(result).toBeDefined();
});

test('Returns null if an invalid url is given', () => {
  const mockedResult = {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: null,
    query: null,
    pathname: 'notAnUrl',
    path: 'notAnUrl',
    href: 'notAnUrl',
  };
  const URL = 'notAnUrl';
  const mockedParse = jest.spyOn(url, 'parse').mockImplementationOnce((): any => mockedResult);
  const result = getSiteDomain(URL);
  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(result).toBe(null);
});
