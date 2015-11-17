var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    proxy = require('express-http-proxy');

var api = process.env.API || 'http://cbre-search-dev.cloudapp.net', 
    cdn = process.env.CDN || 'https://uatlistingssearchcbreeun.blob.core.windows.net',
    cms = process.env.CMS || 'http://54.163.251.114',
    host = process.env.HOST || 'http://cbre-int.clients.amido.com';

// API Calls to API
app.use('/api/*', proxy(api, {
  forwardPath: function(req, res) {
    return api + req.originalUrl;
  }
}));

// Resources to blob storage
app.use('/resources*', proxy(cdn, {
  forwardPath: function(req, res) {
    return cdn + req.originalUrl.substring('/resources'.length);
  }
}));

// Everything else to Drupal
app.use('/*', proxy(cms, {
  forwardPath: function(req, res) {
    return host + req.originalUrl;
  }
}));

app.use( bodyParser.json() );

app.listen(process.env.PORT || 80);

module.exports = app;
