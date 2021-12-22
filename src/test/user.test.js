/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'development';
const supertest = require('supertest');
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app/routes/user.route');
const User = require('../app/models/user.model');
const conn = require('../config/db/connection');

// const defaultUser = { email: 'supertest@gmail.com', password: 'test' };

// #region testting temp
// const createUser = async () => {
//   const UserModel = new User(defaultUser);
//   await UserModel.save();
// };

// const getDefaultUser = async () => {
//   let users = await User.find({ "email": defaultUser.email });
//   if (users.length === 0) {
//     await createUser();
//     return getDefaultUser();
//   } else {
//     return users[0];
//   }
// };

// const loginWithDefaultUser = async () => {
//   let user = await getDefaultUser();
//   return request.post(process.env.API_BASE + "/auth/signin")
//     .send({ "email": user.email, "password": user.password })
//     .expect(200);
// };

// const cleanExceptDefaultUser = async () => {
//   let user = await getDefaultUser();
//   await User.deleteMany({ "email": { $ne: user.email } });
// };

// describe("# Auth APIs", () => {
//   const apiBase = process.env.API_BASE || '/api';
//   const newUser = { "email": "test-new@gmail.com", "password": "test" };
//   it("should create user", (done) => {
//     cleanExceptDefaultUser().then(() => {
//       return request.post(apiBase + '/auth/signup')
//         .send(newUser)
//         .expect(200)
//         .then(res => {
//           res.body.success.should.be.true;
//         });
//     });
//     done();
//   });

//   it("should retrieve the token", (done) => {
//     cleanExceptDefaultUser().then(res => {
//       return loginWithDefaultUser().then(res => {
//         res.status.should.equal(200);
//         res.body.success.should.be.true;
//         res.body.token.should.not.be.empty;
//       });
//     });
//     done();
//   });

//   it("should not login with the right user but wrong password", (done) => {
//     supertest(app).post(apiBase + '/auth/signin')
//       .send({ "email": newUser.username, "password": "random" })
//       .expect(401);
//     done();
//   });

//   it("should return invalid credentials error", (done) => {
//     supertest(app).post(apiBase + '/auth/signin')
//       .send({ "email": newUser.username, "password": "" })
//       .expect(401)
//       .then(res => {
//         return supertest(app).post(apiBase + '/auth/signin')
//           .send({ "email": newUser.username, "password": "mypass" })
//           .expect(401);
//       });
//     done();
//   });
// });

// describe('POST /', function () {
//   it('responds with json', function (done) {
//     supertest(app)
//       .post('/')
//       .send({
//         name: 'john',
//         email: 'testpost1@gmail.com'
//       })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .end(function (err, res) {
//         if (err) return done(err);

//       });
//     done();
//   });
// });
// #endregion

describe('user/', () => {
  before((done) => {
    conn.connect()
      // const data = User.create({
      //   enable: true,
      //   name: "nhan",
      //   accountname: "testing",
      //   diplayname: "test1",
      //   email: "testpost@gmail.com",
      //   password: "testsuper",
      // })
      .then(() => done())
      .catch((err) => done(err));
  });
  describe('GET /', () => {
    it('returns json', async () => {
      request.get('/').expect(200, (err) => {
        console.log(err);
      });

      expect(response.status).to.eql(200);
      expect(response.body.data.length).to.eql(30);
    });
  });
  describe('GET /', () => {
    it('repond with json containing a list of all users', (done) => {
      supertest(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
        });
      done();
    });
  });

  describe('GET/:id', () => {
    it('responds with json', (done) => {
      supertest(app)
        .get('/:id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
        });
      done();
    });
  });
  describe('GET/:id', () => {
    it('respond with json user not found', (done) => {
      request(app)
        .get('/:id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404) // expecting HTTP status code
        .expect('"user not found"') // expecting content value
        .end((err) => {
          if (err) return done(err);
        });
      done();
    });
  });

  describe('POST /', () => {
    const user = new User({
      enable: true,
      name: 'nhan',
      accountname: 'testing',
      diplayname: 'test1',
      email: 'testpost@gmail.com',
      password: 'testsuper',
    });
    user.save();

    it('respond with 201 created', (done) => {
      request(app)
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err) => {
          if (err) return done(err);
        });
      done();
    });
  });

  describe('POST /', () => {
    it('should return user when the all request body is valid', (done) => {
      supertest(app)
        .post('/')
        .send({
          enable: true,
          name: 'nhan',
          accountname: 'testing',
          diplayname: 'test1',
          email: 'testpost@gmail.com',
          password: 'testsuper',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
        });
      done();
      // add more tests to validate request body accordingly eg, make sure name is more than 3 characters etc
    });
  });

  describe('PUT /:id', () => {
    it('should update the existing order and return 200', (done) => {
      const user = new User({
        name: 'test',
        email: 'testput@gmail.com',
      });
      user.save();

      supertest(app)
        .put(`/${user._id}`)
        .send({
          name: 'newTest25',
          email: 'newemail@gmail.com',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
        });
      done();
    });
  });

  describe('DELETE /:id', () => {
    it('should delete requested id and return response 200', (done) => {
      const user = new User({
        name: 'test',
        email: 'testdel@gmail.com',
      });
      user.save();

      const res = supertest(app)
        .delete(`/${user._id}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
        });
      done();
    });

    it('should return 404 when deleted user is requested', (done) => {
      const user = new User({
        name: 'test',
        email: 'test@gmail.com',
      });
      user.save();

      let res = request(app).delete(`/${user._id}`);
      expect(200);

      res = request(app).get(`/${user._id}`);
      expect(404);
      done();
    });
  });
  // after( async(done) => {

  //   await User.remove({})
  //   done()
  // })
});
