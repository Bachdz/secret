const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;



const uploadResponseSite = fs.readFileSync(path.resolve(__dirname, '../views/fileupload-response.ejs'), 'utf8');



let dom;
let container;

describe('Test upload response site', () => {
    beforeEach(()=> {
        dom = new JSDOM(uploadResponseSite)
        container = dom.window.document;
    });

    it ('contains a header element', () => {
        expect(container.getElementsByClassName('header')).to.not.be.null;
    });

    it ('contains a class for information element', () => {
        expect(container.getElementsByClassName('content')).to.not.be.null;
    });

    it ('contains an alert picture', () => {
        expect(container.querySelector('img')).to.not.be.null;
        expect(container.getElementById('alert')).to.not.be.null;
    });
    it ('contains an success checkmark', () => {
        expect(container.getElementsByClassName('checkmark')).to.not.be.null;
    });


     it ('contains 4 buttons', () => {
         assert.equal(container.querySelectorAll('button').length,4);
    });


});


