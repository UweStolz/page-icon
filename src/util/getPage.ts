import axios from 'axios';

export default async function getPage(pageUrl: string): Promise<string|Buffer> {
  const response = await axios.get(pageUrl);
  return response.data;
}
