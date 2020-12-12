import { fromBuffer, FileTypeResult } from 'file-type';

export default async function getFileType(data: ArrayBuffer): Promise<FileTypeResult | undefined> {
  const fileType = fromBuffer(data);
  return fileType;
}
