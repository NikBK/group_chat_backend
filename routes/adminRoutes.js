const router = require('express').Router();
const { adminController } = require('../controllers');

router.post('/createUser', adminController.createUser); // POST /api/admin/createUser (Create new user)
router.put('/user/:id', adminController.editUser); // PUT /api/admin/user/:id (Edit user)

module.exports = router;
