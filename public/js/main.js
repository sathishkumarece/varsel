$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url:"/user"
    }).done(function(data){
        if(data == 'Access granted')
        location.href = '/html/home.html'
    });
});
 /*$(function(){
    $("h1").css("color", "#0088ff");
 });*/

 $('#select-lang').on('change', ()=>{
    let option = $('#select-lang').find(":selected").text(); 
    if(option == 'தமிழ்') location.href = 'html/tm/index.html';
    else if(option == 'ENGLISH') location.href = '../../index.html'; 
 });