/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { load } from 'cheerio';
import * as isHrefIcon from './isHrefIcon';
import linkTagLinks from './linkTagLinks';

const mockedDom = `
<head>
    <link href="https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico" />
    <link href="https://www.someurl.com/some/image.jpg" />
    <link href="https://www.someurl.com/not/an/image" />
</head>
`;

const mockedEmptyDom = `
<head>
    <link href="" />
    <link href="" />
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
  expect(mockedIsHrefIcon).toHaveBeenCalledWith('https://www.someurl.com/some/image.jpg');
  expect(links[1]).toBe('https://www.someurl.com/some/image.jpg');
  expect(links[2]).toBe(undefined);
});

test('Do not collect empty tag links', () => {
  const $ = load(mockedEmptyDom);
  const mockedIsHrefIcon = jest.spyOn(isHrefIcon, 'default')
    .mockImplementationOnce((): any => {});
  const links = linkTagLinks($);

  expect(mockedIsHrefIcon).not.toHaveBeenCalled();
  expect(links[0]).toBe(undefined);
  expect(links[1]).toBe(undefined);
});
