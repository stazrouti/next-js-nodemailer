import { Request, Response } from "express";
import { File } from "formidable";
import Formidable from "formidable-serverless";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(req, res) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });

    form
      .on("file", (name, file) => {
        const data = fs.readFileSync(file.path);
        const timestamp = Date.now(); // Get current timestamp
        const fileName = `${timestamp}_${file.name}`; // Append timestamp to the filename
        const filePath = path.join("public/upload", fileName);

        fs.writeFileSync(filePath, data);
        fs.unlinkSync(file.path);

        // Include the filename in the response
        resolve(res.status(200).send({ message: "done", filename: fileName }));
      })
      .on("aborted", () => {
        reject(res.status(500).send("Aborted"));
      })
      .on("end", () => {
        // You can also resolve without the filename if you don't need it in the response
        resolve(res.status(200).send("done"));
      });

    await form.parse(req);
  });
}
