export default function metaTagLinks($: CheerioStatic): string[] {
  const links: string[] = [];
  $('meta').each((_index: number, element: CheerioElement) => {
    const property: string = $(element).attr('property');
    if (property === 'og:image') {
      const graphImageUrl = $(element).attr('content');
      links.push(graphImageUrl);
    }
  });
  return links;
}
