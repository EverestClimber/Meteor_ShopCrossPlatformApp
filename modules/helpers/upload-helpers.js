import { RNS3 } from 'react-native-aws3';
import uuidV4 from 'uuid/v4'

const s3options = {
  keyPrefix: "uploads/",
  bucket: "veg-corp",
  region: "us-east-1",
  accessKey: "AKIAJMIQXUNQZAUFNOXA",
  secretKey: "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",
  successActionStatus: 201
}


export const handleFileUpload = (file, callback) => {
      let fileToUpload = {
        uri: file.uri,
        name: uuidV4(),
        type: "image/png"
      }
      RNS3.put(fileToUpload, s3options).then(({ status, body }) => {
        if (status !== 201) {
          console.error("Failed to upload image to S3");
          callback({ reason: "Failed to upload image to S3" });
        }
        callback(null, body.postResponse.location);
      });

};
