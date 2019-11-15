import downloadIcon from './downloadIcon';

export default function downloadIcons(iconUrls) {
  const promises = iconUrls.map(downloadIcon);
  return Promise.all(promises)
    .then((iconPaths) => iconPaths.filter((element) => !!element));
}
