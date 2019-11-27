import findBestIcon from './findBestIcon';
import { PageIcon } from '../../types';

const iconResponses: PageIcon.IconResponse[] = [
  {
    data: 'someData',
    ext: '.ico',
    mime: 'image/x-icon',
    name: 'someName',
    size: 5,
    source: 'https://www.someUrl.com',
  },
  {
    data: 'someOtherData',
    ext: '.jpg',
    mime: 'image/jpeg',
    name: 'someName',
    size: 10,
    source: 'https://www.someUrl.com',
  },
  {
    data: 'someMoreData',
    ext: '.png',
    mime: 'image/png',
    name: 'someName',
    size: 8,
    source: 'https://www.someUrl.com',
  },
];

test('Returns the biggest icon', () => {
  const icon = findBestIcon(iconResponses);
  expect(icon).toHaveProperty('size', 10);
});

test('Returns the icon matching the given extension', () => {
  const icon = findBestIcon(iconResponses, '.png');
  expect(icon).toHaveProperty('size', 8);
});
