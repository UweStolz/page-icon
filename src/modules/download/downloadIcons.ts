import downloadIcon from './downloadIcon';

export default async function downloadIcons(iconUrls: string[]): Promise<PageIcon.IconResponse[]> {
  const promises = iconUrls.map(downloadIcon);
  const IconResponses: PageIcon.IconResponse[] = await Promise.all(promises);
  const filteredResponses: PageIcon.IconResponse[] = IconResponses.filter((element) => !!element);
  return filteredResponses;
}
