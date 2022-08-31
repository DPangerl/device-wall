import config from "./config";
import express from "express";
import bearerToken from "express-bearer-token";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { fileRouter } from "@routers/files";
import { dashboardRouter } from "@routers/dashboard";
import { devicesRouter } from "@routers/devices";

const app = express()
  .use(cors({ origin: config.accessControlOrigin.split(","), credentials: true }))
  .use(bearerToken())
  .use(bodyParser.json())
  .use(cookieParser());

app.use(dashboardRouter());
app.use(devicesRouter());
app.use(fileRouter());

app.listen({ port: config.serverPort }, () => {
  const startInfo = `\n------------------------\nServer ready 🤘:\nhttp://localhost:${config.serverPort}\n------------------------\n`;
  console.info(startInfo);
});
