var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
    mongo.connect('mongodb://127.0.0.1:27017/testgeojson', {useNewUrlParser : true },function(err, client) {
        assert.equal(null, err);
        var db = client.db('testgeojson');
        db.collection('geojson').findOne().then(function(value){

            StringData = JSON.stringify(value);
            console.log(StringData);

        });
        client.close();
    });
});


module.exports = router;
