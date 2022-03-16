var express = require('express');
var app = express();
var fs = require('fs');
const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true, 
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/schools', function (req, res) {
   fs.readFile( __dirname + '/' + 'ma_schools.json', 'utf8', function (err, data) {
      // console.log( data );
      res.end( data );
   });
})

app.get('/programs', function (req, res) {
   fs.readFile( __dirname + '/' + 'programs.json', 'utf8', function (err, data) {
      // console.log( data );
      res.end( data );
   });
})

app.listen(3001, () => {
   console.log('running on port 3001');
})