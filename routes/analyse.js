var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var timeseries = require('timeseries-analysis');



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
            //console.log(x, y);


            //création de la variable data pour être utilisée avec timeseries-analysis
            var data = [];
            var i = 0;
            x.forEach(function(donnee){
                data.push([donnee, y[i]]);
                i = i+1;
            });

            //console.log(data);

            //définition des valeurs moyenne m et écart type e
            var timeseriesdata = new timeseries.main(data);

            var moyenne = timeseriesdata.mean();
            var ecart = timeseriesdata.stdev();
            //console.log(moyenne, ecart);

            //Algorithme pour chopper la zone de décrochage de tension
                var j =0;
                while(data[j][1]>moyenne-Math.trunc(moyenne/ecart)*ecart){
                    j=j+1;
                };
                rupturedate = data[j][0];

                console.log(rupturedate);


        });
        client.close();
    });
});


module.exports = router;
