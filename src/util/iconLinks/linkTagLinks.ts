import isHrefIcon from './isHrefIcon';

export default function linkTagLinks($: CheerioStatic): string[] {
  const links: string[] = [];
  $('link').each((_index: number, element: CheerioElement) => {
    const href: string = $(element).attr('href');
    if (isHrefIcon(href)) {
      links.push(href);
    }
  });
  return links;
}
