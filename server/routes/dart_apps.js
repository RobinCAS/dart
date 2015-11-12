var express = require('express');
var router = express.Router();
var models = require('../models');

router.post('/', function(req, res){
  models.dart_app.create({
    app_name: req.body.title,
    app_desc: req.body.description,
    app_category: req.body.category,
    app_impact: req.body.impact,
    app_class: req.body.dataClassification,
    app_owner: req.body.owner,
    app_link: req.body.link,
  }).then(function(response) {
    res.send(response.dataValues);
  });
});

// router.get('/', function(req, res){
//   models.User.findAll().then(function(response) {
//     res.send(response);
//   });
// });
//
// router.get('/:user_id', function(req, res){
//   models.User.find({
//     where: {id: req.params.user_id},
//     include: [ { model: models.Sale, include: [ models.Product ] } ],
//     limit: 1
//   }).then(function(response) {
//     res.send(response);
//   });
// });
//
// router.get('/count/age', function(req, res){
//   models.User.findAndCountAll({
//     limit: 2,
//     offset: (req.params.page - 1) * 2
//   }).then(function(response) {
//     res.send(response);
//   });
// });
//
// router.delete('/:id', function(req, res){
//   models.User.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(affectedRows){
//     res.send(req.params.id);
//   });
// });

module.exports = router;
