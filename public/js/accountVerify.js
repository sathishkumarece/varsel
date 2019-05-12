$(document).ready(function () {
    $('.container').hide();
    console.log(window.location.search);
    $.ajax({
        type: 'GET',
        url: `/user/verify${window.location.search}`,
        success: function (data) {
            // console.log(data);
            // location.href = '/index.html';
            if (data == 'Account verified') {
                $('.container').show();
            }
        },
        error: function (error) {

        },
        complete: function () {
            // location.href = "/html/managePerson.html";
            // showNotification('top','right');
        }
    });
});

$('#select-lang').on('change', ()=>{
    let option = $('#select-lang').find(":selected").text(); 
    if(option == 'தமிழ்') location.href = 'tm/accountVerify.html';
    else if(option == 'ENGLISH') location.href = '../accountVerify.html'; 
 });