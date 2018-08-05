var search_char ="";
$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: "/person"
    }).done(function (data) {
        data.forEach(element => {
            // var myCol = $('<div class="col-sm-3 col-md-3 pb-2"></div>');
            // var myPanel = $('<div class="card"><div class="card-body"><h4 class="card-title">Card title that wraps to a new line</h4><p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p></div></div>');
            var myPanel = $('<div class="col-sm-4 col-md-4 pb-2">' +
                '<div class="card">' +
                '<div class="card-body">' +
                '<div class="row">' +
                '<h5 class="card-title text-center">'+element.name_en+'</h5>' +
                '<a href="#" class="btn user-edit"><i class="fa fa-user-edit" id="search"></i></a>'+
                '</div>'+
                '<div class="row">' +
                '<div class="col-12 col-sm-6 col-md-3 px-0">' +
                '<img src="//placehold.it/50/eeeeee" alt="" class="img-fluid rounded-circle d-block mx-auto">' +
                '</div>' +
                '<div class="col-12 col-sm-6 col-md-9 text-center text-sm-left">' +
                '<span class="fa fa-envelope fa-fw" data-toggle="tooltip" data-original-title="" title="" style="color:#4a4b4b;"></span>' +
                '<span class="text-muted small text-truncate">'+element.email+'</span>' +
                '<br>' +
                '<span class="fa fa-map-marker-alt fa-fw" data-toggle="tooltip" title="" data-original-title="" style="color:#4a4b4b;"></span>' +
                '<span class="text-muted">'+element.address+'</span>' +
                '<br>' +
                '<span class="fa fa-mobile-alt fa-fw" data-toggle="tooltip" title="" data-original-title="" style="color:#4a4b4b;"></span>' +
                '<span class="text-muted small">+91'+element.phone+'</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');
            // myPanel.appendTo(myCol);
            myPanel.appendTo('#contentPanel');
        });
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
            $('#contentPanel').find(".card-title:not(:contains(" + filter + "))").parent().parent().parent().parent().css('display', 'none');
        }
        search_char = filter;
    });
    jQuery.expr[':'].contains = function(a, i, m) {
        return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
      };

      $('#search').on('click', () => {
        alert("Search done");
      });
});