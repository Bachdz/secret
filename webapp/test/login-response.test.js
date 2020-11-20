const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const loginResponseSite = fs.readFileSync(path.resolve(__dirname, '../views/login-response.ejs'), 'utf8');



let dom;
let container;

describe('Test login response site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(loginResponseSite)
        container = dom.window.document;

    });

    it ('contains information for expired session', () => {
        assert.equal(container.querySelector('p').textContent,'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.');

    });
    it ('contains a button for back to login site', () => {
        expect(container.querySelector('button')).to.not.be.null;
        assert.equal(container.querySelector('button').textContent,'Zur Anmeldung');
    });





});


