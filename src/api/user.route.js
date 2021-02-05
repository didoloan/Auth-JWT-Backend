const { Router } = require('express');
const { addInterest, deleteInterest, addHobbies, getUser } = require('./userController');

const router = Router();

router.get('/', getUser)

router.route('/interests')
    .patch(addInterest)
    .delete(deleteInterest)

router.post('/hobbies', addHobbies)

module.exports = router;
