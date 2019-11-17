import isHrefIcon from './isHrefIcon';

test('Is true if the given link is an icon', () => {
  const result = isHrefIcon('https://www.someUrl.com/asdf.ico');
  expect(result).toBe(true);
});

test('Is false if the given link contains no icon', () => {
  const result = isHrefIcon('https://www.NotAnIcon.com');
  expect(result).toBe(false);
});
