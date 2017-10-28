const router = require('express').Router();
const constituencies  = require('../controllers/constituencies');

router.route('/constituencies')
  .get(constituencies.index);
  
router.all('/*', (req, res) => res.notFound());

module.exports = router;
