import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {    // Destination folder
    return cb(null, "./uploads");
  },
  filename: function(req, file, cb) {       // Set the title of the stored file using timestamp and original title of the document
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const fileFilter = (req, file, cb) => {
  // Only accept these type of files
  const allowedFileExtensions = ['txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx','odt', 'ods', 'odp', 'ott', 'ots', 'otp','jpg', 'jpeg', 'png', 'gif'];

  // Get the file extension from the name
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  
  // Check if this extension is allowed
  if (allowedFileExtensions.includes(fileExtension)) {
    cb(null, true);
  } else {
    cb(null, false);  // TODO handle error
  }
};

const upload = multer({ 
  storage,
  fileFilter
 });

export default upload;