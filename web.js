var fs = require('fs');
var express = require('express');
var passport = require('passport'),FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var config = require('./config');
var User = require('./users.js');
console.log('successfully loaded configs');

var app = express.createServer(express.logger());

app.configure(function() {
	app.use(express.static('public'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'SECRET' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
    });


app.get('/', function(request, response) {
  var msgBuf = fs.readFileSync('index.html');
  var msg = msgBuf.toString('utf8');
  response.send(msg);
});

app.get('/account', function(req, res) {
	for (var propname in req) {
	    console.log(propname);
	}
	console.log(req.user);
	res.send('Welcome ' + req.user.name);
    });

app.get('/login', function(request, response) {
	response.send('nope! too late. you can never log in.');
	console.log('this person is a noob');
    });
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {successRedirect: '/account',
					failureRedirect: '/login'}));


passport.use( new FacebookStrategy({
	    clientID: config.facebook.id,
		clientSecret:config.facebook.sid,
		callbackURL: 'http://localhost:8080/auth/facebook/callback'
		},
	function(accessToken, refreshToken, profile, done) {
	    User.findOne({'fbId' : profile.id}, function(err, oldUser) {
		    if(oldUser) {
			console.log('this is an old user: ' + oldUser.name);
			done(null,oldUser);
		    } else {
			console.log('this is a new user.');
			console.log(JSON.stringify(profile));
			var newUser = new User({
				fbId : profile.id,
				email: 'test@test.com',
				name: profile.displayName
			    });

			newUser.save(function(err,newUser) {
				if(err) {
				    console.log('saving the new user did not work!');
				    throw err;
				}
				    console.log('new user: ' +newUser.name+ 'successfully created');
				    done(null, newUser);
			    });
		    }
		});
	}
	));

passport.serializeUser(function(user, done) {
  console.log('serializing...');
  done(null, user.id);
    });

passport.deserializeUser( function(id, done) {
	console.log('deserializing');
	User.findOne(id, function(err, user) {
		done(err, user);
	    });
    });


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
