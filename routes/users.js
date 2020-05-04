const express = require('express');
const router = express.Router();
const usersModel = require('../models/UsersModel');
const cors = require('cors');

router.get('/', cors(), async function(req, res, next) {
  const { id } = req.params;
  const users = await usersModel.getAllUsers();

  res.json(users);
});

router.get('/:id?', cors(), async function(req, res, next) {
  const { id } = req.params;
  const user = await usersModel.getUser(id);

  res.json(user);
});

router.post('/login', cors(), async function(req, res) {
  const userName = req.body.userName;
  const password = req.body.password;

  const user = await usersModel.checkUser(userName, password);
  console.log(userName);
  if(user.length === 1) {
    req.session.id = user[0].id
    req.session.userName = user[0].username;
    req.session.email = user[0].email;
    req.session.firstName = user[0].firstname;
  
    res.json(user[0]);
  } else {
    res.json("Unauthorized");
  };
});

router.post('/signup', cors(), async function(req, res) {
  const userName = req.body.userName;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const userNameCheck = await usersModel.checkUserName(userName);
  const userEmailCheck = await usersModel.checkUserEmail(email);

  
  if(userNameCheck.length === 0 && userEmailCheck.length === 0) {
    const user = new usersModel(null, firstName, lastName, userName, email, password);
    user.addUser();
    console.log(user);
    res.json(req.body.userName + ' has been added.')
  } else if(userNameCheck.length > 0) {
    res.json(req.body.userName + ' is already in use!');
  } else {
    res.json(req.body.email + ' is already in use!');
  }

});



module.exports = router;
