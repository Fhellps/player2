const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configuração do multer para armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Rota para upload de vídeo
app.post('/upload', upload.single('videoFile'), (req, res) => {
    res.json({ url: `/uploads/${req.file.filename}` });
});

// Servir arquivos estáticos da pasta uploads
app.use('/uploads', express.static('uploads'));

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
