require('dotenv').config();
const route = require ("../routes/index");
const request = require("supertest");
const requestModule = require("request");
const express = require("express");
const bodyParser = require('body-parser');
const chai = require('chai');
let sinon = require('sinon');
let spies = require('chai-spies');
chai.use(spies);
// const sandbox = chai.spy.sandbox();
const expect = chai.expect;

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//create app without credentials
let app = express();
    app.use(express.urlencoded({ extended: false }));
    app.set('view engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    // app.use(bodyParser.urlencoded({extended: true}));
    //
    // app.post('/', function (req,res,next) {
    //    res.send(req.body.username,req.body.password);
    //    next();
    // });


    app.use(route);

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//create app with valid credentials (not yet accept term of service )
let mockingLoggedIn;
    //setup mocking session
    mockingLoggedIn = express();
    mockingLoggedIn.use(express.urlencoded({extended: false}));
    mockingLoggedIn.set('view engine', 'ejs');
    // lets stub session middleware
    mockingLoggedIn.use(function (req, res, next) {
        req.session = {};
        next();
    });
    //provide a fake login
    mockingLoggedIn.get('*', function (req, res, next) {
        // and provide some accessToken value
        req.session.token = "test";
        req.session.vorname = 'bach';
        req.session.nachname = 'do';
        req.session.checked = false;
        next()
    });
    mockingLoggedIn.use(route);
//--------------------------------------------------------------------------------------------------------------------------------------------------------

//create app with valid credentials and with term of service accepted )
let mockingAcceptedTerm;
//setup mocking session
    mockingAcceptedTerm = express();
    mockingAcceptedTerm.use(express.urlencoded({extended: false}));
    mockingAcceptedTerm.set('view engine', 'ejs');
    mockingAcceptedTerm.use(function (req, res, next) { // lets stub session middleware
    req.session = {};
    next();
});
//provide a fake login
    mockingAcceptedTerm.get('*', function (req, res, next) {
    // and provide some accessToken value
    req.session.token = "test";
    req.session.vorname = 'bach';
    req.session.nachname = 'do';
    req.session.checked = true;
    next()
});
    mockingAcceptedTerm.use(route);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

describe("Testing / route and /login route works", () => {

    it('testing index route: GET / should return status 200 and render login site', (done)=> {
        request(app) // request an app ohne anmeldeinformation
            .get("/")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .end(function (err,res) {
                expect(err).to.be.null;
                expect(res.text).to.contain('Lessons Learned Datenbank Login');
            done();
        })
    });

    it('testing login route: GET /login should return status 200 and render login site', (done)=> {
        request(app)// request an app ohne anmeldeinformation
            .get("/login")
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .end(function (err,res) {
                // console.log(res.text);
                expect(err).to.be.null;
                expect(res.text).to.contain('Lessons Learned Datenbank Login');
                done();
        })

    });

});

describe("Testing login route with mocking session, redirect to term-of-service site", () => {


    it('should redirect to term of service route (status 302) with existed session (without accepting the term of service)', (done) => {
        request(mockingLoggedIn)
            .get('/login')
            .expect("Content-Type", "text/plain; charset=utf-8")
            .expect(302) // Statuscode für redirect
            .expect('Location', '/term-of-service', done)
    });

    });


describe("Testing Get /term-of-service route with mocking session (valid credentials)", () => {

        it('should render term of service site with GET /term-of-service)', (done) => {
            request(mockingLoggedIn)
                .get('/term-of-service')
                .expect("Content-Type", "text/html; charset=utf-8")
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.text).to.contain('Bedingungen LL-DB');
                    done();
                });
        });
        });


describe("Testing login route with mocking session, redirect to index site", () => {
        it('should redirect to term of service route (status 302) with existed session and already accepted the term of service)', (done) => {
            request(mockingAcceptedTerm)
                .get('/login')
                .expect("Content-Type", "text/plain; charset=utf-8")
                .expect(302)
                .expect('Location', '/index', done)
        });
    });


describe("Testing POST /index route for accepting the term of service", () => {
        it('should render the index site after user accepts the term of service conditions)', (done) => {
            request(mockingLoggedIn)
                .post('/index')
                .expect("Content-Type", "text/html; charset=utf-8")
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.text).to.contain('Lesson Learned Datenbank Startseite');
                    done();
                });
        });
    });

describe("Testing POST /not-accept route for not accepting the term of service", () => {
        it('should render the not-accept-term site if user click on the not-accept button)', (done) => {
            request(mockingLoggedIn)
                .post('/not-accept')
                .expect("Content-Type", "text/html; charset=utf-8")
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.text).to.contain('Schade!');
                    done();
                });
        });
    });

describe("Testing GET /index with NOT accepting the user condition", () => {
        it('should render the term of service site)', (done) => {
            request(mockingLoggedIn)
                .get('/index')
                .expect("Content-Type", "text/html; charset=utf-8")
                .expect(200)
                .end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res.text).to.contain('Bedingungen LL-DB');
                    done();
                });
        });
    });

describe("Testing GET /index with not logged in", () => {
        it('should render the login response site', (done) => {
            request(app)
                .get('/index')
                .expect("Content-Type", "text/html; charset=utf-8")
                .expect(200)
                .end(function (err,res) {
                    expect(err).to.be.null;
                    expect(res.text).to.contain('Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');
                    done();
                });
        });
    });

describe("Testing the POST /login route", () => {
    // let spy = chai.spy.on(requestModule, 'post');
    // let mock = sinon.mock(requestModule);
    // let spy= sinon.stub(route, 'request');
    it('should render the login site with the required information when login form is not fully filled', (done) => {
            request(app)
                .post('/login')
                .expect("Content-Type", "text/html; charset=utf-8")
                .expect(200)
                .end(function (err,res) {
                    // expect(spy).to.be.spy;
                    // expect(mock).to.be.called.once;
                    // sinon.assert.calledOnce(spy);
                    expect(err).to.be.null;
                    expect(res.text).to.contain('Bitte alle Felder ausfüllen');
                    done();

                });
        });

    it('should make a request to backend server when form is filled, but with wrong credentials', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({username:"test",password:"test"})
                .expect("Content-Type", "text/html; charset=utf-8")
                .expect(404)
                .end(function (err,res) {
                expect(err).to.be.null;
                expect(res.text).to.contain('ungültige Anmeldeinformationen');
                done();
            });
    });
});

    // });


// describe("Testing the GET /logout route", () => {
//     // let spy = sinon.spy(app, "req.session.destroy");
//     it('req.session.destroy function should be called', (done) => {
//
//         request(mockingAcceptedTerm)
//             .get('/logout')
//             .expect(200)
//             .end(function (err,res) {
//                 expect(err).to.be.null;
//                 done();
//             });
//     });
//
// });


describe("Testing Get /upload-new-case route with mocking session (valid credentials)", () => {

    it('should render upload new case site with GET /upload-new-case)', (done) => {
        request(mockingAcceptedTerm)
            .get('/upload-new-case')
            .expect("Content-Type", "text/html; charset=utf-8")
            .expect(200)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res.text).to.contain('Neuen Eintrag erstellen');
                done();
            });
    });
});