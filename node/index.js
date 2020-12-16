const express = require('express')
const app = express()
const port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require("fs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var storage = multer.diskStorage(
  {
      destination: './public/images',
      filename: function ( req, file, cb ) {
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?
          const namearr = file.originalname.split(".");
          const ext = namearr[namearr.length - 1]
          cb( null, file.originalname+ '-' + Date.now()+"."+ext);
      }
  }
);

var upload = multer( { storage: storage } );

//var upload = multer({ dest: __dirname +'/public/images' })

app.get('/', (req, res) => {
  res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/file_upload', upload.single("file"), function (req, res) {
  var file = __dirname + "/" + req.file.originalname;

  fs.readFile( req.file.path, function (err, data) {

       fs.writeFile(file, data, function (err) {
        if( err ){
             console.error( err );
             response = {
                  message: 'Sorry, file couldn\'t be uploaded.',
                  filename: req.file.filename
             };
        }else{
              response = {
                  message: 'File uploaded successfully',
                  filename: req.file.filename
             };
         }
         res.end( JSON.stringify( response ) );
      });
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})