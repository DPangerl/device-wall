import { Router } from "express";

export function devicesRouter() {
  const router = Router();

  router.get("/device/:deviceId", (req, res) => {
    res.send("done");
  });

  return router;
}
