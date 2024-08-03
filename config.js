// config.js
const admin = require('firebase-admin');
const serviceAccount = require('./config.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'locketvideo.appspot.com',
    databaseURL: 'https://locketvideo-default-rtdb.asia-southeast1.firebasedatabase.app'
});

const bucket = admin.storage().bucket();

// Kiểm tra kết nối Firebase Storage
bucket.exists()
    .then(() => {
        console.log('Kết nối với Firebase Storage thành công!');
    })
    .catch((error) => {
        console.error('Lỗi kết nối với Firebase Storage:', error);
    });

module.exports = {
    bucket: bucket,
    admin: admin
};