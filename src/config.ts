import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export default {
  serverPort: process.env.SERVER_PORT ?? "",
  accessControlOrigin: process.env.ACCESS_CONTROL_ORIGIN ?? "",
  mysql: {
    user: process.env.MYSQL_USER ?? "",
    password: process.env.MYSQL_PASSWORD ?? "",
    database: process.env.MYSQL_DATABASE ?? "",
  },
  minio: {
    rootUser: process.env.MINIO_ROOT_USER ?? "",
    password: process.env.MINIO_ROOT_PASSWORD ?? "",
  },
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: process.env.SMTP_PORT ?? "",
    user: process.env.SMTP_USER ?? "",
    password: process.env.SMTP_PASSWORD ?? "",
  },
  apolloServerConfig: {
    introspection: true,
    debug: true,
  },
  s3: {
    bucket: process.env.S3_BUCKET ?? "unknown",
    endpoint: process.env.S3_ENDPOINT ?? "",
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
};
