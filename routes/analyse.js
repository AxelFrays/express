var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');



/* GET home page. */

router.get('/', function(req, res, next) {
    mongo.connect('mongodb://127.0.0.1:27017/testgeojson', {useNewUrlParser : true },function(err, client) {
        assert.equal(null, err);
        var db = client.db('testgeojson');
        db.collection('currentdata').findOne().then(function(value){
            //console.log(value);
            //res.render('analyse', {items: value});

            var x = [], y = [];
            value['values'].forEach(function(item){
                y.push(item['curr']);
                x.push(item['t']);
            });
            StringData = JSON.stringify(value['values']);
            console.log(x, y);

        });
        client.close();
    });
});


module.exports = router;
