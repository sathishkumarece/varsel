var table_activity, isMobile;
$(document).ready(function () {

    $('#edit_expense').hide();
    $('#delete_expense').hide();

    table_activity = $('#activity_table').DataTable({
        // autoWidth: true,
        ajax: {
            "type": 'GET',
            "url": "/activities",
            "dataSrc": ""
        },
        destroy: true,
        select: true,
        // data: data,
        columns: [
            { 'data': 'person_name', 'width': "25%" },
            { 'data': '_id', 'visible': false },
            { 'data': 'amount' },
            {
                'data': 'date',
                'render': function (d) {
                    return moment(d).format("YYYY-DD-MM");
                },
                'width': "15%"
            },
            { 'data': 'information', 'width': "30%" },
            { 'data': 'category' },
            { 'data': 'type' },
            {
                'data': 'has_history',
                'render': function (d) {
                    if (d) {
                        return '<a id="history_edit" onclick=showHistory(this)><i class="fas fa-history"></i></a>';
                    } else {
                        return '<span/>'
                    }
                }
            }
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $(nRow).addClass("body-item mbr-fonts-style display-7");
        },
        order: [],
        responsive: true
    });

    isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // Event listener to the two range filtering inputs to redraw on input
    // $('#min, #max').keyup( function() {
    //     table_activity.draw();
    // } );

});

/**
 * 
 */
$('#search').click(() => {
    table_activity.draw();
});

function showHistory(element) {
    // let id = $(element).parent().parent().children()[1].innerText;
    let id = table_activity.row($(element).parent()).data()["_id"];
    console.log(id);
    $.ajax({
        url: "/history/" + id,
        type: "GET"
    }).done(function (data) {
        console.log(data);
        $("#show_p").html(timeline(data));
        $("#showHistory").modal('show');
    }).fail(function () {

    });
};
/**
 * Function to construct timeline to show history data
 * @param {*} data 
 */
function timeline(data) {
    var timelineVal = '<div class="row">' +
        '<div class="col-md-12">' +
        '<div class="main-timeline">';
    data.forEach((val) => {
        let midRegion =
            '<div class="timeline">' +
            '<div class="timeline-content">' +
            '<span class="year">' + val.key + '</span>' +
            '<p class="description">';
            timelineVal = timelineVal.concat(midRegion);
            val.values.forEach(v =>{
                timelineVal = timelineVal.concat(v);
            });
            midRegion = '</p>' +
            '</div>' +
            '</div>';
        timelineVal = timelineVal.concat(midRegion);
    });
    timelineVal = timelineVal.concat('</div></div></div>');
    return timelineVal;
};

$("#activity_table tbody").on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        if (!isMobile.any()) {
            $('#edit_expense').hide();
            $('#delete_expense').hide();
        }
        $(this).removeClass('selected');
    } else {
        if (!isMobile.any()) {
            $('#edit_expense').show();
            $('#delete_expense').show();
        }
        table_activity.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        console.log(this);
    }
});

$("#activity_table tbody").on('dblclick', 'tr', function () {
    console.log('test');
    $("#editModal").modal('toggle');
});

(function () {

    // milli seconds to define the pressing time
    var longpress = 500;
    // holds the start time
    var start;

    $("#activity_table tbody").on('mousedown touchstart', 'tr', function (e) {
        start = new Date().getTime();
    });

    $("#activity_table tbody").on('mouseleave', 'tr', function (e) {
        start = 0;
    });

    $("#activity_table tbody").on('mouseup touchend', 'tr', function (e) {
        if (new Date().getTime() >= (start + longpress)) {
            $("#deleteModal").modal('toggle');
        }
    });

}());

$("#delete_confirm").click(function () {
    // alert('Inside');
    console.log(table_activity.row('.selected').data());
    activityDelete(table_activity.row('.selected').data());
});

$("#edit_expense").click(function () {
    // alert('Inside');
    let row = table_activity.row('.selected').data();
    // $('input[name="person_name"]').attr("value", row['person_name']);
    updateNameSelect(row['person_name']);
    $('input[name="amount"]').attr("value", row['amount']);
    $('input[name="date"]').attr("value", dateFormat(row['date']));
    $('textarea[name="information"]').val(row['information']);
    updateCategorySelect(row['category']);
    if(row['type']==='Credit'){
        $('#expenseType').prop('checked', true);
    }else{
        $('#expenseType').prop('checked', false);
    }
    // activityDelete();
});

function dateFormat (d) {
    return moment(d).format("MM/DD/YYYY");
}

function updateNameSelect(option){
    $('button[data-id="getName"]').attr("title",option);
    $('button[data-id="getName"] span.filter-option').text(option);
    $('div.myNameClass div.open div.inner a').removeClass('selected');
    $('div.myNameClass div.open div.inner a').filter(function() {
        // Matches exact string   
        return $(this).find('.text').text() === option;
        }).addClass('selected');
    $('#getName option').attr("selected",false);
    $('#getName option').filter(function() {
        // Matches exact string   
        return $(this).text() === option;
        }).attr("selected","selected");
}

function updateCategorySelect(option){
    $('button[data-id="category"]').attr("title",option);
    $('button[data-id="category"] span.filter-option').text(option);
    $('div.myCategory div.open div.inner a').removeClass('selected');
    $('div.myCategory div.open div.inner a').filter(function() {
        // Matches exact string   
        return $(this).find('.text').text() === option;
        }).addClass('selected');
    $('#category option').removeAttr("selected");
    $('#category option:contains('+option+')').attr("selected","selected");
}

function activityDelete(element) {
    console.log(element);
    let id = element["_id"];
    $.ajax({
        url: "/activities/" + id,
        type: "DELETE"
    }).done(function (data) {
        console.log(data);
        table_activity.row('.selected').remove().draw(true);
        $('#deleteModal').modal('toggle');
        // $(element).parent().parent().parent().remove();
    }).fail(function () {
        alert("error");
        $('#deleteModal').modal('toggle');
    });
    $('#edit_expense').hide();
    $('#delete_expense').hide();
}


/* Custom filtering function which will search data in column four between two values */
$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        let age = parseFloat(data[2]) || 0; // use data for the age column
        let name = data[0];
        let reason = data[4];
        let category = data[5];
        let type = data[6];
        let filter_name = $('#filter_name').val();
        let filter_reason = $('#filter_reason').val();
        let filter_category = $('#filter_category').val();
        let filter_type = $('#filter_type').val();
        let isReDrawName, isReDrawCategory, isReDrawType, isReDrawAmt, isReDrawReason = false;
        if (filter_name) {
            if ((name.toUpperCase()).includes(filter_name.toUpperCase())) {
                isReDrawName = true;
            } else {
                isReDrawName = false;
            }
        } else {
            isReDrawName = true;
        }
        if (filter_category) {
            if ((category.toUpperCase()).includes(filter_category.toUpperCase())) {
                isReDrawCategory = true;
            } else {
                isReDrawCategory = false;
            }
        } else {
            isReDrawCategory = true;
        }
        if (filter_type) {
            if ((type.toUpperCase()).includes(filter_type.toUpperCase())) {
                isReDrawType = true;
            } else {
                isReDrawType = false;
            }
        } else {
            isReDrawType = true;
        }
        if (filter_reason) {
            if ((reason.toUpperCase()).includes(filter_reason.toUpperCase())) {
                isReDrawReason = true;
            } else {
                isReDrawReason = false;
            }
        } else {
            isReDrawReason = true;
        }
        let min = parseInt($('#filter_amt_min').val(), 10);
        let max = parseInt($('#filter_amt_max').val(), 10);

        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && age <= max) ||
            (min <= age && isNaN(max)) ||
            (min <= age && age <= max)) {
            isReDrawAmt = true;
        } else {
            isReDrawAmt = false;
        }

        if (isReDrawName && isReDrawCategory && isReDrawType && isReDrawReason && isReDrawAmt) {
            return true;
        } else {
            return false;
        }
    }
);

$("form").submit(function (e) {
    if (document.getElementById("expenseType").checked) {
        document.getElementById('testNameHidden').disabled = true;
    }
    let row = table_activity.row('.selected').data();
    let form_val = $("form").serialize();
    $.ajax({
        url: '/activities/'+row['person_name']+'/'+row['_id'],
        type: 'PUT',
        data: form_val,
        async: false,
        success: function (data) {
            setTimeout(function () {
                console.log(data);
            }, 2000);
            $('#editModal').modal('hide');
            table_activity.ajax.reload();
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