import multer from "multer";

const storage = multer.diskStorage({});

// accept only PDFs for fields named "resume" or "additionalDocument"
const fileFilter = (req, file, cb) => {
  const isPdf = file.mimetype === "application/pdf";
  if (!isPdf) {
    return cb(new Error("Only PDF files are allowed"), false);
  }
  cb(null, true);
};

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const uploadPdf = multer({ storage, fileFilter, limits });
export default uploadPdf;
