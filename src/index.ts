import url from 'url';
import {
  getPage, getIconLinks, downloadIcons, findBestIcon,
} from './util';

function isHttps(pageUrl: string): boolean {
  const parsedUrl = url.parse(pageUrl);
  const isUrlProtocolHttps = parsedUrl.protocol === 'https:';
  return isUrlProtocolHttps;
}

function makeHttps(pageUrl: string): string {
  const parsed = url.parse(pageUrl);
  parsed.protocol = 'https:';
  const formattedUrl = url.format(parsed);
  return formattedUrl;
}

export default async function pageIcon(pageUrl: string, extension?: PageIcon.Extension): Promise<PageIcon.IconResponse> {
  const bestWithPref = (icons: PageIcon.IconResponse[]): PageIcon.IconResponse => findBestIcon(icons, extension);

  const dom = await getPage(pageUrl);
  const iconLinks = getIconLinks(pageUrl, dom);
  const icons = await downloadIcons(iconLinks);
  const result = bestWithPref(icons);

  if (result || isHttps(pageUrl)) {
    return result;
  }
  const httpsUrl = makeHttps(pageUrl);
  return pageIcon(httpsUrl, extension);
}
