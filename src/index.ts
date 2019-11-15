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

export default async function main(pageUrl: string, options: any = {}): Promise<any> {
  const bestWithPref = (icons: any) => findBestIcon(icons, options.ext);

  return getPage(pageUrl)
    .then((dom) => getIconLinks(pageUrl, dom))
    .then(downloadIcons)
    .then(bestWithPref)
    .then((result) => {
      if (result || isHttps(pageUrl)) {
        return result;
      }

      const httpsUrl = makeHttps(pageUrl);
      return main(httpsUrl, options);
    });
}

// FIXME - Test
async function execute(): Promise<void> {
  try {
    const icon = await main('https://www.facebook.com/');
    console.log('ICON: ', icon);
  } catch (err) {
    console.error(err);
  }
}

execute();
