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
  it('should return an array', done => {
    api
      .get('/api/constituencies')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should return the correct number of elements', done => {
    api
      .get('/api/constituencies')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.length).to.equal(constituencyData.length);
        done();
      });
  });
  it('should return the correct data', done => {
    api
      .get('/api/constituencies')
      .set('Accept', 'application/json')
      .end((err, res) => {
        constituencyData.forEach((constituencyDataElement, index) => {
          const constituency = res.body[index];
          expect(constituency.id).to.be.a('string');
          expect(constituency.name).to.equal(constituencyDataElement.name);
          expect(constituency.code).to.equal(constituencyDataElement.code);
          expect(constituency.country).to.equal(constituencyDataElement.country);
          expect(constituency.region).to.equal(constituencyDataElement.region);
          expect(constituency.electorate2017).to.equal(constituencyDataElement.electorate2017);
          expect(constituency.totalValidVotes2017).to.equal(constituencyDataElement.totalValidVotes2017);
          expect(constituency.totalInvalidVotes2017).to.equal(constituencyDataElement.totalInvalidVotes2017);
          expect(constituency.con2017).to.equal(constituencyDataElement.con2017);
          expect(constituency.lab2017).to.equal(constituencyDataElement.lab2017);
          expect(constituency.ld2017).to.equal(constituencyDataElement.ld2017);
          expect(constituency.ukip2017).to.equal(constituencyDataElement.ukip2017);
          expect(constituency.green2017).to.equal(constituencyDataElement.green2017);
          expect(constituency.snp2017).to.equal(constituencyDataElement.snp2017);
          expect(constituency.pc2017).to.equal(constituencyDataElement.pc2017);
          expect(constituency.dup2017).to.equal(constituencyDataElement.dup2017);
          expect(constituency.sf2017).to.equal(constituencyDataElement.sf2017);
          expect(constituency.sdlp2017).to.equal(constituencyDataElement.sdlp2017);
          expect(constituency.uup2017).to.equal(constituencyDataElement.uup2017);
          expect(constituency.alliance2017).to.equal(constituencyDataElement.alliance2017);
          expect(constituency.other2017).to.equal(constituencyDataElement.other2017);
          expect(constituency.otherWinner2017).to.equal(constituencyDataElement.otherWinner2017);
        });
        done();
      });
  });
});
