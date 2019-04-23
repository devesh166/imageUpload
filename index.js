const express = require('express');
const mongoose = require('mongoose');
const schema = require("./model/imageSchema")
var fs = require('fs');
var randomStringGenerator = require("randomstring")
const busyboy = require('busboy');
const port = 4000;

const app = express();
const db = 'mongodb://127.0.0.1:27017/image'
mongoose.connect(db, (err) => {

    if (err) throw err;

    console.log('Successfully connected to db');

});

app.post(('/image'), (req, res) => {
    var busboy = new busyboy({ headers: req.headers });
    var name;
    var saveTo;
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
         name = randomStringGenerator;
         saveTo = './temp/' + name;
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function () {
        let newImage = new schema();
        newImage.name =name;
        newImage.path =saveTo;
        newImage.save((err, users) => {
            if (err) {
                res.send(err)
                return;
            } else {
                res.end("file uploaded");
            }
        })
        
    });


    return req.pipe(busboy);
})

app.post(('/img'), (req, res) => {
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
    let extension;
     if(lowerCaseData.indexOf('png') !== -1){
            extension = '.png'
        }else if(lowerCaseData.indexOf('jpg') !== -1){
            extension = '.jpg'
        }else if(lowerCaseData.indexOf('jpeg') !== -1){
            extension = '.jpeg'
        };
    fs.writeFile("uploads_image/" + filename + extension, base64Data, 'base64', function (err) {
          let newImage = new schema();
        newImage.name =name;
        newImage.path =saveTo;
        newImage.save((err, users) => {
            if (err) {
                res.send(err)
                return;
            } else {
                res.end("file uploaded");
            }
        })
        if (err) {
            console.log(err);
        }
    });
})

app.listen(port, () => {
    console.log("server listening on port " + port);
})

