export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<import("mysql2/promise").Pool>;
}[];
