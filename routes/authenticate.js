var passport = require('passport'),
    usersController = require('../controllers/users.js'),
    authenticateRouter = require('express').Router()

authenticateRouter.route('/login')
	.get(usersController.login)
	.post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect:'/login'
  }));

authenticateRouter.route('/signup')
.get(usersController.signup)
.post(passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup'
}));

authenticateRouter.get('/profile', isLoggedIn, function(req, res){
	res.render('authenticate/profile', {user: req.user})
})

authenticateRouter.get('/logout', function(req, res){
	//destroy session and redirect to hompage
	req.logout()
	res.redirect('/')
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()) return next()
	res.redirect('/')
}

module.exports = authenticateRouter