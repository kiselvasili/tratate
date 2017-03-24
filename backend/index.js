let express = require('express');

let app = express();

let PORT = 8080;

app.use((req, res) => {
    res.send(404, '<h1 style="color: aqua">Page not found</h1>');
});

app.listen(PORT, () => {
    console.log('Server listening on : ', PORT);
});