import downloadIcon from './downloadIcon';
import { PageIcon } from '../../../types';

export default async function downloadIcons(iconUrls: string[]): Promise<PageIcon.IconResponse[]> {
  const promises = iconUrls.map(downloadIcon);
  const IconResponses: (PageIcon.IconResponse | null)[] = await Promise.all(promises);
  const filteredResponses = IconResponses.filter((element) => !!element) as PageIcon.IconResponse[];
  return filteredResponses;
}
