const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const port = 3000;

nunjucks.configure('./client', {
    autoescape: true,
    express: app
});

app.get('/', (req, res) => {
    res.render('index.html', { date: new Date() });
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`)
});