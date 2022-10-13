const express = require('express')
const router = express.Router()

const{registerUser, updateUser, deleteUser, allUsers, allUsersDefult, allUserPhotographer} = require('../controllers/users.controller')

router.get('/', allUsers);

router.get('/allUserDefault', allUsersDefult);

router.get('/allUserPhotographer', allUserPhotographer);

router.post('/', registerUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router