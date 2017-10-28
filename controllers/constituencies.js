const Constituency = require('../models/constituency');

function constituenciesIndex(req, res, next) {
  Constituency
    .find()
    .exec()
    .then(constituencies => {
      res.json(constituencies);
      console.log(constituencies);
    })
    .catch(next);
}

module.exports = {
  index: constituenciesIndex
};
