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
$("#form_login").submit(function (e) {
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
                location.href = '/html/home.html';
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
$("#form_signup").submit(function (e) {
    e.preventDefault();
    let form_val = $("#form_signup").serialize();
    $.ajax({
        type: 'POST',
        url: '/user/register',
        data: form_val,
        success: function (data) {
            console.log(data);
            location.href = '/html/home.html';
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