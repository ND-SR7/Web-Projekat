let firebaseUrl = 'https://prog-course-default-rtdb.europe-west1.firebasedatabase.app'
let request = new XMLHttpRequest();

// EDIT USER //
function editUser(){
    const urlUser = new URLSearchParams(window.location.search);
    const username = urlUser.get('user');

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let users = JSON.parse(request.responseText);

                //Pronalaženje korisnika
                for(var i in users){
                    var user = users[i];
                    
                    if(user.userName == username){
                        changeUser(user);
                    } 
                }
            }else{
                alert('Error occurred. User could not be loaded.');
            }
        }
    }

    request.open('GET', firebaseUrl + '/users' + '.json');
    request.send();

    function changeUser(user){
        let inFName = document.getElementById("inFName");
        let inLName = document.getElementById("inLName");
        let inEmail = document.getElementById("inEmail");
        let inUName = document.getElementById("inUName");
        let inPass = document.getElementById("inPass");
        let inDOB = document.getElementById("inDOB");
        let inAdress = document.getElementById("inAdress");
        let inNum = document.getElementById("inNum");

        inFName.value = user.firstName;
        inLName.value = user.lastName;
        inEmail.value = user.email;
        inUName.value = user.userName;
        inPass.value = user.pass;
        inDOB.value = user.dob;
        inAdress.value = user.adress;
        inNum.value = user.telNum;
    }
}

function confirmUser(){
    let answer = confirm("Are you sure you want to change information about this user?\nClick OK if you wish to proceed");

    if(answer){
        let check = checkUser();
        if(check[0]){
            alert("You succesfuly edited this user");
            history.back();
        }else{
            alert(check[1]);
        }
    }
}

function checkUser(){
    let valid = true;
    let returnMessage = "";

    let fName = document.getElementById("inFName").value;
    let lName = document.getElementById("inLName").value;
    let email = document.getElementById("inEmail").value;
    let uName = document.getElementById("inUName").value;
    let pass = document.getElementById("inPass").value;
    let date = document.getElementById("inDOB").value;
    let adress = document.getElementById("inAdress").value;
    let telNum = document.getElementById("inNum").value;

    let regExPlainText = new RegExp(/[a-zČčĆćŠšĐđŽž]+/gi);
    let regExEmail = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/gi);
    let regExPass = new RegExp(/\w+/g);
    let regExAdress = new RegExp(/[\w\sČčĆćŠšĐđŽž]+[\d\/]+\,[\s]{1}[\w\d\sČčĆćŠšĐđŽž]+/gi);
    let regExTelNum = new RegExp(/(06){1}\d{7,8}/g);

    let textTest1 = regExPlainText.test(fName);
    let textTest2 = regExPlainText.test(lName);
    let emailTest = regExEmail.test(email);
    let textTest3 = (/[a-z]+/gi).test(uName);
    console.log(textTest3);
    console.log(uName);
    console.log(typeof uName);
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

function deleteUser(){
    let answer = confirm("Are you sure you want to deactivate this user? This action can't be undone\n\nClick on OK to deactivate this user");

    if(answer){
        alert("You have deactivated this user");
        location.href = "./admin.html";
    }
}