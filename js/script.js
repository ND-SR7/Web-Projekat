let firebaseUrl = 'https://prog-course-default-rtdb.europe-west1.firebasedatabase.app'
let request = new XMLHttpRequest();

// HOME TABELA //
function home(){
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let courses = JSON.parse(request.responseText);

                //Izdvajanje svakog kursa iteriranjem kroz atribute objekta
                for(var id in courses){
                    var course = courses[id];
                    appendCourseRow('tableJS', course); 
                }
            }else{
                alert('Error occurred. Courses could not be loaded.');
            }
        }
    }

    request.open('GET', firebaseUrl + '/courses' + '.json');
    request.send();

    //Dodaje red u tabelu
    function appendCourseRow(position, course) {
        let courseRow = document.createElement('tr');

        let nameTd = document.createElement('td');
        nameTd.innerHTML ='<a href="./course.html?id=' + course.id + '">' + course.name + '</a>';
        courseRow.appendChild(nameTd);

        let numLectionsTd = document.createElement('td');
        numLectionsTd.innerText = course.numLections;
        courseRow.appendChild(numLectionsTd);

        let priceTd = document.createElement('td');
        priceTd.innerText = course.price + ' RSD';
        courseRow.appendChild(priceTd);

        let certifiedTd = document.createElement('td');
        certifiedTd.innerText = course.certified;
        courseRow.appendChild(certifiedTd);

        document.getElementById(position).appendChild(courseRow);
    }
}

// SEARCH //
function search(){
    console.log("Searching...");
    let query = document.getElementById("search-input").value;
    console.log(query);
    let courseList = [];

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let courses = JSON.parse(request.responseText);

                for(var id in courses){
                    var course = courses[id];
                    courseList.push(course); 
                }
            }else{
                alert('Error occurred. Courses could not be loaded.');
            }
        }
    }

    request.open('GET', firebaseUrl + '/courses' + '.json');
    request.send();

    document.getElementById("main").style.display = 'none';
    document.getElementById("search-input").value = '';

    if(query != ""){
        setTimeout(lookFor, 500);
    }
    
    function lookFor(){
        document.getElementById("search-result").innerHTML = "";
        let searchQuery = new RegExp(query, "gi");
        
        for(let i = 0; i < courseList.length-1; i++){
            
            let exists = courseList[i].name.match(searchQuery);
            if(exists != null){
                console.log(courseList[i]);
                createResult(courseList[i], query);
                continue;
            }
            
            exists = courseList[i].author.match(searchQuery);
            if(exists != null){
                console.log(courseList[i]);
                createResult(courseList[i], query);
                continue;
            }

            exists = courseList[i].category.match(searchQuery);
            if(exists != null){
                console.log(courseList[i]);
                createResult(courseList[i], query);
                continue;
            }
        }

        function createResult(course, query){
            let parentDiv = document.createElement("div");
            parentDiv.classList.add("w3-card-4", "w3-round")
            parentDiv.setAttribute("onclick", "location.href = './course.html?id=" + course.id + "'");

            let h5 = document.createElement("h5");
            h5.innerText = course.name;
            parentDiv.appendChild(h5);

            let img = document.createElement("img");
            img.src = course.picture;
            parentDiv.appendChild(img);

            let spanA = document.createElement("span");
            spanA.innerHTML = "<b class='green'>By: </b>" + course.author + "<br>";
            parentDiv.appendChild(spanA);

            let spanC = document.createElement("span");
            spanC.innerHTML = "<b class='green'>Category: </b>" + course.category + "<br><br>";
            parentDiv.appendChild(spanC);

            let spanD = document.createElement("span");
            spanD.classList.add("result-desc");
            let desc = course.desc;
            let descShort = desc.substring(0, desc.indexOf("."));
            spanD.innerText = descShort + ".";
            parentDiv.appendChild(spanD);

            document.getElementById("search-result").appendChild(parentDiv);

            let context = document.querySelector("#search-result");
            let marker = new Mark(context);
            marker.mark(query);
        }
    }
}

// COURSE //
function course(){
    const urlId = new URLSearchParams(window.location.search);
    const id = urlId.get('id');
    
    console.log(id);

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let courses = JSON.parse(request.responseText);

                //Pronalaženje kursa
                for(var i in courses){
                    var course = courses[i];
                    
                    if(course == id){
                        loadCourse(courses);
                    } 
                }
            }else{
                alert('Error occurred. Course could not be loaded.');
            }
        }
    }

    request.open('GET', firebaseUrl + '/courses/' + id + '.json');
    request.send();

    function loadCourse(courses){
        document.getElementById("course-img").src = courses.picture;
        document.getElementById("course-name").innerText = courses.name;
        document.getElementById("course-id").innerHTML = '<b class="green">ID:</b> ' + courses.id;
        document.getElementById("course-author").innerHTML = '<b class="green">Author:</b> ' + courses.author;
        document.getElementById("course-date").innerHTML = '<b class="green">Last changed:</b> ' + courses.dateOfChange;
        
        document.getElementById("desc").innerText = courses.desc;

        document.getElementById("course-cat").innerHTML = '<b class="green">Category:</b> ' + courses.category;
        document.getElementById("course-lang").innerHTML = '<b class="green">Language:</b> ' + courses.lang;
        document.getElementById("course-rating").innerHTML = '<b class="green">Rating:</b> ' + courses.avgRating;
        document.getElementById("course-num-users").innerHTML = '<b class="green">Number of users who completed this course:</b> ' + courses.numUsers;

        document.getElementById("course-num-lectures").innerHTML = '<b class="green">Number of lectures:</b> ' + courses.numLections;
        document.getElementById("course-certified").innerHTML = '<b class="green">Certified:</b> ' + courses.certified;
        document.getElementById("course-price").innerHTML = '<b class="green">Price:</b> ' + courses.price + ' RSD';

        document.getElementById("edit-course-btn").setAttribute("onclick", "location.href = './course-edit.html?id=" + courses.id + "'");
    }
}

// ADMIN //
function admin(){
    request.open('GET', firebaseUrl + '/users' + '.json')
    request.send();

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let users = JSON.parse(request.responseText);

                //Izdvajanje svakog korisnika iteriranjem kroz atribute objekta
                for (var id in users) {
                    var user = users[id];
                    appendUserCard('users-list', user); 
                }
            }else{
                alert('Error occurred. Users could not be loaded.')
            }
        }
        function appendUserCard(position, user) {
            let userCard = document.createElement('div');
            userCard.classList.add('w3-card-2');
            userCard.innerHTML = '<a href="./user.html?user=' + user.userName +'"><i class="material-icons">person</i>' + '<br>' 
                                + '<div class="w3-container w3-center">' + '<b class="green">Full Name:</b> ' + user.firstName + ' ' + user.lastName + '<br>'
                                + '<b class="green">Username:</b> ' + user.userName + '<br>'
                                + '<b class="green">Email:</b> ' + user.email + '</div></a>';

            document.getElementById(position).appendChild(userCard);
        }
    }
}

// USER //
function user(){
    const urlId = new URLSearchParams(window.location.search);
    const username = urlId.get('user');
    
    console.log(username);

    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let users = JSON.parse(request.responseText);

                //Pronalaženje korisnika
                for(var i in users){
                    var user = users[i];
                    
                    if(user.userName == username){
                        loadUser(user);
                    } 
                }
            }else{
                alert('Error occurred. User could not be loaded.');
            }
        }
    }

    request.open('GET', firebaseUrl + '/users' + '.json');
    request.send();

    function loadUser(user){
        document.getElementById("user-fullName").innerText = user.firstName + " " + user.lastName;
        document.getElementById("user-email").innerText = user.email;
        document.getElementById("user-info").innerHTML = "<b>Username: </b>" + user.userName + "<br>" 
                                                        + "<b>Birthday: </b>" + user.dob + "<br>"
                                                        + "<b>Adress: </b>" + user.adress + "<br>"
                                                        + "<b>Tel. #: </b>" + user.telNum;
        document.getElementById("edit-user-btn").setAttribute("onclick", "location.href = './user-edit.html?user=" + user.userName + "'");
    }
}

// CART//
function cart(){
    request.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let courses = JSON.parse(request.responseText);

                //Izdvajanje kurseva
                for(let id in courses){
                    let course = courses[id];
                    
                    if(id <= 11111111113 && id != 11111111110)
                        loadItem(course); 
                }
            }else{
                alert('Error occurred. Cart could not be loaded.');
            }
        }
    }
    request.open('GET', firebaseUrl + '/courses' + '.json');
    request.send(); 

    function loadItem(course){
        let nameSpan = document.createElement("span");
        nameSpan.innerText = course.name;
        nameSpan.classList.add("cart-course-name");

        let btnX = document.createElement("button");
        btnX.innerHTML = "&times;";
        btnX.classList.add("w3-button", "cart-remove-btn");
        btnX.type = "button";

        let priceSpan = document.createElement("span");
        priceSpan.innerText = course.price + " RSD";
        priceSpan.classList.add("cart-course-price")

        priceSpan.appendChild(btnX);

        let li = document.createElement("li");
        li.classList.add("w3-hover-shadow");
        li.appendChild(nameSpan);
        li.appendChild(priceSpan);
        
        document.getElementById("cartJS").appendChild(li);
        
        let total = document.getElementById("cart-total").innerText;
        total = parseInt(total);
        total += course.price;

        document.getElementById("cart-total").innerText = total + " RSD";
    }
}

function checkout(){
    let check = confirm("Press OK to confirm your purchase");
    let empty = parseInt(document.getElementById("cart-purchase-btn").getAttribute("empty"));

    console.log(empty);
    if(check && empty){
        alert("Your purchase was succesful");
        document.getElementById("cartJS").style.display = "none";
        document.getElementById("cart-total").innerText = "0 RSD";
        document.getElementById("cart-purchase-btn").setAttribute("empty", "0");
    }else{
        alert("Your cart is empty");
    }
}