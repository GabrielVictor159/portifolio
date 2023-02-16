const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static('dist'))
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))