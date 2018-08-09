var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');



/* GET users listing. */
router.get('/', function(req, res, next) {
    mongo.connect('mongodb://127.0.0.1:27017/testgeojson', {useNewUrlParser : true },function(err, client) {
        assert.equal(null, err);

        let geo_data = [];
        var db = client.db('testgeojson');

        db.collection('geojson').findOne().then(function(value){

            value['features'][0]['geometry']['coordinates'].forEach(function(item){
                geo_data.push({
                    lat: item[0],
                    long: item[1],
                    alt: null
                });
            });
            return db.collection('altitude').findOne();

       }).then(function(value){
            //console.log(StringDataAlt);
            value['values'].forEach((item, index) => {
               geo_data[index].alt = item.alt;
            });


            res.json(geo_data);
        });
       
        client.close();
    });
});


module.exports = router;
