const mongoose = require('mongoose');

const constituencySchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  electorate2017: { type: Number, required: true },
  totalValidVotes2017: { type: Number, required: true },
  totalInvalidVotes2017: { type: Number, required: true },
  con2017: { type: Number },
  lab2017: { type: Number },
  ld2017: { type: Number },
  ukip2017: { type: Number },
  green2017: { type: Number },
  snp2017: { type: Number },
  pc2017: { type: Number },
  dup2017: { type: Number },
  sf2017: { type: Number },
  sdlp2017: { type: Number },
  uup2017: { type: Number },
  alliance2017: { type: Number },
  other2017: { type: Number },
  otherWinner2017: { type: Number }
});

constituencySchema
  .virtual('turnout2017')
  .get(function getTurnout2017() {
    return (this.totalValidVotes2017 + this.totalInvalidVotes2017)/this.electorate2017;
  });

constituencySchema
  .virtual('winner2017')
  .get(function getWinner2017() {
    const results = [
      {con: this.con2017},
      {lab: this.lab2017},
      {ld: this.ld2017},
      {green: this.green2017},
      {snp: this.snp2017},
      {pc: this.pc2017},
      {dup: this.dup2017},
      {sf: this.sf2017},
      {sdlp: this.sdlp2017},
      {uup: this.uup2017},
      {alliance: this.alliance2017},
      {otherWinner: this.otherWinner2017}
    ];
    const winningResult = Math.max.apply(null, results.map((e) => {
      return e[Object.keys(e)[0]];
    }));
    const winningParty = Object.keys(results.find((e) => Object.keys(e).find(key => e[key] === winningResult)))[0];
    return (winningParty);
  });


module.exports = mongoose.model('constituency', constituencySchema);
