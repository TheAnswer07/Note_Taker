const express = require('express');
const app = express();
const { uid } = require('uid');
const path = require('path');
let notes = require('./db/db.json');
const { fstat } = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

app.get('/api/notes', (req, res) => {
    res.json(notes)
});

app.post('/api/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uid()
    }
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }
      res.json(newNote)
    });
});

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id)
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
        if (err) { console.log(err) }
        res.sendStatus(200)
    });
});




app.listen(process.env.PORT || 3000);