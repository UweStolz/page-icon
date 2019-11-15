import cheerio from 'cheerio';
import url from 'url';

function hrefIsIcon(href) {
  return /((icon.*\.(png|jpg))|(\w+\.ico))/.test(href);
}

function getDomainUrl(someUrl) {
  const parsedUrl = url.parse(someUrl);
  parsedUrl.pathname = null;
  return parsedUrl.format();
}

function linkTagLinks($) {
  const links = [];
  $('link').each((index, element) => {
    const href = $(element).attr('href');
    if (!hrefIsIcon(href)) {
      return;
    }
    links.push(href);
  });
  return links;
}

function metaTagLinks($) {
  const links = [];
  $('meta').each((index, element) => {
    const property = $(element).attr('property');
    if (property !== 'og:image') {
      return;
    }

    const graphImageUrl = $(element).attr('content');
    links.push(graphImageUrl);
  });

  return links;
}

export default function getIconLinks(rootUrl, dom) {
  const $ = cheerio.load(dom);
  let iconLinks = [];

  iconLinks = iconLinks.concat(linkTagLinks($));
  iconLinks = iconLinks.concat(metaTagLinks($));

  iconLinks = iconLinks.map((iconLink) => url.resolve(rootUrl, iconLink));

  iconLinks.push(url.resolve(getDomainUrl(rootUrl), 'apple-touch-icon.png'));
  return iconLinks;
}
