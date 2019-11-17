import url from 'url';
import getDomainUrl from './getDomainUrl';

test('Gives out the proper domain URL', () => {
  const spyParse = jest.spyOn(url, 'parse');
  const spyFormat = jest.spyOn(url, 'format');

  const URL = 'https://www.SomeUrl.com/';
  const result = getDomainUrl(URL);

  expect(spyParse).toHaveBeenCalledWith(URL);
  expect(spyFormat).toHaveBeenCalled();
  expect(result).toBe('https://www.someurl.com');
});
