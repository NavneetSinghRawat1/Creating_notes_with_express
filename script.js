const { log } = require('console');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', { files: files });
    })
});
app.get('/txt/read/:anyfile', (req, res) => {
    fs.readFile(`./files/${req.params.anyfile}`, 'utf8', (err, data) => {
        res.render('content', { data: data });

    });
});
app.get('/txt/update/:anyfile', (req, res) => {
    fs.readFile(`./files/${req.params.anyfile}`, 'utf8', (err, data) => {

        res.render('edit', { data: data, anyfile: req.params.anyfile });

    });
});
app.get('/txt/Delete/:anyfile', (req, res) => {
    fs.rm(`./files/${req.params.anyfile}`, () => {
        fs.readdir('./files', (err, files) => {
            res.render('index', { files: files });
        })
    });

});

app.post('/insert', (req, res) => {
    fs.writeFile(`./files/${req.body.text.split(' ').join('')}.txt`, req.body.text_content, (err) => {
        res.redirect('/');
    });

});
app.post('/update/:anyfile', (req, res) => {
    fs.writeFile(`./files/${req.params.anyfile.split(' ').join('')}`, req.body.text_content, (err) => {
        fs.readFile(`./files/${req.params.anyfile}`, 'utf8', (err, data) => {
            res.render('content', { data: data });

        });
    });
});

app.listen(3000, (err) => {
});
