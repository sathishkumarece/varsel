$(document).ready(function(){
    $("h1").css("color", "#0088ff");
    $.ajax({
        type: 'GET',
        url:"/person"
    }).done(function(data){
        console.log(data);
        var person = document.getElementById('person');
        data.forEach(element => {
            var spanText = document.createElement('span');
            spanText.innerHTML = element.name_en;
            person.appendChild(spanText);
            person.appendChild(document.createElement('br'));
        });
    });
});
 /*$(function(){
    $("h1").css("color", "#0088ff");
 });*/