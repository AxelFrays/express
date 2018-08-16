var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var timeseries = require('timeseries-analysis');
var plotly = require('plotly')('AFraysse','Ws2sOK0YAW1OzM1A3hzy');



/* GET home page. */

router.get('/', function(req, res, next) {

    mongo.connect('mongodb://127.0.0.1:27017/testgeojson', {useNewUrlParser : true },function(err, client) {
        assert.equal(null, err);
        let donnee = [];
        let payloadapproximation = [];
        var a = 0.0055;
        var db = client.db('testgeojson');
        db.collection('simulation').findOne().then(function(value){
            console.log(value['values']);

            value['values'].forEach(function(item) {

                 if(item['curr']*180.8+421.7>1000){
                payloadapproximation.push({
                    x: item['t'],
                    y: item['curr'] * 180.8 + 421.7-1000
                });

                donnee.push({
                    y: item['curr'],
                    x: item['t']
                });
            }
            else {
                     payloadapproximation.push({
                         x: item['t'],
                         y: 0
                     });

                     donnee.push({
                         y: item['curr'],
                         x: item['t']
                     });
                 }
            });

            return {raw: value.values, data:donnee, payloadapproximation: payloadapproximation};

        }).then(function({data, raw, payloadapproximation}){
            console.log(data);
            var timedata = [];
            var i = 0;
            var rupturedate = null;
            data.forEach(function(item){
               timedata.push([item['x'],item['y']]);
            });

            console.log(timedata);
            var timeseriesdata = new timeseries.main(timedata);

            var moyenne = timeseriesdata.mean();
             var ecart = timeseriesdata.stdev();
            console.log(moyenne, ecart);

            //Algorithme pour chopper la zone de décrochage de tension
             var j =2;
//                         while((timedata[j][1]>moyenne-Math.trunc(moyenne/ecart)*ecart)&&(timedata[j-2][1]+timedata[j-1][1]>1.7*moyenne))
//                    {
//                       j=j+1;
//                  };
              //rupturedate = timedata[j][0];

              for(j=2;j<data.length;j++){
                  if((timedata[j][1]<moyenne-Math.trunc(moyenne/ecart)*ecart)&&(timedata[j-2][1]+timedata[j-1][1]>1.7*moyenne)){
                      rupturedate= timedata[j][0];
                      break;
                  }
              }

             console.log(rupturedate);
            res.json({
                raw,
                rupturedate,
                payloadapproximation
            })
            client.close();
             //res.send(data);
        }).catch(function (err) {
            console.log(err);
        });
    });
});


router.get('/chart', function(req, res, next) {
    res.render('analyse');
})

module.exports = router;
