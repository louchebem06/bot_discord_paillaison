var unirest = require('unirest');
var _ = require('lodash');

var CAPI_BASE_URL = 'https://do.convertapi.com/';

function ConvertApi(apikey) {
  this.apiKey = apikey;
}

ConvertApi.prototype.call = function(path, file, params){
  var self = this;

  params = _.defaults({apiKey: self.apiKey, File: file}, params);

  return unirest.post(CAPI_BASE_URL+path)
  .headers({'Content-Type': 'multipart/form-data'})
  .field(params)
  .attach('File', file).end();
};

module.exports = ConvertApi;