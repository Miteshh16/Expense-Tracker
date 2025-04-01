const multer = require('multer');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

// File filter function
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedTypes.includes(file.mimetype)) {  // ✅ Fixed: Changed `file.minitypes` to `file.mimetype`
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, and .png formats are allowed'), false);
    }
};

// Multer instance with storage and filter
const upload = multer({ storage, fileFilter });

module.exports = upload;
