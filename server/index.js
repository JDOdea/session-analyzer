const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/analyze', upload.single('audio'), (req, res) => {
    // Pass the file path to analysis engine
    res.json({ message: "File uploaded successfully", file: req.file.path });
});