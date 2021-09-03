// TODO: Remove this line!
var apikey = process.env.API_KEY;

var fs = require('fs');
var ConvertApi = require('../index');

var  OUTPUT_FOLDER = 'Converted/';

// var file = fs.readFileSync('test-doc.docx');

var capi = new ConvertApi(apikey);

var conversions = [
  'word2pdf',
  'word2image',
];

conversions.forEach(function(v){
  console.log('Running: '+v);
  capi.call(v, 'test-doc.docx')
  .on('response', function(response){
    response.pipe(fs.createWriteStream(OUTPUT_FOLDER+response.headers.outputfilename));
    console.log('Completed: '+v);
  })
  .on('error', function(err){
    console.log(err);
  });
});



