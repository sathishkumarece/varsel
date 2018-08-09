$(document).ready(function(){
    console.log(window.location.search);
    console.log(getUrlParameter("name"));
    $('input[name="name_en"]').attr("value", getUrlParameter("name"));
    $('input[name="email"]').attr("value", getUrlParameter("email"));
    $('input[name="address"]').attr("value", getUrlParameter("address"));
    $('input[name="phone"]').attr("value", getUrlParameter("phone").substring(3,13));
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};