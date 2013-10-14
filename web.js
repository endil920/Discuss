var fs = require('fs');
var express = require('express');
var passport = require('poassport'), FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
	clientID: 1427037610852975,
	clientSecret:5d2400c124782c3b4022504b1443b19c,
	callbackURL: http://http://endil920-discuss.herokuapp.com/home
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate(..., function(err, user) {
		  if(err) {return done(err);}
		  done(null, user);
		});
	}
));
var app = express.createServer(express.logger());
app.get(/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {successRedirect: '/',
					failureRedirect: '/login'}));

app.get('/', function(request, response) {
  var msgBuf = fs.readFileSync('index.html');
  var msg = msgBuf.toString('utf8');
  response.send(msg);
});


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
