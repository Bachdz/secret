const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const indexHTMLSite = fs.readFileSync(path.resolve(__dirname, '../views/index.ejs'), 'utf8');



let dom;
let container;

describe('Test index site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(indexHTMLSite, {runScripts: 'dangerously'})
        container = dom.window.document;

    });

    it ('renders a title element', () => {
        expect(container.querySelector('title')).not.to.be.null;
        // console.log(container);
        // console.log(container.querySelector('title').textContent);
        assert.equal(container.querySelector('title').textContent,'Lesson Learned Datenbank Startseite');
    });

    it ('contains a header class', () => {
        expect(container.getElementsByClassName('header')).not.to.be.null;
    });

    it ('contains a search box', () => {
        expect(container.getElementsByClassName('searchbox')).not.to.be.null;
    });

    it ('contains a contact box', () => {
        expect(container.getElementsByClassName('contact-new')).not.to.be.null;
        expect(container.getElementsByClassName('contact-info')).not.to.be.null;

    });

    it ('contains top10lesson', () => {
        expect(container.getElementsByClassName('top10lesson')).not.to.be.null;
        assert.equal(container.getElementsByClassName('heading')[0].textContent,'Top Lessons Learned');
    });

    it ('contains the footer-new class', () => {
        expect(container.getElementsByClassName('footer-new')).not.to.be.null;
    });

    it ('contains the fileupload class', () => {
        expect(container.getElementsByClassName('fileupload')).not.to.be.null;
    });

});
