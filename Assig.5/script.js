 
 let message = document.querySelector("#message");
 let nameInput = document.querySelector("#nameInput");
 let welcomeBtn = document.querySelector("#welcomeBtn");
 let checkBtn = document.querySelector("#checkBtn");
 let result = document.querySelector("#result");
 let counter = document.querySelector(".counter");

 let count = 0;

 //Welcome button
 welcomeBtn.onclick = function(){
    message.innerHTML = "Welcome, " + nameInput.value;
 };
 
 //Mouse move counter
 welcomeBtn.onmousemove = function(){
    count++;
    counter.innerHTML = count;
 };

 //Check age button 
 checkBtn.onclick = function(){
    
    let age = Number(prompt("Enter your age"));

    let answer = confirm("Are you sure you want to continue?");

    if(answer){

        switch(true){

            case(age >=18):
            result.innerHTML = "You are allowed";
            break;


            case(age >=13 && age <=17):
            result.innerHTML = "You need permission";
            break;

            default:
                result.innerHTML = "You are too young";

        }
    }
    else{
        result.innerHTML = "Operation Cancelled";
    }
 };