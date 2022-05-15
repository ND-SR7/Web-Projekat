let firebaseUrl = 'https://prog-course-default-rtdb.europe-west1.firebasedatabase.app'
let request = new XMLHttpRequest();

// EDIT COURSE //
function editCourse(){
    const urlId = new URLSearchParams(window.location.search);
    const id = urlId.get('id');

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let course = JSON.parse(request.responseText);
                console.log(course);
                changeCourse(course);
            }else{
                alert('Error occurred. Course could not be loaded.');
            }
        }
    }

    request.open('GET', firebaseUrl + '/courses/' + id + '.json');
    request.send();

    function changeCourse(course){
        let inId = document.getElementById("inId");
        let inName = document.getElementById("inName");
        let inAuthor = document.getElementById("inAuthor");
        let inDesc = document.getElementById("inDesc");
        let inCat = document.getElementById("inCat");
        let inLang = document.getElementById("inLang");
        let inDate = document.getElementById("inDate");
        let inRating = document.getElementById("inRating");
        let inNumUsers = document.getElementById("inNumUsers");
        let inNumLect = document.getElementById("inNumLect");
        let inCertYes = document.getElementById("inCertYes");
        let inCertNo = document.getElementById("inCertNo");
        let inPrice = document.getElementById("inPrice");

        inId.value = course.id;
        inName.value = course.name;
        inAuthor.value = course.author;
        inDesc.value = course.desc;

        switch(course.category){
            case "Web Development":
                inCat.value = "web";
                break;
            case "Object Oriented Programming":
                inCat.value = "object";
                break;
            case "Algorithms":
                inCat.value = "algo";
                break;
            case "Data Structures":
                inCat.value = "data";
                break;
        }

        inLang.value = course.lang;
        inDate.value = course.dateOfChange;
        inRating.value = course.avgRating;
        inNumUsers.value = course.numUsers;
        inNumLect.value = course.numLections;
        
        if(course.certified == "Yes"){
            inCertYes.checked = true;
            inCertNo.checked = false;
        }else{
            inCertYes.checked = false;
            inCertNo.checked = true;
        }

        inPrice.value = course.price;
    }
}

function confirmCourse(){
    let answer = confirm("Are you sure you want to change information about this course?\nClick OK if you wish to proceed");

    if(answer){
        let check = checkCourse();
        if(check[0]){
            alert("You succesfuly edited this course");
            history.back();
        }else{
            alert(check[1]);
        }
    }
}

function checkCourse(){
    let valid = true;
    let returnMessage = "";

    let name = document.getElementById("inName").value;
    let author = document.getElementById("inAuthor").value;
    let desc = document.getElementById("inDesc").value;
    let lect = document.getElementById("inNumLect").value;
    let price = document.getElementById("inPrice").value;

    let regExPureText = new RegExp(/[a-z]+/gi);
    let regExText = new RegExp(/[a-z]+[\w\s\W]*/gi);
    let regExNum = new RegExp(/[0-9]+/g)

    let textTest1 = regExText.test(name);
    let textTest2 = regExPureText.test(author);
    let textTest3 = regExText.test(desc);

    let numTest1 = regExNum.test(lect);
    let numTest2 = regExNum.test(price);

    for(i = 0; i <= lect.length-1; i++){
        let check = lect.charCodeAt(i);

        if(check < 48 | check > 57){
            numTest1 = false;
        }
    }

    for(i = 0; i <= price.length-1; i++){
        let check = price.charCodeAt(i);

        if(check < 48 | check > 57){
            numTest2 = false;
        }
    }

    if(!textTest1){
        if(name.length == 0){
            returnMessage = "Course name can't be empty";
            valid = false;
        }else{
            returnMessage = "Format for course name is not correct";
            valid = false;
        }
    }
    else if(!textTest2){
        if(author.length == 0){
            returnMessage = "Author name can't be empty";
            valid = false;
        }else{
            returnMessage = "Format for author name is not correct";
            valid = false;
        }
    }
    else if(!textTest3){
        if(desc.length == 0){
            returnMessage = "Description can't be empty";
            valid = false;
        }else{
            returnMessage = "Format for description is not correct";
            valid = false;
        }
    }
    else if(!numTest1 | lect <= 0){
        if(lect <= 0){
            returnMessage = "Number of lections can't be zero or negative";
            valid = false;
        }else{
            returnMessage = "Number of lections only takes numbers";
            valid = false;
        }
    }
    else if(!numTest2 | price <= 0){
        if(price <= 0){
            returnMessage = "Price can't be zero or negative";
            valid = false;
        }else{
            returnMessage = "Price only takes numbers";
            valid = false;
        }
    }

    return [valid, returnMessage];
}

function deleteCourse(){
    let answer = confirm("Are you sure you want to delete this course?\nThis action can't be undone");

    if(answer){
        alert("You have deleted this course");
        location.href = "./home.html";
    }
}