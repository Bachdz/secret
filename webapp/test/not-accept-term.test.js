const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;


const notaccepttermSite = fs.readFileSync(path.resolve(__dirname, '../views/not-accept-term.ejs'), 'utf8');



let dom;
let container;

describe('Test not-accept-term site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(notaccepttermSite, {runScripts: 'dangerously'})
        container = dom.window.document;

    });

    it ('renders a title element', () => {
        expect(container.querySelector('title')).not.to.be.null;
        assert.equal(container.querySelector('title').textContent,'Schade!');
    });

    it ('contains the iav logo', () => {
        expect(container.querySelector('img')).not.to.be.null;
        assert.equal(container.querySelector('img').src,'images/logo.svg');
    });

    it ('contains picture class', () => {
        expect(container.getElementsByClassName('picture')).not.to.be.null;
    });

    it ('contains a picture', () => {
        expect(container.getElementById('picSpielregeln')).not.to.be.null;
    });

});
