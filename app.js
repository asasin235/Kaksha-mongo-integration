const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000
const arr =[]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://atifdelhi2021:test123@cluster0.r9rzlsg.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err.message));
const listData = new mongoose.Schema({
    listData:String
});
const ListData = mongoose.model('ListData', listData);

app.post('/add', (req, res) => {
    const listData = new ListData({
        listData:req.body.listData
    });
    listData.save()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
})
app.get('/list', (req, res) => {
    ListData.find()
    .then(result => {
        res.send(result);
    })
    .catch(err => {
        console.log(err);
    });
})
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/about', (req, res) => {
    console.log(req.query);
    res.send('About Page');

})

app.post('/post-data', (req, res) => {
    console.log(req.body);
    res.send('Data Saved');

})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

