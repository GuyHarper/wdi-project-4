const router = require('express').Router();
const constituencies  = require('../controllers/constituencies');
const projections  = require('../controllers/projections');
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/constituencies')
  .get(constituencies.index);

router.route('/projections')
  .get(projections.index)
  .post(secureRoute, projections.create);

router.route('/projections/:id')
  .get(projections.show)
  .put(secureRoute, projections.update)
  .delete(secureRoute, projections.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
