import isHrefIcon from './isHrefIcon';

export default function linkTagLinks($: CheerioStatic): string[] {
  const links: string[] = [];
  $('link').each((_index: number, element: CheerioElement) => {
    const href: string|undefined = $(element).attr('href');
    if (href) {
      if (isHrefIcon(href)) {
        links.push(href);
      }
    }
  });
  return links;
}
