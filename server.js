var express = require('express');
var formidable = require('express-formidable');
var fs = require("fs");


var app = express();



app.listen(8080, function () {
  console.log('Server is listening on port 8080. Ready to accept requests!');
});

app.use(express.static("public"));

app.use(formidable());
app.post('/create-post', function (req, res) {
    var blogPost = req.fields.blogpost;
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        var newParsedFile =  JSON.parse(file);;
        newParsedFile[Date.now().toString()] = req.fields.blogpost;
        
        fs.writeFile(__dirname + '/data/posts.json', 
        JSON.stringify(newParsedFile, null, 4), function (error) {
            if (!error) res.send({blogpost:blogPost})
        });
    });
});

app.get('/get-posts', function(req, res) {
    res.sendFile(__dirname + '/data/posts.json');
})
