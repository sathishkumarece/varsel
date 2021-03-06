var search_char = "";
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: "/person"
    }).done(function (data) {
        if(data == 'Access_denied'){
            location.href = 'login_register.html#tologin';
        }else{
        data.forEach(element => {
            // var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
            // var myPanel = $('<div class="card"><div class="card-body"><h4 class="card-title">Card title that wraps to a new line</h4><p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div></div>');
            var myPanel = $(`<div class="col-sm-4 col-md-4 pb-2">
                <div class="card card-hover">
                <div class="card-body">
                <i class="fa fa-trash-alt float-right user-delete reveal" style="color:#ff6b6b;" onclick="userDelete(this)"></i>
                <i class="fa fa-user-edit float-right user-edit reveal" style="color:#3770cc" onclick="userEdit(this)"></i>
                <h5 class="card-title text-left"> ${element.name_en} </h5>
                <div class="row">
                <div class="col-12 col-sm-6 col-md-3 px-0">
                <img src="../images/Professional_photo.jpg" alt="" class="img-fluid rounded-circle d-block mx-auto" style="height:80px; width:80px;">
                </div>
                <div class="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                <span class="fa fa-envelope fa-fw" data-toggle="tooltip" data-original-title="" title="" style="color:#4a4b4b;"></span>
                <span class="text-muted small text-truncate"> ${element.email} </span>
                <br>
                <span class="fa fa-map-marker-alt fa-fw" data-toggle="tooltip" title="" data-original-title="" style="color:#4a4b4b;"></span>
                <span class="text-muted small"> ${element.address} </span>
                <br>
                <span class="fa fa-mobile-alt fa-fw" data-toggle="tooltip" title="" data-original-title="" style="color:#4a4b4b;"></span>
                <span class="text-muted small">+91 ${element.phone}</span>
                </div>
                </div>
                </div>
                </div>
                </div>`);
            // myPanel.appendTo(myCol);
            myPanel.appendTo('#contentPanel');
        });
    }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#backtotop').fadeIn();
        } else {
            $('#backtotop').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#backtotop').click(function () {
        $('#backtotop').tooltip('hide');
        // if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
        //     window.scrollTo(200, 100) // first value for left offset, second value for top offset
        // } else {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        // }
        return false;
    });

    $('#backtotop').tooltip('show');
});
$('.searchbox-input').on('keyup', function () {
    var filter = $(this).val(); // get the value of the input, which we filter on
    console.log(filter);
    if ("" === filter) {
        $('#contentPanel').find('*').css('display', '');
    } else {
        if (filter.length < search_char.length) {
            $('#contentPanel').find('*').css('display', '');
        }
        $('#contentPanel').find(".card-title:not(:contains(" + filter + "))").parent().parent().parent().css('display', 'none');
    }
    search_char = filter;
});

//Override default contains menthod to perform case insensitive comparison
jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

// $('#search').on('click', () => {
//     alert("Search done");
// });

function userEdit(element) {
    let name = $(element).parent().children()[2].innerText;
    let content = $(element).parent().get(0).innerText.split("\n");

    // console.log($("#contentPanel").find(".text-muted"));
    // alert("User edit");
    location.href = `/html/updatePerson.html?name=${name}&email=${content[1]}&address=${content[2]}&phone=${content[3]}`;
};

function userDelete(element) {
    console.log(element);
    let name = $(element).parent().children()[2].innerText;
    $.ajax({
        url: "/person" + "?" + $.param({ "name_en": name }),
        type: "DELETE"
    }).done(function (data) {
        console.log(data);
        $(element).parent().parent().parent().remove();
    }).fail(function () {
        alert("error");
    });
}

$('#select-lang').on('change', ()=>{
    let option = $('#select-lang').find(":selected").text(); 
    if(option == 'தமிழ்') location.href = 'tm/managePerson.html';
    else if(option == 'ENGLISH') location.href = '../managePerson.html'; 
 });
