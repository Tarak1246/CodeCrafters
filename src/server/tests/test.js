const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const server = require('../testServer.js'); // Replace with path to your application
describe('GET /', () => {
  it('should return a message whether server is running or not', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null; // Ensure no errors occurred
        expect(res).to.have.status(200); // Verify successful response (200 OK)
        expect(res.text).to.be.equal("Hello, this is project tracker API!")
        done();
      });
  });
});

