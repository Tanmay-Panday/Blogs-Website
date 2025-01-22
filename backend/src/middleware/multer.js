import multer from "multer";
const storage = multer.diskStorage({    // to store a file on a disk ( upload to cloudinary disk and get url from client )
  //   destination: function (req, file, cb) {
  //     cb(null, "/tmp/my-uploads");
  //   },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);    // multer filetype error 
  },
});

const uploadMiddleware = multer({ storage });
export default uploadMiddleware;
