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
  const spyParse = jest.spyOn(url, 'parse').mockImplementationOnce((): any => mockedUrlObject);
  const spyFormat = jest.spyOn(url, 'format');

  const result = getDomainUrl(URL);

  expect(spyParse).toHaveBeenCalledWith(URL);
  expect(spyFormat).toHaveBeenCalled();
  expect(result).toBe('https://www.someurl.com');
});
