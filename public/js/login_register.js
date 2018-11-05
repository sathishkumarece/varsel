$(document).ready(function(){
    $('#error_message_username').hide();
    $('#error_message_email').hide();
});
var password = document.getElementById("passwordsignup")
  , confirm_password = document.getElementById("passwordsignup_confirm");

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

$("#form_login").submit(function (e) {
    let form_val = $("#form_login").serialize();
    console.log(form_val);
    let username = $("#username").val();
    console.log(username);
    $.ajax({
        type: 'GET',
        url: `/user/${username}`,
        data: { 'password': 'Qwerty1!' },
        success: function (data) {
            console.log(data);
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

$("#form_signup").submit(function (e) {
    e.preventDefault();
    let form_val = $("#form_signup").serialize();
    $.ajax({
        type: 'POST',
        url: '/user',
        data: form_val,
        success: function (data) {
            console.log(data);
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