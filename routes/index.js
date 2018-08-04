var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req, res, next) {
 	mongo.connect('mongodb://localhost:27017/testgeojson', {useNewUrlParser : true },function(err, client) {
 		assert.equal(null, err);
 		var db = client.db('testgeojson');
 		console.log(db.collection('geojson').findOne());
 		client.close();
	});
 });
module.exports = router;
