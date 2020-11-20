// //Require the dev-dependencies
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// let expect= chai.expect;
//
// describe('Unit testing the login API', ()=> {
//     it('Login API should return status 404 with wrong credentials', (done) => {
//         chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//             .post('/api/Auth/Login')
//             .send({username :'test', password: 'test'})
//             .end(function (err,res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(404);
//                 expect(res).to.have.headers;
//                 done();
//             })
//     });
//     it('Login API should return status 200 with correct credentials', (done) => {
//         chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//             .post('/api/Auth/Login')
//             .send({username :'bdo', password: 'Lvsbsaspydep96!!!!'})
//             .end(function (err,res) {
//                 // console.log(res);
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(200);
//                 expect(res).to.have.headers;
//                 expect(res).to.be.json;
//                 done();
//             });
//
//     });
//
// });
//
//
// describe('Unit testing the result API', ()=> {
//
//     it('Result API should return status 401 without valid token credential', (done) => {
//
//         chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//             .get('/api/LessonsLearnedDb/text?text=test')
//             .end(function (err,res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(401);
//                 expect(res).to.have.headers;
//                 done();
//             })
//
//     });
//
//     describe('First get the access token by login ...', function () {
//         let auth = {};
//
//         before(loginUser(auth));
//
//         it('should return status 200 with valid token credential and result > 0', (done) => {
//             chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//                 .get('/api/LessonsLearnedDb/text?text=*')
//                 .auth(auth.token, {type: 'bearer'})
//                 .end(function (err,res) {
//                     // console.log(res);
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     expect(res).to.have.headers;
//                     expect(res).to.be.json;
//                     done();
//                 });
//         });
//
//
//         it('should return status 204 with valid token credential and result === 0', (done) => {
//             chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//                 .get('/api/LessonsLearnedDb/text?text=abc')
//                 .auth(auth.token, {type: 'bearer'})
//                 .end(function (err,res) {
//                     // console.log(res);
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(204);
//                     expect(res).to.have.headers;
//                     done();
//                 });
//         });
//     });
//
//
// });
//
//
//
//
// describe('Unit testing the details API', ()=> {
//
//     it(' should return status 401 without valid token credential', (done) => {
//
//         chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//             .get('/api/LessonsLearnedDb/hashId?hashId=Zb2lVnMBUFwTVmwySrTL')
//             .end(function (err,res) {
//                 expect(err).to.be.null;
//                 expect(res).to.have.status(401);
//                 expect(res).to.have.headers;
//                 done();
//             })
//
//     });
//
//     describe('First get the access token by login ...', function () {
//         let auth = {};
//         before(loginUser(auth));
//
//         it('should return status 200 with valid token credential and result > 0', (done) => {
//             chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//                 .get('/api/LessonsLearnedDb/hashId?hashId=Zb2lVnMBUFwTVmwySrTL')
//                 .auth(auth.token, {type: 'bearer'})
//                 .end(function (err,res) {
//                     // console.log(res);
//                     expect(err).to.be.null;
//                     expect(res).to.have.status(200);
//                     expect(res).to.have.headers;
//                     expect(res).to.be.json;
//                     done();
//                 });
//         });
//
//
//     });
//
//
//
//
// });
//
// function loginUser(auth) {
//     return function(done) {
//         chai.request('https://ll-db-backend.c1.k8s.iavgroup.local')
//             .post('/api/Auth/Login')
//             .send({username :'bdo', password: 'Lvsbsaspydep96!!!!'})
//             .end(function (err,res) {
//                 // console.log(res);
//                 auth.token = res.body.token;
//                 return done();
//             });
//
//
//
//     };
// }