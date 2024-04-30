const section = document.querySelector('section');

let para1 = document.createElement('p');
let para2 = document.createElement('p');
let motherInfo = 'The mother cats are called ';
let kittenInfo;
const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/tasks/json/sample.json';

fetch(requestURL)
    .then(response => response.text())
    .then(text => displayCatInfo(text))


function displayCatInfo(catString) {
    let total = 0;
    let male = 0;

    // Add your code here
    let info = JSON.parse(catString);
    for (i in info) {
        if (i < (info.length - 1)) {
            motherInfo += `${info[i].name}, `;
        } else {
            motherInfo += `${info[i].name}.`;
        };

        for (j in info[i].kittens) {
            console.log(info[i]);
            console.log(info[i][j]);
            total += 1;
            if (info[i].kittens[j].gender === `m`) {
                male += 1;
            }
        };
    };

    kittenInfo = `total kitten: ${total}, male: ${male}.`;

    // Don't edit the code below here!

    para1.textContent = motherInfo;
    para2.textContent = kittenInfo;
}

section.appendChild(para1);
section.appendChild(para2);