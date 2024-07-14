let row = document.querySelector('#row')
let searchRow = document.querySelector('#searchRow')
let SearchBtn = document.querySelector('#SearchBtn')
let categoryBtn = document.querySelector('#categoryBtn')
let areaBtn = document.querySelector('#areaBtn')
let ingredientsBtn = document.querySelector('#ingredientsBtn')
let contactBtn = document.querySelector('#contactBtn')
let homeBtn = document.querySelector('#homeBtn')
let formRow = document.getElementById("#formRow")

SearchBtn.addEventListener('click', function(){
    searchInputs()
    closeSideNav()
})
categoryBtn.addEventListener('click', function(){
    getCategories()
    closeSideNav()
})
areaBtn.addEventListener('click', function(){
    getArea()
    closeSideNav()
})
ingredientsBtn.addEventListener('click', function(){
    getIngred()
    closeSideNav()
})
contactBtn.addEventListener('click', function(){
    displayContact()
    closeSideNav()
})

$(window).ready(function() {
    searchByName("").then(function() {
        $('#loading').fadeOut(700,function(){
        $('body').css({overflow:'visible'},2000)})
    })
})


function openSideNav() {
    $(".sideNavbar").animate({
        left: 0
    }, 700)


    $(".main-icon").removeClass("fa-align-justify");
    $(".main-icon").addClass("fa-x");
    $(".nav-links ul li").addClass("animate__slideInUp");
    $(".nav-links ul li").removeClass("animate__slideOutDown");
    
}

function closeSideNav() {
    let width = $(".sideNavbar .nav-content").outerWidth()
    $(".sideNavbar").animate({
        left: -width
    }, 700)

    $(".main-icon").addClass("fa-align-justify");
    $(".main-icon").removeClass("fa-x");
    $(".nav-links ul li").removeClass("animate__slideInUp");
    $(".nav-links ul li").addClass("animate__slideOutDown");
}

closeSideNav()
$(".sideNavbar i.main-icon").click(function() {
    if ($(".sideNavbar").css('left') == '0px') {
        closeSideNav()
    } else {
        openSideNav()
    }
})


function displayAllfood(data) {
    let box = "";
    
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3 col-sm-6 pointer">
        <div onclick="getMealInformation('${data[i].idMeal}')" class="img">
        <img class="w-100  rounded-3" src="${data[i].strMealThumb}" alt="">
        <div class="img-layer rounded-3 d-flex flex-column justify-content-center align-items-center text-center">
        <h3>${data[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `
    }

    row.innerHTML = box
}

async function getCategories() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data = await response.json()
    displayCategories(data.categories)
    console.log(data.categories);
}

function displayCategories(data) {
    let box = "";

    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-lg-3 col-md-6 pointer">
                <div onclick="getCategoryFood('${data[i].strCategory}')" class="img">
                    <img class="w-100 rounded-3 pointer" src="${data[i].strCategoryThumb}" alt="">
                    <div class="img-layer rounded-3 d-flex flex-column justify-content-center align-items-center text-center">
                        <h3 class"mb-2">${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    row.innerHTML = box
}

async function getArea() {
    searchRow.innerHTML = "";
    let responese = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    data = await responese.json()
    console.log(data.meals);
    displayArea(data.meals)
}


function displayArea(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3 col-sm-6">
                <div  onclick="getAreaFood('${data[i].strArea}')"  class="rounded-3 text-center pointer text-white">
                        <i class="fa-solid fa-utensils fa-3x text-warning"></i>
                        <h2>${data[i].strArea}</h2>
                </div>
        </div>
        `
    }
    row.innerHTML = box
}


async function getIngred() {
    searchRow.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    data = await response.json()
    console.log(data.meals);
    displayIngred(data.meals.slice(0, 15))
}


function displayIngred(data) {
    let box = "";
    for (let i = 0; i < data.length; i++) {
        box += `
        <div class="col-md-3 col-sm-6">
                <div // onclick="getIngredientsFood('${data[i].strIngredient}')" class="rounded-2 text-center text-white pointer">
                        <i class="fa-solid fa-burger fa-3x text-warning"></i>
                        <h2>${data[i].strIngredient}</h2>
                        <p>${data[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
                </div>
        </div>
        `
    }
    row.innerHTML = box
}


function searchInputs() {
    searchRow.innerHTML = `
    <div class="row py-5 g-3">
        <div class="col-md-6 ">
            <input type="text"  placeholder="Search By Name" onkeyup="searchByName(this.value)" class="form-control">
        </div>
        <div class="col-md-6">
            <input  type="text" placeholder="Search By First Letter" onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control">
        </div>
    </div>`
    row.innerHTML = ""
}

async function searchByName(search) {
    row.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    data = await response.json()
    if ( data.meals ) {
        displayAllfood(data.meals) 
    }else{
        displayAllfood([])
    }
}

async function searchByFLetter(search) {
    row.innerHTML = ""
    search == "" ? search = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
    data = await response.json()
    if ( data.meals ) {
        displayAllfood(data.meals) 
    }else{
        displayAllfood([])
    }
}

async function getCategoryFood(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await response.json()
    console.log(data.meals);
    displayAllfood(data.meals.slice(0, 10))
}

async function getAreaFood(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data = await response.json()
    console.log(data.meals);
    displayAllfood(data.meals.slice(0, 10))
}
async function getIngredientsFood(ingredients) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    data = await response.json()
    console.log(data.meals);
    displayAllfood(data.meals.slice(0, 10))
}

async function getMealInformation(mealId) {
    closeSideNav()
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    data = await respone.json();
    console.log(data.meals);
    displayMealInformation(data.meals[0])
}

function displayMealInformation(meal) {
    let ingredients = ``
    for (let i = 1; i <= 10; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-warning m-1 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let box = `
    <div class="col-md-5 text-center">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h3 class= "text-warning fs-3">${meal.strMeal}</h3>
            </div>
            <div class="col-md-7">
                <h1 class = "text-warning">Instructions</h1>
                <p class = 'text-white'>${meal.strInstructions}</p>
                <h3 class= "text-warning"><span class="text-white">Area : </span>${meal.strArea}</h3>
                <h3 class= "text-warning"><span class="text-white">Category : </span>${meal.strCategory}</h3>
                <h3 class = "text-white">Recipes :</h3>
                <ul class="list-unstyled d-flex g-4 flex-column">
                    ${ingredients}
                </ul>
                <h3 class = "text-white">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-column">
                    ${tagsStr}
                </ul>
                <a href="${meal.strSource}" target="_blank" class="btn btn-warning">Source</a>
                <a href="${meal.strYoutube}" target="_blank"  class="btn btn-danger">Youtube</a>
            </div>`
    row.innerHTML = box
}







function displayContact(){
    let box = ''

    box+=`
        <div class="row">
            <div class="form-holder">
                <div class="form-content">
                    <div class="form-items">
                        <h3 class = "text-warning">Do not hesitate to contact us</h3>
                        <p>Fill in the data below.</p>
                            <div class="col-md-12">
                            <input id="nameInput" onkeyup="nameValidation()" class="form-control" type="text" name="name" placeholder="Full Name" required>
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Please Enter valid Name
                    </div>
                            </div>

                            <div class="col-md-12 ">
                                <input id="emailInput" onkeyup="checkValidation()" class="form-control" type="email" name="email" placeholder="E-mail Address" required>
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Please Enter valid Email
                    </div>
                            </div>

                        <div class="col-md-12">
                                <input id="phoneInput" onkeyup="checkValidation()" class="form-control" type="phone" name="phone" placeholder="Phone Number" required>
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Please Enter valid Number
                    </div>
                        </div>


                        <div class="col-md-12">
                            <input id="ageInput" onkeyup="checkValidation()"  class="form-control" type="number" name="age" placeholder="Age" required>
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Please Enter valid Age
                    </div>
                        </div>
                        <div class="col-md-12">
                            <input id="passwordInput" onkeyup="checkValidation()"   class="form-control" type="password" name="password" placeholder="Password" required>
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Please Enter valid Password  *Minimum eight characters,<br> at least one letter and one number:* like:abcd1234
                    </div>
                        </div>
                        <div class="col-md-12">
                            <input id="repasswordInput" onkeyup="repasswordValidation(), checkValidation()"   class="form-control" type="password" name="password" placeholder="Repassword" required>
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                            Please Enter The Same Password
                        </div>
                        </div>

                        <div class="col-md-12 mt-3">
                            <label class="mb-3 mr-1 text-white " for="gender">Gender: </label>

                            <input type="radio" id = "male" class="btn-check" name="gender" id="male" required>
                            <label class="btn btn-sm btn-outline-warning" for="male">Male</label>

                            <input type="radio" class="btn-check" name="gender" id="female" required>
                            <label class="btn btn-sm btn-outline-warning" for="female">Female</label>
                        </div>

                                <button id="submit" onclick="done()"  disabled type="submit" class="btn btn-warning">Submet</button>
                                <div id="submitAlert" focus class="alert alert-warning w-100 mt-2 d-none">
                            Success
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    row.innerHTML=box;
let submit = document.getElementById("#submit")

let repasswordAlert = document.getElementById("#repasswordAlert")
}

function validation(regex, element, alert) {
    let pattern = regex;
    if (pattern.test(element.value)) {
        alert.classList.replace("d-block", "d-none");
        return true;
    } else {
        alert.classList.replace("d-none", "d-block");
        return false;
    }
    }
    
    
    function checkValidation(){
    if (
        validation(/^[A-Za-z][A-Za-z\s'-]{2,}$/, nameInput, nameAlert) == true &&
        validation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, emailInput, emailAlert)== true &&
        validation(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, phoneInput, phoneAlert)== true &&
        validation(/^(?:1[01][0-9]|120|[1-9]?[0-9])$/, ageInput, ageAlert)== true &&
        validation(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,  passwordInput , passwordAlert)==true &&
        document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
    ) {
        submit.removeAttribute("disabled")
    }else{
        submit.setAttribute("disabled", true)
    }
    }
    function repasswordValidation(){
        if (document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value) {
            repasswordAlert.classList.replace('d-block', 'd-none')
        }else{
            repasswordAlert.classList.replace('d-none', 'd-block')
        }
    }
    function nameValidation(){
        if (validation(/^[A-Za-z][A-Za-z\s'-]{2,}$/, nameInput, nameAlert) == true) {
            nameAlert.classList.replace('d-block', 'd-none')
        }else{
            nameAlert.classList.replace('d-none', 'd-block')
        }
    }
    
    function done(){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
        
    }


