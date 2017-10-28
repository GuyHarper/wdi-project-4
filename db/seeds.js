const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const Constituency = require('../models/constituency');

const constituencyData = [
  {name: 'East Lothian', code: 'S14000020', country: 'Scotland', region: 'Scotland', electorate2017: 79093, totalValidVotes2017: 55878, totalInvalidVotes2017: 57, con2017: 16540, lab2017: 20158, ld2017: 1738, ukip2017: 0, green2017: 0, snp2017: 17075, pc2017: 0, dup2017: 0, sf2017: 0, sdlp2017: 0, uup2017: 0, alliance2017: 0, other2017: 367, otherWinner2017: 0}
];

mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Constituency.create(constituencyData))
  .then(constituencies => console.log(`${constituencies.length} constituencies created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
