import { Express } from "express";

import * as authService from "../service/auth";

export const authController = (app: Express) => {
  app.post("/login", (req, res) => {
    res.send(authService.login());
  });

  app.post("/logout", (req, res) => {
    res.send(authService.logout());
  });

  app.post("/register", (req, res) => {
    res.send(authService.register());
  });
};
