var http = require('http');
var camelizeKeys = require('humps').camelizeKeys;
var fs = require('fs');
var appData = require('./src/data/app.json');

function loadJSON(endpoint, onSuccess) {
  http.get({
    hostname: 'api.qando.it',
    port: 80,
    path: endpoint,
    agent: false,
    headers: {
      'Accept': 'application/json',
    }
  }, function(res) {
    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
      onSuccess(camelizeKeys(JSON.parse(body)));
    });

  }).on('error', function(e){
    console.error("Error in API call", e);
  });
}

loadJSON('/api/shops-by-domain/' + appData.shopDomain + '/', function (shop) {
  fs.writeFile('./src/data/shop.json', JSON.stringify(shop), function(err) {
    if (err) {
      return console.erro('Error writing shop.json', err);
    }
  });
});
