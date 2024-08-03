const express = require('express');
const multer = require('multer');
const { bucket } = require('./config');

let router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

let initWebRoutes = (app) => {
    router.get('/', (req, res) => {
        res.send('Hello World');
    });

    router.get("/icon", (req, res) => {
        res.send('😀😃😄😁😆😅🤣😂');
    });

    // API to post video to Firebase
    router.post('/upload-video', upload.single('video'), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }

            const file = req.file;
            const fileName = Date.now() + '-' + file.originalname;

            const fileUpload = bucket.file(fileName);

            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            blobStream.on('error', (error) => {
                console.error(error);
                res.status(500).send('Something went wrong!');
            });

            blobStream.on('finish', async () => {
                // Make the file public
                await fileUpload.makePublic();

                // Get the public URL
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

                res.status(200).send({ message: "Upload successful", url: publicUrl });
            });

            blobStream.end(file.buffer);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });

    app.use('/', router);
}

module.exports = initWebRoutes;