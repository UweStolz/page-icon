import url, { UrlWithStringQuery } from 'url';

export default function getSiteDomain(siteUrl: string): string | null {
  const parsedUrl: UrlWithStringQuery = url.parse(siteUrl);
  return parsedUrl.hostname;
}
