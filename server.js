const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const initWebRoutes = require('./route');

var config = require('./config');

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: "GET,POST,PUT,DELETE",
    })
);

initWebRoutes(app);

// Nếu bạn muốn sử dụng Realtime Database, hãy bỏ comment đoạn code dưới đây
// và thêm URL của database vào cấu hình Firebase trong config.js

config.admin.database().ref('.info/connected').on('value', (snapshot) => {
    if (snapshot.val() === true) {
        console.log('Kết nối với Firebase Realtime Database thành công!');
    } else {
        console.log('Đã mất kết nối với Firebase Realtime Database.');
    }
});


app.listen(PORT, () => {
    console.log('Student API is running at ' + PORT);
});

module.exports = app;