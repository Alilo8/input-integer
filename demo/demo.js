const inputInteger = require('..');

const opts1 = { min: 1, max: 150 };
const opts2 = { min: 1873, max: 2023 };

const input1 = inputInteger(opts1);
const input2 = inputInteger(opts2);


const title = 'My demo fork';
const subtitle = 'Plz fill out the form';

const page = document.createElement('div');
page.innerHTML = `
    <h1>${title}</h1>
    <h2>${subtitle}</h2>
    <h3>Enter your age</h3>
    <x></x>
    <h4>Enter your birth year</h4>
    <y></y>

`
page.querySelector('x').replaceWith(input1)
page.querySelector('y').replaceWith(input2)

document.body.append(page);