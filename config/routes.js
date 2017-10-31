const router = require('express').Router();
const constituencies  = require('../controllers/constituencies');
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/constituencies')
  .get(secureRoute, constituencies.index);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
