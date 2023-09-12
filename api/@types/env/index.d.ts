declare namespace NodeJS {
    interface ProcessEnv {
        APP_URL: string | undefined;
        PORT: string | undefined;
        DB_HOST: string | undefined;
        DB_PORT: string | undefined;
        DB_USERNAME: string | undefined;
        DB_PASSWORD: string | undefined;
        DB_NAME: string | undefined;
        SECRET_KEY: string | undefined;
        JWT_EXPIRATION: string | undefined;
        AWS_SECRET_ACCES_KEY: string;
        AWS_ACCESS_KEY: string;
        AWS_DEFAULT_REGION: string;
        AWS_BUCKET_NAME: string;
    }
}