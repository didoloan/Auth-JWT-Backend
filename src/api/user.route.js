const { Router } = require('express');
const { addInterest, addHobbies, getUser } = require('./userController');

const router = Router();

router.get('/', getUser)

router.route('/interests')
    .post(addInterest);

router.post('/hobbies', addHobbies)

module.exports = router;
