$(document).ready(function () {
    $('#error_message_username').hide();
    $('#error_message_email').hide();
    $('#login_failed_username').hide();
    $('#login_failed_password').hide();
    $('#login_failed_verified').hide();
    $('#login_failed_missing_cred').hide()
    $('#no_username').hide();
    $('#no_email').hide();
    $('#no_password').hide();
    $('#no_confirm_password').hide();
});
var password = document.getElementById("passwordsignup")
    , confirm_password = document.getElementById("passwordsignup_confirm");

//Check provided password and confirm password matches
function validatePassword() {
    let language = $('#select-lang').find(":selected").text();
    let password_mismatch = "Passwords Didn't Match";
    if (language == 'தமிழ்') password_mismatch = "கடவுச்சொற்கள் பொருந்தவில்லை"
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity(password_mismatch);
    } else {
        confirm_password.setCustomValidity('');
    }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

$('#usernamesignup').on('keyup', function () {
    $('#error_message_username').hide();
    $('#no_username').hide();
});
$('#emailsignup').on('keyup', function () {
    $('#error_message_email').hide();
    $('#no_email').hide();
});
$('#username, #password').on('keyup', function () {
    $('#login_failed_username').hide();
    $('#login_failed_password').hide();
    $('#login_failed_verified').hide();
    $('#login_failed_missing_cred').hide()
});
$('#passwordsignup').on('keyup', function () {
    $('#no_password').hide();
});
$('#passwordsignup_confirm').on('keyup', function () {
    $('#no_confirm_password').hide();
});

//Login validation
$("#login_btn").click(function (e) {
    let form_val = $("#form_login").serialize();
    $.ajax({
        type: 'POST',
        url: '/user/login',
        data: form_val,
        success: function (data) {
            console.log(data);
            if (data.includes('Access_denied')) {
                if(data.includes('Message:No user found')) $('#login_failed_username').show();
                if(data.includes('Message:Incorrect password')) $('#login_failed_password').show();
                if(data.includes('Message:Account not verified')) $('#login_failed_verified').show();
                if(data.includes('Message:Missing credentials')) $('#login_failed_missing_cred').show();
            } else {
                if (data.includes('Lang:ENGLISH')) {
                    location.href = '/html/home.html';
                } else if (data.includes('Lang:தமிழ்')) {
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

    let validForm = $('#form_signup')[0].checkValidity();
    if (validForm) {
        e.preventDefault();
        let form_val = $("#form_signup").serialize();
        $.ajax({
            type: 'POST',
            url: '/user/register',
            data: form_val,
            success: function (data) {
                // console.log(data);
                // location.href = '/index.html';
                if ("Successfully registered") $("#emailsent").modal('toggle')
            },
            error: function (error) {
                if (error.responseText.includes("userName_1 dup key")) {
                    $('#error_message_username').show();
                }
                else if (error.responseText.includes("email_1 dup key")) {
                    $('#error_message_email').show();
                }
            },
            complete: function () {
                // location.href = "/html/managePerson.html";
                // showNotification('top','right');
            }
        });
    }else{
        if(!$('#usernamesignup')[0].checkValidity()) $('#no_username').show();
        if(!$('#emailsignup')[0].checkValidity()) $('#no_email').show();
        if(!$('#passwordsignup')[0].checkValidity()) $('#no_password').show();
        if(!$('#passwordsignup_confirm')[0].checkValidity()) $('#no_confirm_password').show();
    }
});

$('#select-lang').on('change', () => {
    let option = $('#select-lang').find(":selected").text();
    if (option == 'தமிழ்') location.href = 'tm/login_register.html';
    else if (option == 'ENGLISH') location.href = '../login_register.html';
});