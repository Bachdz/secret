const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;





const fileUpload = fs.readFileSync(path.resolve(__dirname, '../views/fileupload.ejs'), 'utf8');



let dom;
let container;

describe('Test file upload element', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(fileUpload);
        container = dom.window.document;

    });
    it ('consists an modal to popup when user call it', () => {
        expect(container.getElementsByClassName('modal-content')).not.to.be.null;
    });

    it ('has a close element to close the modal', () => {
        expect(container.getElementsByClassName('close')).not.to.be.null;
    });

    it ('has a heading element', () => {
        expect(container.getElementById('heading')).not.to.be.null;
        assert.equal(container.getElementById('heading').textContent,'Neuen Eintrag erstellen');
    });

    it ('has a detail element for upload information', () => {
        expect(container.getElementById('detail')).not.to.be.null;
        assert.equal(container.getElementById('detail').childNodes[1].textContent,'Du kannst eine Excel-Datei in die Datenbank laden oder den neuen Eintrag direkt mit Hilfe einer Eingabemaske erstellen.')
    });

    it ('has 2 buttons for xlxs file upload or for the input screen', () => {
        expect(container.querySelectorAll('button').length).not.to.be.null;
        assert.equal(container.querySelectorAll('button').length,2);
        assert.equal(container.querySelectorAll('button')[0].textContent,'*.xls File hochladen');
        assert.equal(container.querySelectorAll('button')[1].textContent,'direkt zur Eingabemaske');
    });

    it ('has a form and input for uploading file', () => {
        expect(container.getElementById('upload-file')).not.to.be.null;
        expect(container.querySelector('form')).not.to.be.null;
        expect(container.querySelector('input')).not.to.be.null;
        assert.equal(container.querySelector('label').textContent,'Bitte einen Fall auswählen:');
    });

    it ('has 2 inputs, one is for upload file and one is for submitting file upload', () => {
        assert.equal(container.querySelectorAll('input')[0].type,'file');
        assert.equal(container.querySelectorAll('input')[1].type,'submit');
    });

    it ('has a template for downloading', () => {
        expect(container.querySelector('a')).not.to.be.null;
        assert.equal(container.querySelectorAll('a')[1].textContent,'Vorlage');
    });



});

