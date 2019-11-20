/* eslint-disable @typescript-eslint/no-explicit-any */

import { load } from 'cheerio';
import * as isHrefIcon from './isHrefIcon';
import linkTagLinks from './linkTagLinks';

const mockedDom = `
<head>
    <link href="https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico" />
    <link href="https://www.facebook.com/some/image.jpg" />
    <link href="https://www.facebook.com/not/an/image" />
</head>
`;

test('Get href tag links', () => {
  const $ = load(mockedDom);
  const mockedIsHrefIcon = jest.spyOn(isHrefIcon, 'default')
    .mockImplementationOnce((): any => true)
    .mockImplementationOnce((): any => true)
    .mockImplementationOnce((): any => false);
  const links = linkTagLinks($);

  expect(mockedIsHrefIcon).toHaveBeenCalledWith('https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico');
  expect(mockedIsHrefIcon).toHaveBeenCalledWith('https://www.facebook.com/some/image.jpg');
  expect(links[1]).toBe('https://www.facebook.com/some/image.jpg');
  expect(links[2]).toBe(undefined);
});
