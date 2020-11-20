const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const footer = fs.readFileSync(path.resolve(__dirname, '../views/footer-new.ejs'), 'utf8');



let dom;
let container;

describe('Test footer element', () => {
    beforeEach(()=> {
        dom = new JSDOM(footer);
        container = dom.window.document;
    });
    it ('contains element for adding new case', () => {
        assert.equal(container.querySelectorAll('a')[0].textContent,'Neuen Eintrag erstellen')
    });

    it ('contains element for showing information of the site', () => {
        assert.equal(container.querySelectorAll('a')[1].textContent,'Informationen zur Lessons Learned Datenbank')
    });

    it ('contains element for showing privacy information', () => {
        assert.equal(container.querySelectorAll('a')[2].textContent,'Datenschutzinformationen')
    });

    it ('contains contact details of responsible person', () => {
        expect(container.getElementsByClassName('user-information')).not.to.be.null;
        assert.equal(container.getElementsByClassName('right').length,2);

    });




});


