const router = require('express').Router();
const { groupController } = require('../controllers');

router
  .route('/groups')
  .get(groupController.getGroups)
  .post(groupController.createGroup);

module.exports = router;
