
    declare namespace PageIcon {
        interface IconResponse {
            source: string;
            name: string|null;
            data: Buffer | string;
            size: number;
            ext: string;
            mime: string;
        }
    }