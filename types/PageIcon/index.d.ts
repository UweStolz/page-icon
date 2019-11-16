declare namespace PageIcon {
    type Extension = '.jpg' | '.png' | '.ico';
    type MimeType = 'image/jpeg' | 'image/png' | 'image/x-icon';

    interface IconResponse {
        source: string;
        name: string | null;
        data: Buffer | string;
        size: number;
        ext: Extension;
        mime: MimeType;
    }
}
