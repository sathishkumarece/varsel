
$(document).ready(function () {

    $.ajax({
        url: '/person/getname',
        type: 'GET',
        // data: form_val,
        async: false,
        success: function (data) {
            if(data == 'Access_denied'){
                location.href = '../index.html';
            }else{
            $.each(data, function (key, value) {
                $('#getName').append("<option value='" + value.name_en + "'>" + value.name_en + "</option>");
            });
            $(".selectpicker").selectpicker('refresh');
        }
        },
        error: function () {
            console.log('error occured');
        }
    });
});

$('#datepicker').datepicker({
    // weekStart: 1,
    // daysOfWeekHighlighted: "6,0",
    // autoclose: true,
    // todayHighlight: true,
    // format: 'dd/mm/yyyy hh:mm:ss',
});

