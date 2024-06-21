const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router
  .route('/groups')
  .get(groupController.getGroups)
  .post(groupController.createGroup);

module.exports = router;
