const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const path = require('path');
const fs = require('fs');

let chai = require('chai');
let expect= chai.expect;
let assert = chai.assert;


const detailsSite = fs.readFileSync(path.resolve(__dirname, '../views/details.ejs'), 'utf8');



let dom;
let container;

describe('Test details site', () => {
    beforeEach(()=> {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(detailsSite)
        container = dom.window.document;

    });

    it ('renders a title element', () => {
        expect(container.querySelector('title')).not.to.be.null;
        // console.log(container);
        // console.log(container.querySelector('title').textContent);
        assert.equal(container.querySelector('title').textContent,'Details');
    });

    it ('contains a header class', () => {
        expect(container.getElementsByClassName('header')).not.to.be.null;
    });

    it ('contains class for displaying the result', () => {
        expect(container.getElementById('display-result')).not.to.be.null;
    });

    it ('contains basic information of project', () => {
        expect(container.getElementById('basisinformation')).not.to.be.null;
        assert.equal(container.querySelector('table').id,'basis-table')

    });

    it ('contains positive information of project', () => {
        expect(container.getElementById('positiv')).not.to.be.null;
    });

    it ('contains negative information of project', () => {
        expect(container.getElementById('negativ')).not.to.be.null;
    });


    it ('in the negative section there are 2 sections: information and action ', () => {
        let negative = container.querySelectorAll('h3');
        assert.equal(negative[0].textContent,'Das würden wir anders machen');
        assert.equal(negative[1].textContent,'Maßnahme');

    });



});
