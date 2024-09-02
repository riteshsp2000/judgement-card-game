import { Express } from "express";

import * as healthService from "../service/health";

export const healthController = (app: Express) => {
  app.get("/health", (req, res) => {
    res.send(healthService.healthCheck());
  });
};
