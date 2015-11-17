var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    proxy = require('express-http-proxy');

var api = 'http://cbre-search-dev.cloudapp.net', 
    cdn = 'https://uatlistingssearchcbreeun.blob.core.windows.net',
    cms = 'http://54.163.251.114';

app.use('/api/*', proxy(api, {
  forwardPath: function(req, res) {
    return api + req.originalUrl;
  }
}));

app.use('/resources*', proxy(cdn, {
  forwardPath: function(req, res) {
    return cdn + req.originalUrl.substring('/resources'.length);
  }
}));

app.use('/*', proxy(cms, {
  forwardPath: function(req, res) {
    return 'http://cbre-int.clients.amido.com/' + req.originalUrl;
  }
}));

app.use( bodyParser.json() );

app.listen(process.env.PORT || 80);

module.exports = app;
