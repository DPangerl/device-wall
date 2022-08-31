import AWS from "aws-sdk";
import config from "../config";

export class S3 {
  s3: AWS.S3;
  Bucket: string;
  constructor() {
    this.Bucket = config.s3.bucket;
    this.s3 = new AWS.S3({
      accessKeyId: config.s3.accessKeyId,
      secretAccessKey: config.s3.secretAccessKey,
      endpoint: new AWS.Endpoint(config.s3.endpoint),
      s3ForcePathStyle: true,
    });
  }

  async uploadFile(Body: Buffer, Key: string, ContentType: string): Promise<AWS.S3.ManagedUpload.SendData> {
    return new Promise((resolve, reject) => {
      this.s3.upload({ Key, ContentType, Bucket: this.Bucket, Body }, function (err, data) {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  async fetchFile(Key: string): Promise<AWS.S3.GetObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.getObject({ Bucket: this.Bucket, Key }, function (err, data) {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }

  async deleteFile(Key: string): Promise<AWS.S3.DeleteObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject({ Bucket: this.Bucket, Key }, function (err, data) {
        if (err) return reject(err);
        return resolve(data);
      });
    });
  }
}
