const { Router } = require('express');
const { addInterest, addHobbies, getUser } = require('./userController');

const router = Router();

router.get('/', getUser)

router.post('/interests', addInterest);

router.post('/hobbies', addHobbies)

module.exports = router;
