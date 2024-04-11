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

// Bearer token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluVXNlciIsImlhdCI6MTcxMjc5MDkxNCwiZXhwIjoxNzEyNzk0NTE0fQ.4nnkeH69sYrImYJVVF-tfptnCI4FG2iWvabQm_bZrpg';

describe('GET /v2/getProjects', () => {
  it('should return an array of projects', (done) => {
    chai.request(server)
      .get('/v2/getProjects') // Update the endpoint
      .set('Authorization', `Bearer ${token}`) // Set the Authorization header with the bearer token
      .end((err, res) => {
        expect(err).to.be.null; // Ensure no errors occurred
        expect(res).to.have.status(200); // Verify successful response (200 OK)
        // Log the actual response body for examination
        console.log('Actual response body:', res.body);
        done();
      });
  });
});