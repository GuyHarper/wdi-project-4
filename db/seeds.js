const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const Constituency = require('../models/constituency');

const constituencyData = [
  {name: 'Aberavon', code: 'W07000049', country: 'Wales', region: 'Wales', electorate2017: 49892, totalValidVotes2017: 33268, totalInvalidVotes2017: 57, con2017: 5901, lab2017: 22662, ld2017: 599, ukip2017: 1345, green2017: 0, snp2017: 0, pc2017: 2761, dup2017: 0, sf2017: 0, sdlp2017: 0, uup2017: 0, alliance2017: 0, other2017: 0, otherWinner2017: 0}
];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Constituency.create(constituencyData))
  .then(constituencies => console.log(`${constituencies.length} constituencies created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
