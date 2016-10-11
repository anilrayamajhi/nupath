//Comment controllers
var Post = require('../models/Post.js');
var User = require('../models/User.js')

//models exports/ Comment VERBS

module.exports = {
  index: function(req, res){
      Post.findById(req.params.id, {active: true}).sort(['updatedAt', 'descending']).execFind(function(err, data){
        if (err) return res.json(err);
          res.json(data);
        });
},
  create: function(req, res){
    Post.findById(req.params.id, function(err, data){
          // data._by = req.user.id;
          data.comments.push(req.body);
          data.save(function(err){
            if(err) return res.json(err);
            res.json(data)
          });
        })
  },

  show: function(req, res) {
    Post.findById(req.params.postId, function(err, data){
      if(err) return res.json(err);
      res.json(data.comments.id(req.params.commentId))
    })
  },

  update: function(req, res) {
      //edit(existing comment)
      Post.findById(req.params.postId, function(err, data){
            if(err) return res.json(err);
            var comment = data.comments.id(req.params.commentId);
            comment.content = req.body.content;
            data.save(function(err){
              if(err) return res.json(err);
              res.json(data)
            });
          })
    },

    destroy: function(req, res) {
      //delete a comment
      Post.findByIdAndUpdate(req.params.postId, {active: false}, {new: true}, function(err, data) {
        if (err) {
          res.json(err);
        } else {
          res.json(data);
        }
      });
    }
};
