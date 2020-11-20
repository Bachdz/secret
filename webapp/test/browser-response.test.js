const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const browserResponseSite = fs.readFileSync(path.resolve(__dirname, '../views/browser-response.ejs'), 'utf8');



let dom;
let container;

describe('Test browser response site', () => {
    beforeEach(()=> {
        dom = new JSDOM(browserResponseSite)
        container = dom.window.document;
    });

    it ('contains a header element', () => {
        expect(container.getElementsByClassName('header')).to.not.be.null;
    });

    it ('contains information incompatible browser', () => {
        assert.equal(container.querySelectorAll('p')[0].textContent,'Der verwendete Internet Explorer wird von der Lessons Learned Datenbank nicht unterstützt.');
        assert.equal(container.querySelectorAll('p')[1].textContent,'Bitte verwende Firefox oder Chrome für eine optimale Benutzererfahrung.');
    });


    it ('contains an alert picture', () => {
        expect(container.querySelector('img')).to.not.be.null;
    });

});


