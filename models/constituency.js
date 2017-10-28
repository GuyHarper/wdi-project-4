const mongoose = require('mongoose');

const constituencySchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  electorate2017: { type: Number, required: true },
  totalValidVotes2017: { type: Number, required: true },
  totalInvalidVotes2017: { type: Number, required: true },
  con: { type: Number },
  lab: { type: Number },
  ld: { type: Number },
  ukip: { type: Number },
  green: { type: Number },
  snp: { type: Number },
  pc: { type: Number },
  dup: { type: Number },
  sf: { type: Number },
  sdlp: { type: Number },
  uup: { type: Number },
  alliance: { type: Number },
  other: { type: Number },
  otherWinner: { type: Number }
});

constituencySchema
  .virtual('turnout')
  .get(function getTurnout() {
    return (this.totalValidVotes2017 + this.totalInvalidVotes2017)/this.electorate2017;
  });


module.exports = mongoose.model('constituency', constituencySchema);
