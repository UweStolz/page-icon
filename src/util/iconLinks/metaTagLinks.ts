export default function metaTagLinks($: CheerioStatic): string[] {
  const links: string[] = [];
  $('meta').each((_index: number, element: CheerioElement) => {
    const property: string|undefined = $(element).attr('property');
    if (property === 'og:image') {
      const graphImageUrl = $(element).attr('content');
      if (graphImageUrl) { links.push(graphImageUrl); }
    }
  });
  return links;
}
