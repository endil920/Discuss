var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.db.url);
var db = mongoose.connection;
var userSchema = new mongoose.Schema({
	fbId: String,
	name: String,
	email: { type: String, lowercase: true}
    });

module.exports = mongoose.model('User', userSchema);
module.exports.findById = function(id, callback) {
    console.log('Trying to find user with id: ' + id);
    db.collection('users').findOne({'_id':new BSON.ObjectID(id)}, function(err, user) {
	    callback(err, user);
	});
}