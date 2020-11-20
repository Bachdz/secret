const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const header = fs.readFileSync(path.resolve(__dirname, '../views/header.ejs'), 'utf8');



let dom;
let container;

describe('Test header element', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(header)
        container = dom.window.document;
    });
    it ('contains a user information class', () => {
        expect(container.getElementsByClassName('user-information')).not.to.be.null;
    });

    it ('contains logout navigation', () => {
        assert.equal(container.querySelectorAll('a')[0].textContent,'Abmelden')
    });

    it ('contains login navigation', () => {
        assert.equal(container.querySelectorAll('a')[1].textContent,'Anmelden')
    });

    it ('contains an iav logo', () => {
        expect(container.getElementsByClassName('logo')).not.to.be.null;
        expect(container.querySelector('img')).not.to.be.null;
        expect(container.getElementById('logo-pic')).not.to.be.null;
    });
});


