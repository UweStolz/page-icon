
    import { MimeType } from 'file-type';

    declare global {
        namespace PageIcon {
            type Extension = '.jpg' | '.png' | '.ico';
            
            interface IconResponse {
                source: string;
                name: string|null;
                data: Buffer | string;
                size: number;
                ext: Extension;
                mime: MimeType;
            }
        }
    }