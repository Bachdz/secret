const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;


const resultSite = fs.readFileSync(path.resolve(__dirname, '../views/result.ejs'), 'utf8');



let dom;
let container;

describe('Test result site', () => {



    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(resultSite);
        container = dom.window.document;

    });

    it ('renders a title element', () => {
        expect(container.querySelector('title')).not.to.be.null;
        // console.log(container);
        // console.log(container.querySelector('title').textContent);
        assert.equal(container.querySelector('title').textContent,'Results');
    });

    it ('contains a header class', () => {
        expect(container.getElementsByClassName('header')).not.to.be.null;
    });

    it ('contains a search box', () => {
        expect(container.getElementsByClassName('searchbox')).not.to.be.null;
    });

    it ('contains a container for displaying the result', () => {
        expect(container.getElementsByClassName('result-container')).not.to.be.null;
        expect(container.getElementById('display-result')).not.to.be.null;
    });


    it ('result has a picture for copy result link', () => {
        expect(container.querySelector('img')).not.to.be.null;
        expect(container.getElementById('copy-link')).not.to.be.null;
        assert.equal(container.getElementById('copy-link').title,'Link zum Dokument kopieren');
    });

    it ('result has a title', () => {
        expect(container.getElementsByClassName('result-title')).not.to.be.null;
    });

    it ('result has a snippet for brief descriptions', () => {
        expect(container.getElementsByClassName('result-snippet')).not.to.be.null;
    });

    it ('result has meta data', () => {
        expect(container.getElementsByClassName('result-metadata')).not.to.be.null;
    });

    it ('contains the footer-new class', () => {
        expect(container.getElementsByClassName('footer-new')).not.to.be.null;
    });

    it ('contains the fileupload class', () => {
        expect(container.getElementsByClassName('fileupload')).not.to.be.null;
    });




});
