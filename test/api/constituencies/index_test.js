/* global api, describe, it, expect, beforeEach, afterEach*/
require('../helper');


const Constituency = require('../../../models/constituency');
const constituencyData = [
  {name: 'Aberavon', code: 'W07000049', country: 'Wales', region: 'Wales', electorate2017: 49892, totalValidVotes2017: 33268, totalInvalidVotes2017: 57, con2017: 5901, lab2017: 22662, ld2017: 599, ukip2017: 1345, green2017: 0, snp2017: 0, pc2017: 2761, dup2017: 0, sf2017: 0, sdlp2017: 0, uup2017: 0, alliance2017: 0, other2017: 0, otherWinner2017: 0},
  {name: 'Aberconwy', code: 'W07000058', country: 'Wales', region: 'Wales', electorate2017: 45251, totalValidVotes2017: 32150, totalInvalidVotes2017: 78, con2017: 14337, lab2017: 13702, ld2017: 941, ukip2017: 0, green2017: 0, snp2017: 0, pc2017: 3170, dup2017: 0, sf2017: 0, sdlp2017: 0, uup2017: 0, alliance2017: 0, other2017: 0, otherWinner2017: 0}
];

describe('GET /api/constituencies', () => {
  beforeEach(done => {
    Constituency.create(constituencyData, done);
  });
  afterEach(done => {
    Constituency.collection.remove();
    done();
  });
  it('should return a 200 response', done => {
    api
      .get('/api/constituencies')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});
