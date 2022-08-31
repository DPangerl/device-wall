import { Router } from "express";

export function dashboardRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.redirect("/dashboard");
  });

  router.get("/dashboard", (req, res) => {
    res.send("hello");
  });

  return router;
}
