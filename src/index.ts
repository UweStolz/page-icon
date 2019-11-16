import url from 'url';
import getPage from './modules/getPage';
import getIconLinks from './modules/getIconLinks';
import downloadIcons from './modules/download/downloadIcons';
import findBestIcon from './modules/findBestIcon';

function isHttps(pageUrl: string): boolean {
  return url.parse(pageUrl).protocol === 'https:';
}

function makeHttps(pageUrl: string): string {
  const parsed = url.parse(pageUrl);
  parsed.protocol = 'https:';
  return url.format(parsed);
}

export default async function pageIcon(pageUrl: string, options: any = {}): Promise<any> {
  const bestWithPref = (icons: any) => findBestIcon(icons, options.ext);

  const dom = await getPage(pageUrl);
  const iconLinks = getIconLinks(pageUrl, dom);
  const icons = await downloadIcons(iconLinks);
  const result = await bestWithPref(icons);
  if (result || isHttps(pageUrl)) {
    return result;
  }
  const httpsUrl = makeHttps(pageUrl);
  return pageIcon(httpsUrl, options);
}

// FIXME - Test
async function execute(): Promise<void> {
  try {
    const icon = await pageIcon('https://www.facebook.com/');
    console.log('ICON: ', icon);
  } catch (err) {
    console.error(err);
  }
}

execute();
