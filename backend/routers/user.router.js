const express = require("express")
const router = express.Router()
const {signup,login,deleteUser,getAllUsers,getUserByGoogleId} = require("../controllers/user.controller");

router.put('/:googleId', signup);
router.post('/login', login);
router.delete('/:userId', deleteUser);
router.get('/', getAllUsers);
// router.put('/:userId', updateUser);
router.get('/:name', getUserByGoogleId);

module.exports = router