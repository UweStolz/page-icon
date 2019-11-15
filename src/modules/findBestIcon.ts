function sortIconsBySize(icons: any): any {
  return icons.sort((a: any, b: any) => {
    if (a.size < b.size) {
      return 1;
    }
    return -1;
  });
}

/**
 *
 * @param icons
 * @param [ext]
 */
export default function findBestIcon(icons: any, ext: any): any {
  const sorted = sortIconsBySize(icons);
  if (ext) {
    // eslint-disable-next-line no-restricted-syntax
    for (const icon of sorted) {
      if (icon.ext === ext) {
        return icon;
      }
    }
  }
  return sorted[0];
}
