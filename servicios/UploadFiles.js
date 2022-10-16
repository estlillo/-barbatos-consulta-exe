import axios from "axios";

export async function UploadFiles(files) {
  const res = files.map(async (file, index) => {
    console.log("s3 service starting..");
    return await UploadFileToS3(file, index);
  });

  return res;
}

export async function UploadFileToS3(file, index) {
  console.log("Uploading " + index);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("llave", file.llave);
  const result = await axios.post(
    "http://www.barbatos-dev.com:3001/api/files",
    formData
  );

  console.log("Uploaded " + index);

  return result;
}
