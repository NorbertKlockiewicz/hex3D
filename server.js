var express = require("express")
var app = express()
const fs = require('fs')
const PORT = 3000;
var bodyParser = require("body-parser")
var qs = require("querystring")
var path = require("path")
var Datastore = require('nedb');
var coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/index.html"))
})

app.get("/Game", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/Game.html"))
})
app.get("/Hex", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/Hex.html"))
})
app.get("/Player", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/Player.html"))
})
app.get("/Particles", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/Particles.html"))
})
app.get("/Ally", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/html/Ally.html"))
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
app.post("/", function (req, res) {
    coll1.remove({}, { multi: true }, function (err, numRemoved) {
        console.log("usunięto wszystkie dokumenty: ", numRemoved)
    });
    coll1.insert(req.body, function (err, newDoc) {
        console.log("dodano dokument (obiekt):")
        console.log(newDoc)
        console.log("losowe id dokumentu: " + newDoc._id)
    });
    console.log(req.body)
    res.send("TEST")
})
app.post("/handlePost", function (req, res) {
    coll1.find({}, function (err, docs) {
        console.log("----- tablica obiektów pobrana z bazy: \n")
        console.log(docs)
        console.log("----- sformatowany z wcięciami obiekt JSON: \n")
        console.log(JSON.stringify({ "docsy": docs }, null, 5))
        res.send(docs)
    });
    console.log("DZIALA")
})