function sortIconsBySize(icons: PageIcon.IconResponse[]): PageIcon.IconResponse[] {
  return icons.sort((a, b) => (a.size < b.size ? 1 : -1));
}

export default function findBestIcon(icons: PageIcon.IconResponse[], extension?: PageIcon.Extension): PageIcon.IconResponse {
  const sorted = sortIconsBySize(icons);
  if (extension) {
    // eslint-disable-next-line no-restricted-syntax
    for (const icon of sorted) {
      if (icon.ext === extension) {
        return icon;
      }
    }
  }
  return sorted[0];
}
