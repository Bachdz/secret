const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;





const xlxs_to_eingabemaske = fs.readFileSync(path.resolve(__dirname, '../views/xlxs_to_eingabemaske.ejs'), 'utf8');



let dom;
let container;

describe('Test eingabemaske site', () => {
    beforeEach(()=> {
        dom = new JSDOM(xlxs_to_eingabemaske);
        container = dom.window.document;

    });
    it ('contains a header class', () => {
        expect(container.getElementsByClassName('header')).not.to.be.null;
    });

    it ('has eingabemaske-element for form filling', () => {
        expect(container.getElementById('eingabe-maske')).not.to.be.null;
        expect(container.getElementById('maske-content')).not.to.be.null;
    });
    it ('has a title element', () => {
        assert.equal(container.getElementsByClassName('big')[0].textContent,'Neuen Eintrag erstellen');

    });
    it ('has 3 heading elements', () => {
        assert.equal(container.getElementsByClassName('heading').length, 3);
        assert.equal(container.getElementsByClassName('heading')[0].textContent,'Basisinformationen zum Projekt');
        assert.equal(container.getElementsByClassName('heading')[1].textContent,'Was ist gut gelaufen?');
        assert.equal(container.getElementsByClassName('heading')[2].textContent,'Was ist schlecht gelaufen und welche Maßnahmen haben wir ergriffen? ');
    });
    it ('has table for filling basis information', () => {
        expect(container.getElementsByClassName('table-basis')).not.to.be.null;
        expect(container.getElementsByClassName('projekt-basis-info')).not.to.be.null;
    });

    it ('has a positive section', () => {
        expect(container.getElementsByClassName('positiv')).not.to.be.null;
    });

    it ('has a negative section', () => {
        expect(container.getElementsByClassName('negativ')).not.to.be.null;
    });
    it ('has a submit button', () => {
        expect(container.getElementById('submit')).not.to.be.null;
        assert.equal(container.getElementById('submit').value,'zur Vorschau');

    });


});

