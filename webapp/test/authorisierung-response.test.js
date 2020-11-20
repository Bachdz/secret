const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const authResponseSite = fs.readFileSync(path.resolve(__dirname, '../views/authorisierung-response.ejs'), 'utf8');



let dom;
let container;

describe('Test auth response site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(authResponseSite)
        container = dom.window.document;

    });
    it ('contains a title element', () => {
        expect(container.querySelector('h1')).not.to.be.null;
        assert.equal(container.querySelector('title').textContent,'Lessons Learned Datenbank Login');
    });

    it ('renders a heading element', () => {
        expect(container.querySelector('h1')).not.to.be.null;
        assert.equal(container.querySelector('h1').textContent,'Lessons Learned Datenbank');
    });


    it ('contains information for not authenticated user', () => {
        let infos = container.querySelectorAll('b');
        assert.equal(infos[0].textContent,'Zugang zum System');
        assert.equal(container.querySelectorAll('p')[1].textContent,'Die LL-DB steht den nachfolgend genannten Funktionsrollen von IAV zur Verfügung:');
        assert.equal(infos[1].textContent,'-Executive-Projektleitern (EPL),');
        assert.equal(infos[2].textContent,'-Senior-Projektleitern (SPL) und');
        assert.equal(infos[3].textContent,'-Projektleitern (PL)');
    });
    it ('contains a button for back to login site', () => {
        expect(container.querySelector('button')).to.not.be.null;
        assert.equal(container.querySelector('button').textContent,'Zurück zur Anmeldung');
    });





});


