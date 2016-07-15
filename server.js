var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    proxy = require('express-http-proxy');

var api = process.env.API || '', 
    cdn = process.env.CDN || '',
    cms = process.env.CMS || '',
    host = process.env.HOST || '';

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
    var fullurl = host + req.originalUrl;
    console.log(fullurl);
    return fullurl;
  }
}));

app.use( bodyParser.json() );

app.listen(process.env.PORT || 80);

module.exports = app;
