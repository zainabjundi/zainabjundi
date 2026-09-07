
"use strict";

var products = [
    {
        id: 1,
        name: "Espresso",
        price: 3,
        category: "Coffee",
        desc: "Strong black coffee"

    },

    {
        id: 2,
        name: "Latte",
        price: 5,
        category: " Coffee",
        desc: "Coffee with milk"
    },

    {
        id: 3,
        name: "Cappuccino",
        price: 4,
        category: "Coffee",
        desc: "Coffee with foam"

    },

    {
         id: 4,
        name: "Mocha",
        price: 6,
        category: "Coffee",
        desc: "Coffee with chocolate"

    },

    {
     id: 5,
        name: "Americano",
        price: 4,
        category: "Coffee",
        desc: "Espresso with hot water"
    }
];

let title = document.getElementById("main-title");
let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let productCategory = document.querySelector("#productCategory");
let result = document.getElementById("result");
let counter = document.getElementById("counter");

title.innerText = "Coffee Shop Management ";
title.textContent = "Coffee Shop Management ";
title.style.color = "#FFF8E7";
title.style.background = "#6F4E37";
title.style.padding = "15px";
title.style.textAlign = "center";
title.style.borderRadius = "10px";

function drawProducts(){

    result.innerHTML = "";

    products.forEach(function(product){

        result.innerHTML +=
        "<hr>" +
        "ID : " + product.id + "<br>" +
        "Coffee :" + product.name + "<br>" +
        "Price : $" + product.price + "<br>" +
        "Category : " + product.category + "<br>" +
        "Description : " + product.desc + "<br>";


    });

}
    drawProducts();

    function addProduct(){
         
        try{

            let name = productName.value.trim();
            let price = productPrice.value.trim();
            let category = productCategory.value.trim();

            if(name == "" || price == "" || category == ""){
                throw "Please fill all fields.";
            }
            
            let newProduct = {

                id: products.length + 1,
                name: name,
                price: Number(price),
                category: category,
                desc: "Fresh Coffee"
            };

            products.push(newProduct);
            
            drawProducts();

            productName.value = "" ;
            productPrice.value = "" ;
            productCategory.value = "";
        }

        catch(error){
            
            alert(error);
        } 
    }

    function deleteLastProduct(){
        
        products.pop();
        drawProducts();
    }

    function calculateTotal(){

        let total = 0;
        products.forEach(function(product){

            total +=Number(product.price);
        });

        result.innerHTML = "<h2> Total Coffee Bill = $" + total + "</h2>";
    }

    let coffeeNames = products.map(function(product){
        return product.name;
    });

    console.log(coffeeNames);

    function showExpensiveProducts(){

        let expensive = products.filter(function(product){
            return product.price > 5;
        });

        result.innerHTML = "<h2> Premium Coffee Drinks </h2>";

        expensive.forEach(function(product){
            result.innerHTML +=
            product.name + " - $" + product.price + "<br>";
        });
    }

    let foundCoffee = products.find(function(product){
        return product.id == 2;
    });

    console.log(foundCoffee);

    function checkProducts(){

        let expensiveCoffee = products.some(function(product){
            return product.price >6;
        });

        let validPrices = products.every(function(product){
            return product.price >0;
        });

        result.innerHTML = 
        "Any coffee above $6?" + expensiveCoffee + "<br>" +
        "All coffee prices are valid?" + validPrices;
    }

    function sortProductsByPrice(){
        products.sort(function(a,b){
            return a.price - b.price;
        });

        drawProducts();
    }

    let coffeeTypes = [
        "Latte",
        "Mocha",
        "Espresso",
        "Americano",
        "Cappuccino",
    ];

    coffeeTypes.sort();
    console.log(coffeeTypes);

    function evenOdd(num){
        
        if(num %2 == 0){
            console.log(num + "is Even");
        }

        else{
            console.log(num + "is Odd");
        }
    }

    let numbers = [4,5,6,7,8];
    
    numbers.forEach(function(num){

        evenOdd(num);

    });

    let sentence = " Coffee makes every morning better ";

    console.log(sentence.split(" "));
    console.log(sentence.slice(1,15));
    console.log(sentence.toLowerCase());
    console.log(sentence.toUpperCase());
    console.log(sentence.trim());
    console.log(sentence.indexOf("morning"));

    if(sentence.indexOf("morning") != -1){
        console.log("Word Found");
    }

    else{
        console.log("Word Not Found");
    }

    console.log(Math.round(4.7));
    console.log(Math.pow(2,3));
    console.log(Math.sqrt(81));
    console.log(Math.ceil(5.2));
    console.log(Math.floor(5.9));
    console.log(Math.random());

    let randomDiscount = Math.floor(Math.random() * 30) + 1;
     console.log("TODAY'S Discount = " + randomDiscount + "%");

     let coffeeShop = {

        name: " Coffee House",
        location: "Beirut",
        drinks: products.length,

        info: function(){
            return this.name + " - " + this.location;
        }
     };

      console.log(coffeeShop.info());
      console.log(Object.keys(coffeeShop));
      console.log(Object.values(coffeeShop));
      console.log(Object.entries(coffeeShop));
    
      let customer1 = {

        name: "Ali",
        favoriteCoffee: "Latte"
      };

      let customer2 = new Object();

      customer2.name = "Batoul";
      customer2.favoriteCoffee = "Mocha";

      function Customer(name,coffee){
        this.name = name;
        this.favoriteCoffee = coffee;
      }

      let customer3 = new Customer ("Rein","Espresso");

      console.log(customer1);
      console.log(customer2);
      console.log(customer3);

      let cart = {
        products: products,
        showProducts: function(){
            console.log(this.products);
        },

        calculateTotal: function(){
            let total = 0;
            this.products.forEach(function(product){
                total += product.price;
            });
            return total;
        },
        getCart: function(){
            return this;
        }
      };

      console.log(cart.showProducts());
      console.log(cart.calculateTotal());
      console.log(cart.getCart());

      var x = 10;
      var x = 20;
      console.log(x);

      let y = 10;
      y = 30;
      console.log(y);

      const z = 50;
      console.log(z);

      {
        let a = 5;
        console.log(a);
      }

      function test(){
        var b = 100;
        console.log(b);
      }

      test();
      console.log(number);

      var number = 15;

      title.setAttribute("title", " Coffee Shop Management System");

      let allProducts = document.querySelectorAll(".product");

      for(let i = 0; i< allProducts.length; i++){

        allProducts[i].style.backgroundColor = "#D2B48C";
        allProducts[i].style.color = "#3E2723";
        allProducts[i].style.padding = "10px";
        allProducts[i].style.margin = "5px";
        allProducts[i].style.borderRadius = "5px";
    }

    let myWindow;

    function openFacebook(){
        myWindow = window.open("https://www.facebook.com");
    }

    function closeFacebook(){
        if (myWindow){
            myWindow.close();
        }
    }

    function showScreenInfo(){
        result.innerHTML = 
        "Screen Width: " + screen.width + "<br>" +
        "Screen Height: " + screen.height;
    }

    function goToGoogle(){
        location.href = "https://www.google.com";
    }

    let myTimeout;
    
    function startTimeout(){
        myTimeout = setTimeout(function() {
            alert("Welcome to our Coffe Shop !");
        }, 
        3000);
    }

    function stopTimeout(){
        clearTimeout(myTimeout);
        alert("Timeout Cancelled");
    }
let count = 0;
let interval;

function startCounter(){

    interval = setInterval(function(){
        count ++;
        counter.innerHTML = count;

    }, 
        1000);

}

function stopCounter(){
    clearInterval(interval);
}

function loadPosts(){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.send();
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                let posts = JSON.parse(xhr.responseText);
                result.innerHTML ="";

                for(let i = 0; i < 5; i++){
                    result.innerHTML +=
                    "<h3>" +posts[i].title + "</h3>" +
                    "<p>" + posts[i].body +"</p><hr>";
                }
            }

            else if( xhr.status == 404){
                result.innerHTML = "404 Not Found";
            }

            else if(xhr.status == 500){
                result.innerHTML ="500 Serve Error";
            }
        }
    };

}

function checkPrice(price){
    try{
        if(price <= 0){
            throw "Invalid coffee price!";
        }

        console.log("Price is valid.");
    }

    catch(error){
        console.log(error);
    }
}




