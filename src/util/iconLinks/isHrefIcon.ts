export default function isHrefIcon(href: string): boolean {
  const regex = /((icon.*\.(png|jpg))|(\w+\.ico))/;
  return regex.test(href);
}
