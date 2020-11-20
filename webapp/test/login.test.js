const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;





const loginSite = fs.readFileSync(path.resolve(__dirname, '../views/login.ejs'), 'utf8');



let dom;
let container;

describe('Test login site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(loginSite, {runScripts: 'dangerously'});
        container = dom.window.document;

    });

    it ('renders a heading element', () => {
        expect(container.querySelector('h1')).not.to.be.null;
        assert.equal(container.querySelector('title').textContent,'Lessons Learned Datenbank Login');
    });

    it ('has a form for writing the login information', () => {
        expect(container.querySelector('form')).not.to.be.null;
        assert.equal(container.querySelector('form').className,'login-form')
    });

    it ('form has 4 child elements: 2 input for username and password, 1 button for confirmation and 1 for contact information', () => {
        expect(container.querySelector('input')).not.to.be.null;
        expect(container.querySelector('button')).not.to.be.null;
        expect(container.getElementsByClassName('contact-person')).not.to.be.null;
        assert.equal(container.querySelector('form').children.length,4);
        // console.log(container.querySelector('form').children.length)
    }) ;

    it ('form has a input for username', () => {
        expect(container.querySelector('input')).not.to.be.null;
        // assert.equal(container.querySelector('input').length,2);
        // console.log(container.getElementsByName("username").length);
       expect((container.getElementsByName("username").length)).to.not.be.null;
    });
    it ('form has a input for password', () => {
        expect(container.querySelector('input')).to.not.be.null;
        // assert.equal(container.querySelector('form').length,2);
        expect((container.getElementsByName("password").length)).to.not.be.null;
    });

    it ('contains a background picture', () => {
        expect(container.querySelector('img')).not.to.be.null;
        assert.equal(container.querySelector('img').src,"/images/empfang.jpg");
        // console.log(container.querySelector('form').children.length)
    })


});

