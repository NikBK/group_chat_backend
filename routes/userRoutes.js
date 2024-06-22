const router = require('express').Router();
const { userController } = require('../controllers');
const { verifyAdmin } = require('../middlewares');

router
  .route('/users')
  .post(verifyAdmin, userController.createUser)
  .get(userController.getUsers);

router
  .route('/users/:id')
  .put(verifyAdmin, userController.editUser);

module.exports = router;
