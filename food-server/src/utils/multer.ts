import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    cb(null, "/tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
