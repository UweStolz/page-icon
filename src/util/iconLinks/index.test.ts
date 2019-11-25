import cheerio from 'cheerio';
import url from 'url';
import * as linkTagLinks from './linkTagLinks';
import * as metaTagLinks from './metaTagLinks';
import * as getDomainUrl from './getDomainUrl';

import getIconLinks from './index';

const mockedDom = `
<head>
    <meta content="default" />
    <meta content="https://www.someurl.com/" />
    <meta property="og:image" content="https://www.someurl.com/images/fb_icon_325x325.png" />
    <meta property="og:image" content="https://www.someurl.com/some/image.jpg" />
    <link href="https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico" />
    <link href="https://www.someurl.com/some/image.jpg" />
    <link href="https://www.someurl.com/not/an/image" />
</head>
`;

test('Get icon links', () => {
  const URL = 'https://someUrl.com/';
  const domainUrl = 'https://someUrl.com';
  const mockedLoad = jest.spyOn(cheerio, 'load');
  const mockedLinkTagLinks = jest.spyOn(linkTagLinks, 'default')
    .mockImplementationOnce(() => ['https://static.xx.fbcdn.net/rsrc.php/yz/r/KFyVIAWzntM.ico', 'https://www.someurl.com/some/image.jpg']);
  const mockedMetaTagLinks = jest.spyOn(metaTagLinks, 'default')
    .mockImplementationOnce(() => ['https://www.someurl.com/images/fb_icon_325x325.png', 'https://www.someurl.com/some/image.jpg']);
  const mockedResolve = jest.spyOn(url, 'resolve');
  const mockedGetDomainUrl = jest.spyOn(getDomainUrl, 'default').mockImplementationOnce(() => domainUrl);

  const iconLinks = getIconLinks(URL, mockedDom);

  expect(mockedLoad).toHaveBeenCalledWith(mockedDom);
  expect(mockedLinkTagLinks).toHaveBeenCalled();
  expect(mockedMetaTagLinks).toHaveBeenCalled();
  expect(mockedGetDomainUrl).toHaveBeenCalledWith(URL);
  expect(mockedResolve).toHaveBeenCalledWith(URL, expect.anything());
  expect(mockedResolve).toHaveBeenCalledWith(domainUrl, 'apple-touch-icon.png');
  expect(iconLinks.length).toBe(5);
});
