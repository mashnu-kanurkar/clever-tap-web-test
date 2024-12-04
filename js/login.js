var loginBtn = document.getElementById("login-btn");
loginBtn.addEventListener("click", login);

var pushProfileBtn = document.getElementById("push-profile-btn");
pushProfileBtn.addEventListener("click", pushProfile);

var raiseEventBtn = document.getElementById("raise-event-btn");
raiseEventBtn.addEventListener("click", raiseEvent);

var requestInboxBtn = document.getElementById("request-inbox-button");
requestInboxBtn.addEventListener("click", requestInboxEvent);

var askForPushBtn = document.getElementById("ask-for-push-btn");
askForPushBtn.addEventListener("click", askForPush);

var optInButton = document.getElementById("opt-in-button");
askForPushBtn.addEventListener("click", setOptIn);
var optOutButton = document.getElementById("opt-out-button");
askForPushBtn.addEventListener("click", setOptOut);

 // JavaScript to toggle side drawer
 var bellButton = document.getElementById('bell-button')
 bellButton.addEventListener('click', function() {
  document.getElementById('side-drawer').classList.toggle('open');
  console.log("Open inbox")
  getAndSetInboxMessages()
});

// Close drawer when the close icon is clicked
var closeInboxButton = document.getElementById('close-drawer')
closeInboxButton.addEventListener('click', function() {
  document.getElementById('side-drawer').classList.remove('open');
});

function getAndSetInboxMessages(){
  console.log("fetching inbox messages")
  var messageData = clevertap.getAllInboxMessages()
  console.log("inbox: "+ JSON.stringify(messageData))
const msgKeyList = Object.keys(messageData)
  
  const messagesContainer = document.getElementById('messages-container');
  messagesContainer.innerHTML = ''; // Clear previous messages
  msgKeyList.forEach(messageKey => {
    var messageMeta = messageData[messageKey]
    console.log("messageMeta: "+JSON.stringify(messageMeta))
    var message = messageMeta.msg[0]
    console.log("message: "+JSON.stringify(message))

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    // Message Header with icon and title
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('message-header');

    const icon = document.createElement('img');
    icon.classList.add('message-icon');
    icon.src = message.iconUrl; // Set icon URL
    // Set the maximum width and height
    icon.style.maxWidth = '250px';  // Change to desired width
    icon.style.maxHeight = '250px'; // Change to desired height
    headerDiv.appendChild(icon);

    const title = document.createElement('span');
    title.classList.add('message-title');
    title.textContent = message.title; // Set title
    headerDiv.appendChild(title);
    messageDiv.appendChild(headerDiv);

    // Message Description
    const description = document.createElement('p');
    description.classList.add('message-content');
    description.textContent = message.description;
    messageDiv.appendChild(description);

     // Message Image (if exists)
     if (message.imageUrl) {
      const image = document.createElement('img');
      image.classList.add('message-image');
      console.log("image source: "+message.imageUrl)
      image.src = message.imageUrl;
      messageDiv.appendChild(image);
    }

    // Message Metadata (ID and Date)
    const meta = document.createElement('div');
    meta.classList.add('message-meta');
    meta.textContent = `ID: ${messageMeta.id} | Date: ${new Date(messageMeta.date).toLocaleString()}`;
    messageDiv.appendChild(meta);
    messageDiv.addEventListener('click', (event) => {
      handleInboxMessageClick(messageMeta.id, messageMeta.wzrk_id, messageMeta.wzrk_pivot);
    });
    // Append message to container
    messagesContainer.appendChild(messageDiv);
  });
}

function handleInboxMessageClick(messageId, wzrkId, wzrkPivot){
 console.log("notification viewed will be raised first: "+messageId + ", wzrk_id: "+wzrkId +", wzrk_pivot: "+wzrkPivot)
 clevertap.markReadInboxMessage(messageId) 
  console.log("handling click for Id: "+messageId + ", wzrk_id: "+wzrkId +", wzrk_pivot: "+wzrkPivot)
  var d = {
    "msgId":messageId,
    "wzrk_id":wzrkId,
    "wzrk_pivot":wzrkPivot
  }
  clevertap.renderNotificationClicked(d)

}

function setOptIn(){
  clevertap.privacy.push({optOut: false});
}

function setOptOut(){
  clevertap.privacy.push({optOut: true});
}
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
  clevertap.onUserLogin.push({
 "Site": {
   "Name": formData["name"], 
   "Email": formData["email"],
   "Phone": formData["phoneNumber"],
   "Brand Name":"Red water"
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

function raiseEvent() {
  // event with properties
  clevertap.event.push("Added to cart", {"name":"testmashnu", "phone_number":9011456813})
  console.log("event fired: Added to cart { name: testmashnu, phone_number:9011456813}")
}
function requestInboxEvent() {
  // event with properties
  clevertap.event.push("request_inbox", {"name":"test_mashnu", "phone_number":9011456813})
  console.log("event fired: request_inbox { name: testmashnu, phone_number:9011456813}")
}

function askForPush(argument) {
  clevertap.notifications.push({
                titleText: "Would you like to receive Push Notifications?",
                bodyText: "We promise to only send you relevant content and give you updates on your transactions",
                okButtonText: "Sign me up!",
                rejectButtonText: "No thanks",
                okButtonColor: "#f23046",
                skipDialog: false,
                askAgainTimeInSeconds:5,
                serviceWorkerPath: "/clever-tap-web-test/serviceworker.js",
              });
}
