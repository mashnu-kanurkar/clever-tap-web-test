var loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", login);

var pushProfileBtn = document.getElementById("push-profile-btn");
pushProfileBtn.addEventListener("click", pushProfile);

var raiseEventBtn = document.getElementById("raise-event-btn");
raiseEventBtn.addEventListener("click", raiseEvent);

var askForPushBtn = document.getElementById("ask-for-push-btn");
askForPushBtn.addEventListener("click", askForPush);


function validateForm() {
  console.log("validate form")
  var name = document.getElementById("name").value.trim();
  if (name == "") {
    alert("Please enter name")
    return
  }

  var email = document.getElementById("email").value.trim();
  if(email == ""){
    alert("Please enter email")
    return
  }
  if (!ValidEmail(email)) {
    alert("You have entered an invalid email address!");
    return
  }

  var phoneNumber = document.getElementById("phone-number").value.trim();
  if(phoneNumber == ""){
    alert("Please enter phone number")
    return
  }
  if(!validPhoneNumber(phoneNumber)){
    alert("Please enter phone number")
    return
  }

  var birthDate = document.getElementById("birth-date").value.trim();
  if(birthDate == ""){
    alert("Please enter birth date")
    return
  }

  var countrycode = document.getElementById("country").value;
  var formatedPhoneNumber = "+"+countrycode+""+phoneNumber;

  return {"name": name, "email": email, "phone_number": formatedPhoneNumber, "birthDate": birthDate}

}
function ValidEmail(emailString)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(emailString.match(mailformat))
{
console.log("Valid email address!");
return true;
}
else
{
console.log("invalid email address!");
return false;
}
}

function validPhoneNumber(phoneNumber){
  var phoneno = /^\d{10}$/;
  if((phoneNumber.match(phoneno))){
      return true;
        }
      else
        {
        return false;
        }
}

function login() {
  var formData = validateForm();
  console.log(formData)
  if (formData == null) {
    return
  }

  clevertap.onUserLogin.push({
 "Site": {
   "Name": formData["name"], 
   "Email": formData["email"],
   "Phone": formData["phoneNumber"],
   "DOB": new Date(formData["birthDate"])   
 }
});
}

function pushProfile() {
  var formData = validateForm();
  clevertap.profile.push({
 "Site": {
   "Name": formData["name"], 
   "Email": formData["email"],
   "Phone": formData["phoneNumber"],
   "DOB": new Date(formData["birthDate"])   
 }
});
  alert("Profile pushed successfully")
}

function raiseEvent(argument) {
  // event with properties
clevertap.event.push("Product viewed", {
  "Product name": "Casio Chronograph Watch",
  "Category": "Mens Accessories",
  "Price": 59.99,
  "Date": new Date()
});
  alert("event pushed for\n product: Casio Chronograph Watch \nCategory: Mens Accessories \nPrice: 59.99 \non date: "+new Date())
}

function askForPush(argument) {
  clevertap.notifications.push({
 "titleText":'Would you like to receive Push Notifications?',
  "bodyText":'We promise to only send you relevant content and give you updates on your transactions',
  "okButtonText":'Sign me up!',
  "rejectButtonText":'No thanks',
  "askAgainTimeInSeconds":5,
  "okButtonColor":'#f28046'});
}
