const mongoose = require('mongoose');

const swingSchema = mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true }
});

const modifierSchema = mongoose.Schema({
  swings: [ swingSchema ]
});

const projectionSchema = mongoose.Schema({
  author: { type: mongoose.Schema.ObjectId, ref: 'User' },
  modifiers: [ modifierSchema ]
}, {
  timestamps: true
});

module.exports = mongoose.model('projection', projectionSchema);
