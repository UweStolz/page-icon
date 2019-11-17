import { format, parse, UrlWithStringQuery } from 'url';

export default function getDomainUrl(url: string): string {
  const parsedUrl: UrlWithStringQuery = parse(url);
  parsedUrl.pathname = null;
  const formattedUrl = format(parsedUrl);
  return formattedUrl;
}
