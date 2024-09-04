import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

import { PORT } from "~/constant/env";
import { healthController } from "~/controller/health.controller";
import { authController } from "~/controller/auth.controller";
import { wssController } from "~/controller/wss.controller";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

healthController(app);
authController(app);
wssController(wss);

server.listen(PORT, () => console.log("SERVER STARTED ON PORT: " + PORT));
