import { Router } from "express";
import { S3 } from "../modules/s3";
import multer from "multer";
import { randomUUID } from "crypto";

export function fileRouter() {
  const upload = multer();
  const router = Router();

  router.post("/upload", upload.any(), async (req, res) => {
    if (!req.files?.length) return res.status(500).end("No files to store");
    if (!(req.files instanceof Array)) return res.end();

    const uploads = req.files.map(async (file) => {
      const s3 = new S3();
      const key = `${randomUUID()}.${file.originalname.split(".").pop()}`;
      return s3.uploadFile(file.buffer, key, file.mimetype);
    });

    Promise.all(uploads)
      .then((uploadedFiles) => {
        const result = uploadedFiles.map((item) => ({ url: item.Location, key: item.Key }));
        res.json(result);
      })
      .catch(() => {
        res.status(500).end("Something went wrong");
      });
    return;
  });

  router.use("/media", (req, res) => {
    const fileName = req.path.split("/")[1];
    const s3 = new S3();
    s3.fetchFile(fileName)
      .then(({ ContentType, Body }) => {
        if (!ContentType) {
          res.status(500).end("Something went wrong");
          return;
        }
        res.set("cache-control", "public, max-age=300");
        res.type(ContentType).send(Body);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).end("File does not exist");
      });
  });

  return router;
}
