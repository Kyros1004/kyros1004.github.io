// MAIN MENU
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener('click', function(){
    links.classList.toggle('show-links');
})

// CLOCK
function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
      
    if(hh > 12){
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    var t = setTimeout(function(){ currentTime() }, 1000); 
  
  }



// grocery list
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let editFlag=false;
let editID="";

    //events
form.addEventListener('submit',addItem);
clearBtn.addEventListener('click',clearItems);
window.addEventListener("DOMContentLoaded",setupItems);

//functions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if(value && !editFlag){      

        createListItem(id, value);
        container.classList.add('show-container');
        displayAlert("Item added to the list","success");
        addToLocalStorage(id,value);
        setBackToDefault();
    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        displayAlert("Value changed","success");
        editLocalStorage(editID,value);
        setBackToDefault();
    }
    else{
        displayAlert("Empty Value!","danger");
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
    },1000);
}

function setBackToDefault(){
    grocery.value="";
    editFlag=false;
    editID="";
    submitBtn.textContent="Submit";
}

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    container.classList.remove("show-container");
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }

    displayAlert("Empty List","success");
    setBackToDefault();
    
    localStorage.removeItem('list');
}

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    if(list.children.length===0){
        container.classList.remove("show-container");
    }
    displayAlert("Deleted item","success");
    setBackToDefault();
    
    removeFromLocalStorage(id);
}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

function addToLocalStorage(id,value){
    const grocery = {id,value};
    let items = localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));
}

function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
        if(item.id!==id){
            return item;
        }
    })
    localStorage.setItem('list',JSON.stringify(items));
}

function editLocalStorage(id, value){
    let items = getLocalStorage();
    items = items.map(function(item){
        if(item.id===id){
            item.value = value;
        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

function setupItems(){
    let items = getLocalStorage();
    if(items.length>0){
        items.forEach(function(item){
            createListItem(item.id,item.value);
        })
        container.classList.add('show-container');
    }
}

function createListItem(id,value){
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p><div class="btn-container"><button type="button" class="edit-btn"><i class="fas fa-edit"></i></button><button type="button" class="delete-btn"><i class="fas fa-trash"></i></button></div>`;
        
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');

    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click',editItem);

    list.appendChild(element);
}