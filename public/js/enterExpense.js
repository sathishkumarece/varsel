// Page to manage the Expenses

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