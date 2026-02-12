const express = require('express');
const multer = require('multer');
const cors = requires('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads')); // Makes files accessible via URL

// Configure where and how files are saved
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Analysis endpoint
app.post('/upload', upload.single('audio'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    // Return the file metadata and a URL for the frontend to use
    res.json({
        fileName: req.file.originalname,
        fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
        size: req.file.size
    });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));