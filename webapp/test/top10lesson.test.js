const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;


const top10Site = fs.readFileSync(path.resolve(__dirname, '../views/top10lesson.ejs'), 'utf8');



let dom;
let container;

describe('Test top 10 lessons learned site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(top10Site);
        container = dom.window.document;

    });


    it ('contains the swiper container class', () => {
        expect(container.getElementsByClassName('swiper-container')).not.to.be.null;
    });

    it ('contains the swiper-slide for each element container class', () => {
        expect(container.getElementsByClassName('swiper-slide')).not.to.be.null;
    });

    it ('contains 10 titles for 10 lessons learned element', () => {
        expect(container.getElementsByClassName('title')).not.to.be.null;
        assert.equal(container.getElementsByClassName('title').length,10);
    });

    it ('test the name of each title', () => {
        assert.equal(container.getElementsByClassName('title')[0].textContent,"Kenntnis von Anforderungen und Zielen");
        assert.equal(container.getElementsByClassName('title')[1].textContent,"Definition von Rollen und Verantwortlichkeiten");
        assert.equal(container.getElementsByClassName('title')[2].textContent,"Fehlendes Know-how");
        assert.equal(container.getElementsByClassName('title')[3].textContent,"Risikomanagement");
        assert.equal(container.getElementsByClassName('title')[4].textContent,"Synchronisation der Teilgewerke");
        assert.equal(container.getElementsByClassName('title')[5].textContent,"Integration neuer Projekt-Kollegen");
        assert.equal(container.getElementsByClassName('title')[6].textContent,"Informations-verteilung");
        assert.equal(container.getElementsByClassName('title')[7].textContent,"Liefergegenstände");
        assert.equal(container.getElementsByClassName('title')[8].textContent,"Entscheidungs-vorbereitung");
        assert.equal(container.getElementsByClassName('title')[9].textContent,"Tool- und Dokumenten-management");
    });

    it ('contains 10 brief description sections of each element', () => {
        expect(container.getElementsByClassName('des')).not.to.be.null;
        assert.equal(container.getElementsByClassName('des').length,10);
    });

    it ('contains 10 click button for more information ', () => {
        expect(container.getElementsByClassName('box-infor-more')).not.to.be.null;
        assert.equal(container.getElementsByClassName('box-infor-more').length,10);
        expect(container.querySelectorAll('a')).not.to.be.null;
        assert.equal(container.querySelectorAll('a').length,10);
        assert.equal(container.querySelector('a').textContent,"Mehr ...");
    });
    it ('contains navigation arrows ', () => {
        expect(container.getElementsByClassName('swiper-button-next')).not.to.be.null;
        expect(container.getElementsByClassName('swiper-button-prev')).not.to.be.null;
    });




});
