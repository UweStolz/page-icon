import axios from 'axios';
import getPage from './getPage';

test('Gets the data from the response', async () => {
  jest.spyOn(axios, 'get').mockImplementationOnce(async () => ({
    data: 'someData',
  }));
  const response = await getPage('https://www.someUrl.com');
  expect(typeof response).toBe('string');
});
