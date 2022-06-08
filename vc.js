// MAIN MENU
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener('click', function(){
    links.classList.toggle('show-links');
})

// regex count function
function countVowel(str){
        let count = str.match(/[aeiouáàâãäéèêíìîóòõöôúç]/gi);

        if(count===null){
            count = 0;
        }
        else{
            count = count.length;
        }

        return count;
}

//input
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');

form.addEventListener('submit',addItem);

function addItem(e){
    e.preventDefault();
    const value = grocery.value;

    if(value){      

        result = countVowel(value);
        container.classList.add('show-container');
        displayAlert(result,"success");
    }
    else{
        displayAlert("0","danger");
    }
}

function displayAlert(text,action){
    // display alert
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function(){
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
    },4000);
}

function createListItem(value){
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p><div class="btn-container"></div>`;
    list.appendChild(element);
}