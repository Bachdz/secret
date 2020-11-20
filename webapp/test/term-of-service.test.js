const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;


const termofserviceSite = fs.readFileSync(path.resolve(__dirname, '../views/term-of-service.ejs'), 'utf8');


let dom;
let container;

describe('Test term-of-service site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(termofserviceSite, {runScripts: 'dangerously'})
        container = dom.window.document;

    });

    it ('renders a title element', () => {
        expect(container.querySelector('title')).not.to.be.null;
        assert.equal(container.querySelector('title').textContent,'Bedingungen LL-DB');
    });

    it ('renders a header element', () => {
        expect(container.querySelector('h2')).not.to.be.null;
        assert.equal(container.querySelector('h2').textContent,'Nutzungsbedingungen der Lessons Learned Datenbank ');
    });

    it ('has a form for checking the accept conditions', () => {
        expect(container.querySelector('form')).not.to.be.null;
        // assert.equal(container.querySelector('form').id,'accept');
        expect((container.getElementById("accept").length)).to.not.be.null;
    });

    it ('has a form for checking the not-accept conditions', () => {
        expect(container.querySelector('form')).not.to.be.null;
        expect((container.getElementById("not-accept").length)).to.not.be.null;
    });

    it ('has a checkbox for accepting the user conditions.', () => {
        expect(container.querySelector('input')).not.to.be.null;
        assert.equal(container.querySelector('input').id,'checkBox');
    });

    it ('has a button for accepting the user conditions.', () => {
        expect(container.querySelector('button')).not.to.be.null;
        //get an array of all buttons
        let buttons= container.querySelectorAll('button');
        assert.equal(buttons[0].id,'acceptButton');
        expect(container.getElementById('acceptButton')).not.to.be.null;
    });

    it ('has a button for not accepting the user conditions.', () => {
        expect(container.querySelector('button')).not.to.be.null;
        //get an array of all buttons
        let buttons= container.querySelectorAll('button');
        assert.equal(buttons[1].id,'not-acceptButton');
        expect(container.getElementById('not-acceptButton')).not.to.be.null;

    });

    // TODO: Noch fehlend: Wenn man Checkbox anklickt -> dass Button "Weiter" erscheint (router.js test)
    // TODO: Wenn man Button "Weiter" angeklickt, index-Seite gerendert wird (router.js test)


});
