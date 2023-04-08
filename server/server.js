const express = require('express');

let bodyParser = require('body-parser');

const app = express();

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));








app.listen(5000, () => {console.log('Server Running on port 5000')});