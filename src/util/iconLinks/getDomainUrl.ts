import { format, parse, UrlWithStringQuery } from 'url';

export default function getDomainUrl(someUrl: string): string {
  const parsedUrl: UrlWithStringQuery = parse(someUrl);
  parsedUrl.pathname = null;
  return format(parsedUrl);
}
