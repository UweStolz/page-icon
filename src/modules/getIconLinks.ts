import { load } from 'cheerio';
import url, { UrlWithStringQuery } from 'url';

function hrefIsIcon(href: string): boolean {
  return /((icon.*\.(png|jpg))|(\w+\.ico))/.test(href);
}

function getDomainUrl(someUrl: string): string {
  const parsedUrl: UrlWithStringQuery = url.parse(someUrl);
  parsedUrl.pathname = null;
  return url.format(parsedUrl);
}

function linkTagLinks($: any): any[] {
  const links: any[] = [];
  $('link').each((index: number, element: any) => {
    const href = $(element).attr('href');
    if (!hrefIsIcon(href)) {
      return;
    }
    links.push(href);
  });
  return links;
}

function metaTagLinks($: any): any[] {
  const links: any[] = [];
  $('meta').each((index: number, element: any) => {
    const property = $(element).attr('property');
    if (property !== 'og:image') {
      return;
    }

    const graphImageUrl = $(element).attr('content');
    links.push(graphImageUrl);
  });

  return links;
}

export default function getIconLinks(rootUrl: string, dom: string|Buffer): string[] {
  const $ = load(dom);
  let iconLinks: any[] = [];

  iconLinks = iconLinks.concat(linkTagLinks($));
  iconLinks = iconLinks.concat(metaTagLinks($));

  iconLinks = iconLinks.map((iconLink) => url.resolve(rootUrl, iconLink));

  iconLinks.push(url.resolve(getDomainUrl(rootUrl), 'apple-touch-icon.png'));
  return iconLinks;
}
