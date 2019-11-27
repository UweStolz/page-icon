export namespace PageIcon {
    export type Extension = '.jpg' | '.png' | '.ico';
    export type MimeType = 'image/jpeg' | 'image/png' | 'image/x-icon';

    export interface IconResponse {
        source: string;
        name: string | null;
        data: Buffer | string;
        size: number;
        ext: Extension;
        mime: MimeType;
    }
}
