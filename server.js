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
    // console.log('Hello there!', req.fields);
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        console.log("posts looks like", file.toString());
        var newParsedFile =  JSON.parse(file);;
        newParsedFile[Date.now().toString()] = req.fields.blogpost;
        fs.writeFile(__dirname + '/data/posts.json', 
        JSON.stringify(newParsedFile, null, 4), function (error) {
            if (!error) fs.readFile(__dirname + '/data/posts.json', 
            function (error, file) {
                console.log("posts now looks like", file.toString());
            });
        });
    });
});

app.get('/get-posts', function(req, res) {
    res.sendFile(__dirname + '/data/posts.json');
})
