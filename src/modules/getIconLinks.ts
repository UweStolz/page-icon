import { load } from 'cheerio';
import url, { UrlWithStringQuery } from 'url';

function hrefIsIcon(href: string): boolean {
  const regex = /((icon.*\.(png|jpg))|(\w+\.ico))/;
  return regex.test(href);
}

function getDomainUrl(someUrl: string): string {
  const parsedUrl: UrlWithStringQuery = url.parse(someUrl);
  parsedUrl.pathname = null;
  return url.format(parsedUrl);
}

function linkTagLinks($: CheerioStatic): string[] {
  const links: string[] = [];
  $('link').each((index: number, element: CheerioElement) => {
    const href: string = $(element).attr('href');
    if (hrefIsIcon(href)) {
      links.push(href);
    }
  });
  return links;
}

function metaTagLinks($: CheerioStatic): string[] {
  const links: string[] = [];
  $('meta').each((index: number, element: CheerioElement) => {
    const property: string = $(element).attr('property');
    if (property === 'og:image') {
      const graphImageUrl = $(element).attr('content');
      links.push(graphImageUrl);
    }
  });
  return links;
}

export default function getIconLinks(rootUrl: string, dom: string|Buffer): string[] {
  const $: CheerioStatic = load(dom);
  let iconLinks: string[] = [];

  iconLinks = iconLinks.concat(linkTagLinks($));
  iconLinks = iconLinks.concat(metaTagLinks($));

  iconLinks = iconLinks.map((iconLink) => url.resolve(rootUrl, iconLink));

  iconLinks.push(url.resolve(getDomainUrl(rootUrl), 'apple-touch-icon.png'));
  return iconLinks;
}
