var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');



/* GET users listing. */
router.get('/', function(req, res, next) {
    mongo.connect('mongodb://127.0.0.1:27017/testgeojson', {useNewUrlParser : true },function(err, client) {
        assert.equal(null, err);
        var GlobalVector = [];
        var ValueGPS, ValueAlt = [];
        var x = [];
        var db = client.db('testgeojson');
        db.collection('geojson').findOne().then(function(value){

            StringData = JSON.stringify(value);
            res.render('carte', {items: value});
            //console.log(StringData);
            value['features'][0]['geometry']['coordinates'].forEach(function(item){
                x.push(item);
            });
            ValueGPS = x;
               });

        db.collection('altitude').findOne().then(function(value){
            StringDataAlt = JSON.stringify(value);
            //console.log(StringDataAlt);
            value['values'].forEach(function(item){
               ValueAlt.push(item['alt']);
            });
        });
        GlobalVector = [ValueGPS,ValueAlt];
        console.log(GlobalVector);
        client.close();
    });
});


module.exports = router;
