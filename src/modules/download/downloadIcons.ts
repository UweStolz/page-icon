import downloadIcon from './downloadIcon';

export default function downloadIcons(iconUrls: any): Promise < unknown[] > {
  const promises = iconUrls.map(downloadIcon);
  return Promise.all(promises)
    .then((iconPaths) => iconPaths.filter((element) => !!element));
}
