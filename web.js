var fs = require('fs');
var express = require('express');
var passport = require('passport'),FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');



var app = express.createServer(express.logger());
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {successRedirect: '/',
					failureRedirect: '/login'}));

app.get('/', function(request, response) {
  var msgBuf = fs.readFileSync('index.html');
  var msg = msgBuf.toString('utf8');
  response.send(msg);
});

app.get('/auth/facebook/callback', function(request,response) {
  var msgBug = fs.readFileSync('home.html');
  var msg = msgBuf.toString('utf8');
  response.send(msg);
});

passport.use(new FacebookStrategy({
	    clientID: config.facebook.id,
		clientSecret:config.facebook.sid,
		callbackURL: 'http://endil920-discuss.herokuapp.com/auth/facebook/callback'
		},
	function(accessToken, refreshToken, profile, done) {
		    done(null,3);
	}));

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
