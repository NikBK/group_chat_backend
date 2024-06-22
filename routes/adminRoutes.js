const router = require('express').Router();
const { adminController } = require('../controllers');
const { verifyAdmin } = require('../middlewares');

router.post('/createUser', verifyAdmin, adminController.createUser); // POST /api/admin/createUser (Create new user)
router.put('/user/:id', verifyAdmin, adminController.editUser); // PUT /api/admin/user/:id (Edit user)

module.exports = router;
