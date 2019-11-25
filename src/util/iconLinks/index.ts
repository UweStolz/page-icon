import { load } from 'cheerio';
import { resolve } from 'url';
import linkTagLinks from './linkTagLinks';
import metaTagLinks from './metaTagLinks';
import getDomainUrl from './getDomainUrl';

export default function getIconLinks(rootUrl: string, dom: string|Buffer): string[] {
  const $: CheerioStatic = load(dom);
  let iconLinks: string[] = [];

  iconLinks = iconLinks.concat(linkTagLinks($));
  iconLinks = iconLinks.concat(metaTagLinks($));

  iconLinks = iconLinks.map((iconLink) => resolve(rootUrl, iconLink));

  const resolvedUrlForAppleTouchIcon: string = resolve(getDomainUrl(rootUrl), 'apple-touch-icon.png');
  iconLinks.push(resolvedUrlForAppleTouchIcon);
  return iconLinks;
}
