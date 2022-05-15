// REGISTER //
function confirmRegister(){
    let check = checkRegister();
    if(check[0]){
        alert("You have succesfuly registered");
        location.href = "./home.html";
    }else{
        alert(check[1]);
    }  
}

function checkRegister(){
    let valid = true;
    let returnMessage = "";

    let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let email = document.getElementById("email").value;
    let uName = document.getElementById("uName").value;
    let pass = document.getElementById("pass").value;
    let date = document.getElementById("date").value;
    let adress = document.getElementById("adress").value;
    let telNum = document.getElementById("telNum").value;

    let regExPlainText = new RegExp(/[a-z]+/gi);
    let regExEmail = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/gi);
    let regExPass = new RegExp(/\w+/g);
    let regExAdress = new RegExp(/[\w\sČčĆćŠšĐđŽž]+[\d\/]+\,[\s]{1}[\w\d\sČčĆćŠšĐđŽž]+/gi);
    let regExTelNum = new RegExp(/(06){1}\d{7,8}/g);

    let textTest1 = regExPlainText.test(fName);
    let textTest2 = regExPlainText.test(lName);
    let emailTest = regExEmail.test(email);
    let textTest3 = (/[a-z]+/gi).test(uName);
    let passTest = regExPass.test(pass);
    let adressTest = regExAdress.test(adress);
    let telNumTest = regExTelNum.test(telNum);

    let splitDate = date.split("-");
    if(splitDate[0] < 1900 | splitDate[0]> 2012){
        valid = false;
        returnMessage = "Date is not valid";
    }

    if(!textTest1){
        if(fName.length == 0){
            valid = false;
            returnMessage = "First name can't be empty";
        }else{
            valid = false;
            returnMessage = "First name is not valid";
        }
    }
    else if(!textTest2){
        if(lName.length == 0){
            valid = false;
            returnMessage = "Last name can't be empty";
        }else{
            valid = false;
            returnMessage = "Last name is not valid";
        }
    }
    else if(!emailTest){
        if(email.length == 0){
            valid = false;
            returnMessage = "Email can't be empty";
        }else{
            valid = false;
            returnMessage = "Email is not valid";
        }
    }
    else if(!textTest3){
        if(uName.length == 0){
            valid = false;
            returnMessage = "Username can't be empty";
        }else{
            valid = false;
            returnMessage = "Username is not valid";
        }
    }
    else if(!passTest){
        if(pass.length == 0){
            valid = false;
            returnMessage = "Password can't be empty";
        }else{
            valid = false;
            returnMessage = "Password is not valid";
        }
    }
    else if(!adressTest){
        if(adress.length == 0){
            valid = false;
            returnMessage = "Adress can't be empty";
        }else{
            valid = false;
            returnMessage = "Adress is not valid";
        }
    }
    else if(!telNumTest){
        if(telNum.length == 0){
            valid = false;
            returnMessage = "Telephone number can't be empty";
        }else{
            valid = false;
            returnMessage = "Telephone number is not valid";
        }
    }

    return [valid, returnMessage];
}

// LOGIN //
function confirmLogin(){
    let usersList = [];

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let users = JSON.parse(request.responseText);

                //Pronalaženje korisnika
                for(var i in users){
                    var user = users[i];
                    usersList.push(user);
                }
            }else{
                alert('Error occurred. User could not be loaded.');
            }
        }
    }

    request.open('GET', firebaseUrl + '/users' + '.json');
    request.send();
    
    setTimeout(display, 500);

    function display(){
        let check = checkLogin(usersList);
        if(check[0]){
            alert("You have succesfuly logged on");
            location.href = "./home.html";
        }else{
            alert(check[1]);
        } 
    } 
}

function checkLogin(usersList){
    let valid = true;
    let returnMessage = "";

    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    if(username.length == 0){
        valid = false;
        returnMessage = "Username is empty";
    }
    if(password.length == 0){
        valid = false;
        returnMessage = "Password is empty";
    }

    let i = 0;
    while(i < usersList.length){
        if(username == usersList[i].userName && password == usersList[i].pass){
            valid = true;
            break;
        }else{
            valid = false;
            if(returnMessage == ""){
                returnMessage = "User doesn't exist";
            }
        }
        i++;
    }
    return [valid, returnMessage];
}