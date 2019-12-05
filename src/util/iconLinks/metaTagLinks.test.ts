import { load } from 'cheerio';
import metaTagLinks from './metaTagLinks';

const mockedDom = `
<head>
    <meta content="default" />
    <meta content="https://www.someurl.com/" />
    <meta property="og:image" content="https://www.someurl.com/images/fb_icon_325x325.png" />
    <meta property="og:image" content="https://www.someurl.com/some/image.jpg" />
</head>
`;

const mockedEmptyDom = `
<head>
    <meta content="default" />
    <meta content="https://www.someurl.com/" />
    <meta property="og:image" content="" />
    <meta property="og:image" content="" />
</head>
`;

test('Get meta tag links', async () => {
  const $: CheerioStatic = load(mockedDom);
  const links = metaTagLinks($);
  expect(links.length).toBe(2);
  expect(links[1]).toBe('https://www.someurl.com/some/image.jpg');
});

test('Empty meta tag links do not get collected', async () => {
  const $: CheerioStatic = load(mockedEmptyDom);
  const links = metaTagLinks($);
  expect(links.length).toBe(0);
});
