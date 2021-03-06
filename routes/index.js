var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req, res, next) {
 	mongo.connect('mongodb://127.0.0.1:27017/testgeojson', {useNewUrlParser : true },function(err, client) {
 		assert.equal(null, err);
 		var db = client.db('testgeojson');
 		db.collection('geojson').findOne().then(function(value){
 			res.render('index', {items: value});
 			console.log(value);
		});
 		client.close();
	});
 });
module.exports = router;
