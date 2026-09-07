
let products = document.getElementsByClassName("product");
let result = document.getElementById("result");
let title = document.getElementById("main-title");

title.innerText = "My JavaScript Store";
title.style.color = "white";
title.style.backgroundColor = "blue";
title.style.padding = "15px";

products[2].setAttribute("data-price", "700");

for (let i= 0; i < products.length ; i++){
    products[i].style.backgroundColor ="lightgray";
    products[i].style.color ="black";
    products[i].style.padding ="10px";
    products[i].style.margin="5px";
}

function showProducts(){

    result.innerHTML ="";
    for (let i= 0; i<products.length; i++){

        let name = products[i].textContent;
        let price = products[i].getAttribute("data-price");

        result.innerHTML += name +": $" + price + "<br>";
    
    }
}

function calculateTotal(){

    let items = document.querySelectorAll(".product");

     let total = 0;

     result.innerHTML = "";
     items.forEach(function(item){
        let name = item.textContent;
        let price = Number(item.getAttribute("data-price"));

total +=price;
            result.innerHTML += name +" : $" + price + "<br>"

     });

result.innerHTML +="<br></br>Total =$" + total + "</br>";

}

function randomDiscount(){
    
    let random = Math.random();
    let floor = Math.floor(random * 100);
    let round = Math.round(10.6);
    let ceil = Math.ceil(10.2);
    let squareRoot = Math.sqrt(81);
    let power = Math.pow(2,5);


    result.innerHTML = 
    "Math.random(): "+ random + "<br>" +
    "Math.floor(): "+ floor + "<br>" +
    "Math.round(): "+ round + "<br>" +
    "Math.ceil(): "+ ceil + "<br>" +
    "Math.sqrt(): "+ squareRoot + "<br>" +
    "Math.pow(): " + power;

}

let sentence =" JavaScript is Awsome  ";

console.log(sentence.split(" "));
console.log(sentence.slice(3,13));
console.log(sentence.toLowerCase());
console.log(sentence.toUpperCase());
console.log(sentence.trim());
console.log(sentence.indexOf("Awsome"));

if(sentence.indexOf("Awesome") != -1){
    console.log("Word Found");
}

else{
    console.log("Word not Found");

}

let names = ["Mustafa","Zeinab","Yasma"];

names.push("Nour");
names.pop();
names.shift();
names.unshift("Maya");

names.forEach(function(name){
    console.log(name);

});

let student = {
    name:"Nour",
    age: 20,

    info:function(){
        return this.name + " is " + this.age + " years old";

    }

};

console.log(student.info());
console.log(Object.keys(student));
console.log(Object.values(student));
console.log(Object.entries(student));


var x = 10;
var x = 20;
console.log(x);

let y = 10;
y = 30;
console.log(y);

const z= 50;
console.log(z);

{
    let a =5;
    console.log(a);
}

function test(){
     var b = 100;
     console.log(b);
}

test();

console.log(number);
var number =10;

function loadPosts(){
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET","https://jsonplaceholder.typicode.com/posts");
    xhr.send();
    xhr.onreadystatechange = function(){

        if(xhr.readyState == 4){
            if(xhr.status == 200){

                let posts = JSON.parse(xhr.responseText);
                result.innerHTML = "";
                
                for(let i = 0; i < 5; i++){
                    
                    result.innerHTML +=
                    "<h3>" +posts[i].title+"</h3>";
                    result.innerHTML +=
                    "<p>" +posts[i].body +"</p><hr>";
                }
            }
        
            else if(xhr.status == 404){

                result.innerHTML = "404 Not Found";
            }

            else if(xhr.status == 500){

                result.innerHTML = "500 Server Error";
            }
        }
    };
}






