import app = require('../app.js');

import 'mocha';
import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Test home api', () => {
  it('Simple test', () => {
    return chai.request(app).get('/').then((res) => {
        expect(res.body).to.eql('Hi, in Vanchor api');
    });
  });
});