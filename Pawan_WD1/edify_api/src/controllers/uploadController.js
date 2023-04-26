const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

        // The file's extension
        const ext = file.originalname.substring(
            file.originalname.lastIndexOf('.')
        );

        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        console.log(file.mimetype);
        switch (file.mimetype) {
            case 'image/jpeg':
            case 'image/jpg':
            case 'image/png':
                // accept file
                callback(null, true);
                break;
            default:
                // To reject this file pass `false`, like so:
                callback(
                    new Error(
                        'Unsupported file type. You can only upload one of the following file types png, jpg or jpeg.'
                    ),
                    false
                );
                break;
        }
    },
    limits: {
        // Max 2MB file size accepted
        fileSize: 2 * 1024 * 1024,
    },
}).fields([
    { name: 'card-photo', maxCount: 1 },
    { name: 'cover-photo', maxCount: 1 },
    { name: 'ins-photo-1', maxCount: 1 },
    { name: 'ins-photo-2', maxCount: 1 },
]);

module.exports = { upload };