/* eslint-disable @typescript-eslint/no-explicit-any */
import url from 'url';
import getDomainUrl from './getDomainUrl';

const mockedUrlObject = {
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
const URL = 'https://www.SomeUrl.com/';

test('Gives out the proper domain URL', () => {
  const mockedParse = jest.spyOn(url, 'parse').mockImplementationOnce((): any => mockedUrlObject);
  const mockedFormat = jest.spyOn(url, 'format').mockImplementationOnce(() => 'https://www.someurl.com');

  const result = getDomainUrl(URL);

  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(mockedFormat).toHaveBeenCalled();
  expect(result).toBe('https://www.someurl.com');
});
