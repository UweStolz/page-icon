
const mockedIconUrls = [
  'https://www.example1.com',
  'https://www.example2.com',
];

const iconResponse: PageIcon.IconResponse = {
  source: 'https://www.example.com',
  name: 'someName',
  data: 'someData',
  size: 5,
  ext: '.png',
  mime: 'image/png',
};

const emptyIconResponse = null;

const mockedIconResponse = jest.fn();
jest.mock('./downloadIcon', () => mockedIconResponse);

// eslint-disable-next-line import/first
import downloadIcons from './downloadIcons';

test('Null responses will be filtered out', async () => {
  mockedIconResponse
    .mockImplementationOnce(() => iconResponse)
    .mockImplementationOnce(() => emptyIconResponse);

  const result = await downloadIcons(mockedIconUrls);
  expect(mockedIconResponse).toHaveBeenCalled();
  expect(result.length).toBe(1);
  expect(result[0]).toHaveProperty('name', 'someName');
});
