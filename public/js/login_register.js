$(document).ready(function(){
    $('#error_message_username').hide();
    $('#error_message_email').hide();
});
var password = document.getElementById("passwordsignup")
  , confirm_password = document.getElementById("passwordsignup_confirm");

//Check provided password and confirm password matches
function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

$('#usernamesignup').on('keyup', function(){
    $('#error_message_username').hide();
});
$('#emailsignup').on('keyup', function(){
    $('#error_message_email').hide();
});

//Login validation
$("#login_btn").click(function (e) {
    let form_val = $("#form_login").serialize();
    console.log(form_val);
    let username = $("#username").val();
    console.log(username);
    $.ajax({
        type: 'POST',
        url: '/user/login',
        data: form_val,
        success: function (data) {
            console.log(data);
            if(data == 'Access_denied'){

            }else{
                if(data.includes('Lang:ENGLISH')){
                    location.href = '/html/home.html';
                }else if(data.includes('Lang:தமிழ்')){
                    location.href = '/html/tm/home.html'
                }
            }
        },
        error: function (error) {
            console.log(error.responseText);
        },
        complete: function () {
            // location.href = "/html/managePerson.html";
            // showNotification('top','right');
        }
    });
});

//Register the user
$("#register_btn").click(function (e) {
    e.preventDefault();
    let form_val = $("#form_signup").serialize();
    $.ajax({
        type: 'POST',
        url: '/user/register',
        data: form_val,
        success: function (data) {
            // console.log(data);
            // location.href = '/index.html';
            if("Successfully registered") $("#emailsent").modal('toggle')
        },
        error: function (error) {
            if(error.responseText.includes("userName_1 dup key")){
                $('#error_message_username').show();
            }
            else if(error.responseText.includes("email_1 dup key")){
                $('#error_message_email').show();
            }
        },
        complete: function () {
            // location.href = "/html/managePerson.html";
            // showNotification('top','right');
        }
    });
});

$('#select-lang').on('change', ()=>{
    let option = $('#select-lang').find(":selected").text(); 
    if(option == 'தமிழ்') location.href = 'tm/login_register.html';
    else if(option == 'ENGLISH') location.href = '../login_register.html'; 
 });