const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const searchboxSite = fs.readFileSync(path.resolve(__dirname, '../views/searchbox.ejs'), 'utf8');



let dom;
let container;

describe('Test searchbox', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(searchboxSite, {runScripts: 'dangerously'})
        container = dom.window.document;

    });

    it ('contains a input for search words', () => {
        expect(container.querySelector('input')).to.not.be.null;
        expect(container.getElementsByName('search')).to.not.be.null;
        assert.equal(container.querySelector('input').id,'myInput');
    });

    it ('contains an autocomplete class for auto complete of search input', () => {
        expect(container.getElementsByClassName('autocomplete')).not.to.be.null;
        expect(container.getElementById('fill')).not.to.be.null;
        assert.equal(container.querySelector('input').id,'myInput');

    });



});

// TODO: Autocomplete, Suchen starten noch testen --> JavaScript-Code
