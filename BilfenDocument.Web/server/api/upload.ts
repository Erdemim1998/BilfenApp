import formidable from "formidable";
import { defineEventHandler, createError } from "h3";
import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  debugger;
  const form = formidable({ multiples: false });

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        return reject(
          createError({ statusCode: 500, message: "File upload error" })
        );
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file) {
        return reject(
          createError({ statusCode: 400, message: "No file uploaded" })
        );
      }

      const uploadDir = path.join("public", "assets", "documents");
      const uploadPath = path.join(
        uploadDir,
        file.originalFilename || "uploaded_file"
      );

      fs.mkdirSync(uploadDir, { recursive: true });

      fs.rename(file.filepath, uploadPath, (err) => {
        if (err) {
          return reject(
            createError({ statusCode: 500, message: "File save error" })
          );
        }
        resolve({
          message: "File uploaded successfully",
          filePath: uploadPath,
        });
      });
    });
  });
});

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};
