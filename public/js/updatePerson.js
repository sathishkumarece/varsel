var name_en = '';
$(document).ready(function(){
    console.log(window.location.search);
    console.log(getUrlParameter("name"));
    name_en = getUrlParameter("name");
    $('input[name="name_en"]').attr("value", name_en);
    $('input[name="email"]').attr("value", getUrlParameter("email"));
    $('input[name="address"]').attr("value", getUrlParameter("address"));
    $('input[name="phone"]').attr("value", getUrlParameter("phone").substring(3,13));
});

function getUrlParameter(param) {
    param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + param + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

$("form").submit(function(){
   let form_val= $("form").serialize();
   console.log(form_val);
//    let name = form_val.substring(form_val.indexOf('=')+1, form_val.indexOf('&'));
    $.ajax({
        url: `/person/${name_en}`,
        type: 'PUT',
        data: form_val,
        success: function(data){
            console.log(data);
        }
    });
});