// Page to manage the Expenses

$(document).ready(function () {

    $.ajax({
        url: '/person/getname',
        type: 'GET',
        // data: form_val,
        async: false,
        success: function (data) {
            $.each(data, function (key, value) {
                $('#getName').append("<option value='" + value.name_en + "'>" + value.name_en + "</option>");
            });
            $(".selectpicker").selectpicker('refresh');
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
$('#datepicker').datepicker("setDate", new Date());


$("form").submit(function (e) {
    // alert($("form").serializeArray());
    // e.preventDefault();
    if (document.getElementById("expenseType").checked) {
        document.getElementById('testNameHidden').disabled = true;
    }
    let form_val = $("form").serialize();
    $.ajax({
        url: '/activities',
        type: 'POST',
        data: form_val,
        async: false,
        success: function (data) {
            setTimeout(function () {
                console.log(data);
            }, 2000);
        },
        error: function () {
            console.log('error occured');
        },
        complete: function () {
            // location.href = "/html/managePerson.html";
            // showNotification('top','right');
        }
    });
});