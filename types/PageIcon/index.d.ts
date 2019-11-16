
    declare namespace PageIcon {
        interface IconResponse {
            source: string;
            name: string;
            data: Buffer | string;
            size: number;
            ext: string;
            mime: string;
        }
    }