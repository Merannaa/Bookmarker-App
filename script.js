//Global variable
var bookName = document.getElementById('bookmarkName');
var bookUrl = document.getElementById('bookmarkURL');
//update and submit buttom
var mood = 'Submit'
var test ;

//array to save data
var bookList=[];
if(localStorage.getItem('site') !== null){
            bookList =JSON.parse(localStorage.getItem('site')); 
            display();
        }
//function to add url
function addLink(){
    if(validationName()== true ){
    var link ={
        siteName:bookName.value,
        siteUrl:bookUrl.value
    }
    if(mood === 'Submit'){
        bookList.push(link)  
    }else{
        bookList[test]= link;
        mood = 'Submit';
        submitBtn.innerHTML = 'Submit';
    }
    localStorage.setItem('site',JSON.stringify(bookList))
    display()
    clearInput()
    console.log(link);
    console.log(bookList);
    }else{
        //show error msg
        var errorMessageContainer = document.querySelector(".error-message-container");
        errorMessageContainer.classList.remove("d-none");
        var p = document.querySelector(".errorM");
        p.innerHTML ="Site Name or Url is not valid, Please follow the rules below :";
        var errorRules = document.getElementById("errorRules");
        errorRules.classList.remove("d-none");

    }
}

//function to display data
function display(){
    var trs='';
    for(var i = 0; i < bookList.length; i ++){
        trs +=`
        <tr>
        <td>${i+1}</td>
        <td>${bookList[i].siteName}</td>
        <td><a href="${bookList[i].siteUrl}" target="_blank" ><button class="btn btn-outline-info"><i class="fa-solid fa-eye "></i></button></a></td>
        <td><button onclick="updateLink(${i})" class="btn btn-outline-warning"><i class="fa fa-edit "></i></button></td>
        <td><button onclick="deletLink(${i})" class="btn btn-outline-danger" id="alertDelete"><i class="fa fa-trash "></i></button></td>
        </tr>
        `
    }
    document.getElementById('tableBody').innerHTML=trs;
}

//function to delete
function deletLink(index){
    bookList.splice(index,1)
    localStorage.setItem('site',JSON.stringify(bookList));
    console.log(index);
    console.log(bookList);
    display()
}

//function to clear input
function clearInput(){
    bookName.value='';
    bookUrl.value='';
}

//function to update
function updateLink(i){
    bookName.value = bookList[i].siteName;
    bookUrl.value = bookList[i].siteUrl;
    submitBtn.innerHTML='Update';
    mood ='Update';
    test = i;
    // console.log(i); 
} 

//function validate name and site
function validationName() {
    var regex = /^\w{3,}$/g;
    return regex.test(bookName.value) && bookName.value != null;
}

function validationUrl() {
    var regex =/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return regex.test(bookUrl.value) && bookUrl.value != null;
}

//to close error msg
function hideErrorMessage() {
    var errorMessageContainer = document.querySelector(".error-message-container");
    errorMessageContainer.style.display = "none";
}

  // Add event listener to the close button
var closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", hideErrorMessage);