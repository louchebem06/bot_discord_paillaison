# convertapi-node
Node Wrapper for ConvertApi

## Install
<pre>
  npm install convertapi-node
</pre>

## Usage
```javascript
var ConvertApi = require('convertapi-node');

var capi = new ConvertApi(API_KEY);

//filepath uses unirest().attach('File': filepath) - refer to unirest documentation.
//refer to convertapi.com for available options
//capi.call returns a unirest response object.  Data from convertapi.com comes in the response.header.

capi.call('word2pdf', filepath, options)
.on('response', function(response){
  response.pipe(fs.createWriteStream(response.headers.outputfilename));
});
```

## Notes
It's expected that most of ConvertApi.com's endpoints will work, but it has only been tested on `/word2pdf` and `/word2image`.
