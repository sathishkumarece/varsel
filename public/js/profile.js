$("document").ready(function () {

    $('#no_password').hide()
    $('#no_confirm_password').hide()
    $('#confirm_pass').hide()

    $.ajax({
        url: '/user/getProfile',
        type: 'GET',
        success: function (data) {
            if (data == 'Access_denied') {
                location.href = '../index.html'
            } else {
                $('input[name="userName"]').attr("value", data.userName);
                $('input[name="email"]').attr("value", data.email);
                $('input[name="firstName"]').attr("value", data.firstName);
                $('input[name="lastName"]').attr("value", data.lastName);
                $('input[name="address"]').attr("value", data.address);
                $('input[name="city"]').attr("value", data.city);
                $('input[name="country"]').attr("value", data.country);
                $('input[name="pincode"]').attr("value", data.pincode);
                $('select[name="lang"]').val(data.lang);
            }
        }
    })
})

$('#edit_pass').click(function () {
    if ($('#confirm_pass').is(':hidden')) {
        $('#confirm_pass').show()
        $('input[name="password"]').attr("disabled", false)
    }
    else if ($('#confirm_pass').is(':visible')) {
        $('#confirm_pass').hide()
        $('input[name="password"]').attr("disabled", true)
    }
})

$('#password').on('keyup', ()=>{
    $('#no_password').hide()
})

$('#password_confirm').on('keyup', ()=>{
    $('#no_confirm_password').hide()
})

$('#updateProfile').click(function () {
    let form_val = $("form").serialize();
    let form_valid = $('#form_profile')[0].checkValidity();
    let isConfirmPassText = '';
    if ($('#confirm_pass').is(':visible'))
        isConfirmPassText = 'Has value';
    if (!isConfirmPassText || form_valid) {
        $.ajax({
            url: `/user/updateProfile`,
            type: 'PUT',
            data: form_val,
            success: function (data) {
                console.log(data);
                if (data.includes('Update success')) {
                    let message = 'User profile saved successful'
                    if (data.includes('Lang:தமிழ்')) {
                        message = 'பயனர் சுயவிவரம் சேமிக்கப்பட்டது'
                    }
                    showNotification('top', 'right', message, 'success');

                }
            }
        });
    } else {
        if (!$('#password')[0].checkValidity()) $('#no_password').show();
        if (!$('#password_confirm')[0].checkValidity()) $('#no_confirm_password').show();
    }
})

$('#select-lang').on('change', () => {
    let option = $('#select-lang').find(":selected").text();
    if (option == 'தமிழ்') location.href = 'tm/profile.html';
    else if (option == 'ENGLISH') location.href = '../profile.html';
});