$("document").ready(function(){
    $.ajax({
        url: '/user/getProfile',
        type: 'GET',
        success: function(data){
            if(data == 'Access_denied'){
                location.href='../index.html'
            }else{
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

$('#updateProfile').click(function(){
    let form_val= $("form").serialize();
   console.log(form_val);
    $.ajax({
        url: `/user/updateProfile`,
        type: 'PUT',
        data: form_val,
        success: function(data){
            console.log(data);
            if(data.includes('Update success')){
                let message = 'User profile saved successful'
                if(data.includes('Lang:தமிழ்')){
                    message = 'பயனர் சுயவிவரம் சேமிக்கப்பட்டது'
                }
                showNotification('top','right', message, 'success');
            }
        }
    });
})