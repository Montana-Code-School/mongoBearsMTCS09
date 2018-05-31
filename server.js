var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

app.use('/', express.static(path.join(__dirname,"public")));

mongoose.connect('mongodb://heroku_9b4fjj5l:tfp5rb4o01j72iohbq7fvslh69@ds113775.mlab.com:13775/heroku_9b4fjj5l');

var Bear = require("./models/bear.js");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();
router.use(function(req, res, next) {
  console.log("This is happening!");
  next();
});


router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api'
  });
});

// ROUTES FOR OUR API
// =============================================================================
router.route('/bears')

  .post(function(req, res) {
    var bear = new Bear();
    for (key in req.body) {
      bear[key] = req.body[key];
    }
    // bear.name = req.body.name;
    // bear.age = req.body.age;
    // bear.color = req.body.color;
    // bear.species = req.body.species;
    // bear.isHibernating = req.body.isHibernating;
    // bear.isFriendly = req.body.isFriendly;


    bear.save(function(err) {
      if (err)
        res.send(err);
      res.json({
        message: "Bear Created"
      });
    });
  })


  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);

      res.json(bears);

    });
  });

router.route("/bears/:bear_id")
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  })

  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      for (key in req.body) {
        bear[key] = req.body[key];
      }
      // bear.name = req.body.name;

      bear.save(function(err) {
        if (err)
          res.send(err);
        res.json({
          message: "Bear Updated!"
        });
      });
    });
  })

  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err)
        res.send(err);
      res.json({
        message: "Successfully deleted!"
      });
    });
  });

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
