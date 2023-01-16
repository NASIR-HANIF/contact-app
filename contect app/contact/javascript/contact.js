// start log out coding

let logOutBtn = document.getElementById("logout-btn");
let wellcomActiUser = document.getElementById("wellcom");

// sessionStorage me  login user ko call karo
let username = sessionStorage.getItem("username");

if (username == null) {
  document.body.innerHTML = "<h1>sign in first<h1/>";
  document.body.classList.add("illigal");
}

logOutBtn.onclick = function () {
  window.location = "../index.html";
  sessionStorage.removeItem("username");
};

// yeaha bhi sessionStorage wali ke jo keh localStorage wali hey
let userData = JSON.parse(localStorage.getItem(username));

wellcomActiUser.innerText = `WELL COME Ms / Mrs ${userData.fname}    ${userData.lname} `;
// -------------------------------------------------------------
// start add contact button function list codding


let creat_Btn = document.querySelector(".create-btn");
let update_Btn = document.querySelector(".update-btn");

let contact_Detail = document.querySelector(".contact-details");
let input_name = document.querySelector(".name");
let input_number = document.querySelector(".number");




// ------------------------------------------------
// foram data submit



creat_Btn.onclick = function (e) {
  e.preventDefault();
  if (input_name.value != "" && input_number.value != "") {
    newContactApp();
    upDateLocalStorage();
  } else {
    alert("plese enter name & number");
  }
};
// -----------------------------------------------
// local storage se data get ket key dubara  newContactApp me dall ke print karwana

if (localStorage.getItem(username + "_list") != null) {
  var array_list = JSON.parse(localStorage.getItem(username + "_list"));

  array_list.forEach((task) => {
    newContactApp(task);
  });
}

//  new data boday me append karwana or ye hi function localstorage
// se data le ke print karwaye ga

function newContactApp(task) {
  var i;
  var name = input_name.value;
  var number = input_number.value;

  console.log()

  if (task) {
    name = task.co_name;
    number = task.co_number;
  }

  var accordion = document.createElement("div");
  accordion.classList = "accordion mb-3";

  var all_accordion = contact_Detail.getElementsByClassName("accordion");

  
  for(i = 0; i < all_accordion.length;i++) {

  }
  var accordion_item = document.createElement("div");
  accordion_item.classList = "accordion-item";

  accordion.append(accordion_item);

  var accordion_header = document.createElement("h5");
  accordion_header.classList = "accordion-header";

  accordion_item.append(accordion_header);

  var button = document.createElement("button");
  button.classList = "accordion-button";
  button.innerText = name;
  button.setAttribute("data-bs-toggle", "collapse");
  button.setAttribute("data-bs-target", "#collapse-" + i);

  accordion_header.append(button);

  var accordion_collapse = document.createElement("div");
  accordion_collapse.classList = "accordion-collapse collapse";
  accordion_collapse.id = "collapse-" + i;

  accordion_item.append(accordion_collapse);

  var accordion_body = document.createElement("div");
  accordion_body.classList = "accordion-body";

  accordion_collapse.append(accordion_body);

  var row = document.createElement("div");
  row.classList = "row";

  accordion_body.append(row);

  var col_one = document.createElement("div");
  col_one.classList = "col-md-6";

  row.append(col_one);

  var h5 = document.createElement("h5");
  h5.innerText = name;

  h5.id = "contact-"+ i;

  col_one.append(h5);

  var p = document.createElement("p");
  p.innerText = number;

  col_one.append(p);

  var col_two = document.createElement("div");
  col_two.classList =
    "col-md-6 d-flex justify-content-around align-items-center position-relative";
  col_two.innerHTML =
    '<i class="fa-regular fa-message"></i><i class="fa-solid fa-phone"></i><i class="fa-solid fa-ellipsis-vertical  op-btn"></i>';

  row.append(col_two);

  var option_box = document.createElement("div");
  option_box.classList = "option-box";
  option_box.innerHTML =
    '<i class="fa-regular fa-pen-to-square"></i><i class="fa-regular fa-trash-can"></i>';

  col_two.append(option_box);

  contact_Detail.append(accordion);

  input_name.value = "";
  input_number.value = "";


   // ----------------------------------------------------
  // start update edite coding function

  var i_tag = option_box.getElementsByTagName("I");

  i_tag[0].onclick = function () {
    
  
    var parent = this.parentElement.parentElement.parentElement;
    
    let h5 = parent.getElementsByTagName("h5");

    let p = parent.getElementsByTagName("p");

    var edited_name = h5[0].innerHTML;
    var edited_con = p[0].innerHTML;

    input_name.value = edited_name;
    input_number.value = edited_con;

    input_name.focus();

    creat_Btn.classList.add("d-none");
    update_Btn.classList.remove("d-none");

    update_Btn.onclick = function () {

    var id =  h5[0].getAttribute("id").replace("contact-", "");

      var co_name = input_name.value;
      var co_number = input_number.value;

      upDateLocalStorage(co_name, co_number, id);
    };
  };

  // delete codding start
var i_tag = option_box.getElementsByTagName("I");

  i_tag[1].onclick = function () {
    var cnf = window.confirm("Do you wanna delete ?");
    if (cnf) {
      accordion.remove();
      upDateLocalStorage();
    } else {
      alert("your data is save");
    }
  };

   // start option box coding
   var op_btn = document.querySelectorAll(".op-btn");

   for ( let i = 0; i < op_btn.length; i++) {
     op_btn[i].onclick = function () {
       var parent = this.parentElement;
       var op_box = parent.querySelector(".option-box");
 
       op_box.classList.toggle("active");
     };
   }

}

 

// ---------------data push local storage-------------------

function upDateLocalStorage(name, number, id) {


if(name != "" && number != ""){

  array_list[id] = {
co_name : name,
co_number : number

  }
}
else{
  var i;
    array_list = [];
    var accordion_el = contact_Detail.querySelectorAll(".accordion");

    for (i = 0; i < accordion_el.length; i++) {
      var h5 = accordion_el[i].getElementsByTagName("h5");
      var p = accordion_el[i].getElementsByTagName("p");

      array_list.push({
        co_name: h5[1].innerHTML,
        co_number: p[0].innerHTML
      });
    }

}


  
  
  

  localStorage.setItem(username + "_list", JSON.stringify(array_list));
}
// -------------------------------------------
// search codding start

function mySearch(){
var j ,btn , textValu ;
  var input = document.getElementById("search").value;
  var filter = input.toUpperCase();
  var accordion =  contact_Detail.querySelectorAll(".accordion");

for(j = 0 ; j < accordion.length;j++){


  btn = accordion[j].getElementsByTagName("button")[0];

  textValu = btn.innerText;

  if(textValu.toUpperCase().indexOf(filter) > -1){

    accordion[j].style.display = "";
  }else{
    accordion[j].style.display = "none";
  }
  
  
}

}