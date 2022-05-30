const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`)
});