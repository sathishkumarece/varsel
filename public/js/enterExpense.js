// Page to manage the Expenses

$(document).ready(function () {

    $.ajax({
        url: '/person/getname',
        type: 'GET',
        // data: form_val,
        async: false,
        success: function (data) {
            $.each(data, function(key, value){
                $('#getName').append("<option value='"+value.name_en+"'>"+value.name_en+"</option>");
            });
            $(".selectpicker").selectpicker('refresh');
        },
        error: function () {
            console.log('error occured');
        }
    });
});