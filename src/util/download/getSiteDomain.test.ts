import url from 'url';
import getSiteDomain from './getSiteDomain';

test('Returns the hostname of the given url', () => {
  const URL = 'https://www.someurl.com';
  const mockedParse = jest.spyOn(url, 'parse');
  const result = getSiteDomain(URL);
  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(result).toBeDefined();
});

test('Returns null if an invalid url is given', () => {
  const URL = 'notAnUrl';
  const mockedParse = jest.spyOn(url, 'parse');
  const result = getSiteDomain(URL);
  expect(mockedParse).toHaveBeenCalledWith(URL);
  expect(result).toBe(null);
});
