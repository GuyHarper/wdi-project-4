const Projection = require('../models/projection');

function projectionsCreate(req, res, next) {
  req.body.author = req.currentUser;
  console.log(req.body);
  Projection
    .create(req.body)
    .then(projection => res.status(201).json(projection))
    .catch(next);
}

function projectionsIndex(req, res, next) {
  Projection
    .find()
    .populate('author')
    .exec()
    .then(projections => res.json(projections))
    .catch(next);
}

function projectionsShow(req, res, next) {
  Projection
    .findById(req.params.id)
    .populate('author')
    .exec()
    .then((projection) => {
      if(!projection) return res.notFound();

      res.json(projection);
    })
    .catch(next);
}

function projectionsUpdate(req, res, next) {
  Projection
    .findById(req.params.id)
    .exec()
    .then((projection) => {
      if(!projection) return res.notFound();
      projection = Object.assign(projection, req.body);
      return projection.save();
    })
    .then(projection => res.json(projection))
    .catch(next);
}

function projectionsDelete(req, res, next) {
  Projection
    .findById(req.params.id)
    .exec()
    .then((projection) => {
      if(!projection) return res.notFound();

      return projection.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: projectionsCreate,
  index: projectionsIndex,
  show: projectionsShow,
  update: projectionsUpdate,
  delete: projectionsDelete
};
