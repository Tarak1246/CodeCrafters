const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const server = require("../testServer.js");
let token;
describe("Server running check", () => {
  it("should return a message whether server is running or not", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(err).to.be.null; // Ensure no errors occurred
        expect(res).to.have.status(200); // Verify successful response (200 OK)
        expect(res.text).to.be.equal("Hello, this is project tracker API!");
        done();
      });
  });
});

describe("admin user creation", () => {

  it("should return 401 (Unauthorized) for invalid credentials", (done) => {
    const username = "test";
    const password = "test@1234";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const requestBody = {
      username: "adminUser",
      email: "test@gmail.com",
      password: "Pwd@1234",
      firstname: "fname",
      lastname: "lname",
      role: "admin",
    };

    chai
      .request(server)
      .post("/v/adminUser")
      .set("Authorization", `Basic ${encodedCredentials}`)
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.text).to.be.equal("Unauthorized");
        done();
      });
  });

  it("should return 500 (Bad Request) for missing request body", (done) => {
    const username = "CodeCrafters";
    const password = "CodeCrafters@1234";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const requestBody = {};

    chai
      .request(server)
      .post("/v/adminUser")
      .set("Authorization", `Basic ${encodedCredentials}`)
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(500); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('request body invalid'); 
        done();
      });
  });

  it("Only admin role user can create using this api!", (done) => {
    const username = "CodeCrafters";
    const password = "CodeCrafters@1234";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const requestBody = {
      "username": "adminUser",
      "email": "test@gmail.com",
      "password":"Pwd@1234",
      "firstname": "fname",
      "lastname": "lname",
      "role":"employee"
  };

    chai
      .request(server)
      .post("/v/adminUser")
      .set("Authorization", `Basic ${encodedCredentials}`)
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(400); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('Only admin role user can create using this api!'); 
        done();
      });
  });

  it("Email format should be @gmail.com", (done) => {
    const username = "CodeCrafters";
    const password = "CodeCrafters@1234";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const requestBody = {
      "username": "adminUser",
      "email": "test@gmai.com",
      "password":"Pwd@1234",
      "firstname": "fname",
      "lastname": "lname",
      "role":"admin"
  };

    chai
      .request(server)
      .post("/v/adminUser")
      .set("Authorization", `Basic ${encodedCredentials}`)
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(400); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('Email format should be @gmail.com'); 
        done();
      });
  });

  it("Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol, and be at least 8 characters long", (done) => {
    const username = "CodeCrafters";
    const password = "CodeCrafters@1234";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const requestBody = {
      "username": "adminUser",
      "email": "test@gmail.com",
      "password":"Pwd@1",
      "firstname": "fname",
      "lastname": "lname",
      "role":"admin"
  };

    chai
      .request(server)
      .post("/v/adminUser")
      .set("Authorization", `Basic ${encodedCredentials}`)
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(400); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol, and be at least 8 characters long'); 
        done();
      });
  });

  it("successfull admin user creation", (done) => {
    const username = "CodeCrafters";
    const password = "CodeCrafters@1234";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const requestBody = {
      username: "adminUser",
      email: "test@gmail.com",
      password: "Pwd@1234",
      firstname: "fname",
      lastname: "lname",
      role: "admin",
    };

    chai
      .request(server)
      .post("/v/adminUser")
      .set("Authorization", `Basic ${encodedCredentials}`)
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(201); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('Admin user created successfully'); 
        done();
      });
  });

  it("Only one user should have role as an admin!", (done) => {
    const username = "CodeCrafters";
    const password = "CodeCrafters@1234";
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString(
      "base64"
    );
    const requestBody = {
      "username": "adminUser",
      "email": "test@gmail.com",
      "password":"Pwd@1234",
      "firstname": "fname",
      "lastname": "lname",
      "role":"admin"
  };

    chai
      .request(server)
      .post("/v/adminUser")
      .set("Authorization", `Basic ${encodedCredentials}`)
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(400); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('Only one user should have role as an admin!'); 
        done();
      });
  });

});

describe("user registraion", () => {

  it("successfull user registration", (done) => {   
    const requestBody = {"username":"tarak123","email":"taraksai@gmail.com","password":"Tarak128@","confirm_password":"Tarak128@"};
    chai
      .request(server)
      .post("/v/register")
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(201); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('user registration success!'); 
        done();
      });
  });

  it("duplicate username while registration", (done) => {   
    const requestBody = {"username":"tarak123","email":"taraksai@gmail.com","password":"Tarak128@","confirm_password":"Tarak128@"};
    chai
      .request(server)
      .post("/v/register")
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(409); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('username already exist!'); 
        done();
      });
  });

  it("duplicate user email while registration", (done) => {   
    const requestBody = {"username":"tarak12","email":"taraksai@gmail.com","password":"Tarak128@","confirm_password":"Tarak128@"};
    chai
      .request(server)
      .post("/v/register")
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(409); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('email already exist!'); 
        done();
      });
  });

});

describe("user login", () => {

  it("successfull user registration", (done) => {   
    const requestBody = {"username":"adminUser","password":"Pwd@1234"};
    chai
      .request(server)
      .post("/v1/login")
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(4);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(200); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('user login success!'); 
        expect(res.body).to.have.property('token'); 
        expect(res.body).to.have.property('user'); 
        token = res.body.token;
        done();
      });
  });
  it("Invalid credentials", (done) => {   
    const requestBody = {"username":"adminUser","password":"Pwd@123"};
    chai
      .request(server)
      .post("/v1/login")
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(401); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('Invalid credentials!');
        done();
      });
  });

});

describe('GET /v2/getUsers', () => {
  let id,data;
  it('should return an array of users', (done) => {
    chai.request(server)
      .get('/v/getUsers')
      .set('Authorization', `Bearer ${token}`) 
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(200); 
        expect(res.body).to.have.property('data'); 
        data = res.body.data[0];
        id = res.body.data[0].id
        done();
      });
  });
  it('should update user privileges', (done) => {
    chai.request(server)
      .put('/v2/updateUserPrivileges/'+id)
      .set('Authorization', `Bearer ${token}`) 
      .send(data)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(200); 
        expect(res.body).to.have.property('data'); 
        done();
      });
  });
});

describe('settings tab', () => {
  it('get logged in user data', (done) => {
    chai.request(server)
      .get('/v2/getLoggedinUserData/adminUser')
      .set('Authorization', `Bearer ${token}`) 
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(200); 
        expect(res.body).to.have.property('data'); 
        done();
      });
  });
  const requestBody = {"username":"adminUser","email":"test1@gmail.com","firstname":"firstname","lastname":"lastnam"};
  it('should update user information', (done) => {
    chai.request(server)
      .post('/v2/updateUserData')
      .set('Authorization', `Bearer ${token}`) 
      .send(requestBody)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(typeof res.body).to.equal('object');
        expect(Object.keys(res.body).length).to.equal(2);
        expect(res.body).to.have.property('status'); 
        expect(res.body.status).to.equal(200); 
        expect(res.body).to.have.property('data'); 
        expect(res.body.data).to.equal('User updated successfully');
        done();
      });
  });
});

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
