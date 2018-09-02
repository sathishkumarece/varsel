var table_activity
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
            { 'data': 'person_name', 'width': "20%" },
            { 'data': '_id', 'visible': false },
            { 'data': 'amount' },
            {
                'data': 'date',
                'render': function (d) {
                    return moment(d).format("YYYY-DD-MM");
                }
            },
            { 'data': 'information' },
            { 'data': 'category' },
            { 'data': 'type' }
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $(nRow).addClass("body-item mbr-fonts-style display-7");
        },
        order: [],
        responsive: true
    });

    // Event listener to the two range filtering inputs to redraw on input
    // $('#min, #max').keyup( function() {
    //     table_activity.draw();
    // } );

});

$('#search').click(() => {
    table_activity.draw();
});

$("#activity_table tbody").on('click', 'tr', function(){
    if($(this).hasClass('selected')){
        $('#edit_expense').hide();
        $('#delete_expense').hide();
        $(this).removeClass('selected');
    }else{
        $('#edit_expense').show();
        $('#delete_expense').show();
        table_activity.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        console.log(this);
    }
});

$("#delete_confirm").click(function(){
    // alert('Inside');
    console.log(table_activity.row('.selected').data());
    activityDelete(table_activity.row('.selected').data());
});

$("#edit_expense").click(function(){
    // alert('Inside');
    console.log(table_activity.row('.selected').data());
    // activityDelete();
});

function activityDelete(element){
    console.log(element);
    let id = element["_id"];
    $.ajax({
        url:"/activities/"+id,
        type: "DELETE"
    }).done(function(data){
        console.log(data);
        table_activity.row('.selected').remove().draw(true);
        $('#deleteModal').modal('toggle');
        // $(element).parent().parent().parent().remove();
    }).fail(function(){
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
        }else{
            isReDrawName = true;
        }
        if (filter_category) {
            if ((category.toUpperCase()).includes(filter_category.toUpperCase())) {
                isReDrawCategory = true;
            } else {
                isReDrawCategory = false;
            }
        } else{
            isReDrawCategory = true;
        }
        if (filter_type) {
            if ((type.toUpperCase()).includes(filter_type.toUpperCase())) {
                isReDrawType = true;
            } else {
                isReDrawType = false;
            }
        } else{
            isReDrawType = true;
        }
        if (filter_reason) {
            if ((reason.toUpperCase()).includes(filter_reason.toUpperCase())) {
                isReDrawReason = true;
            } else {
                isReDrawReason = false;
            }
        } else{
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