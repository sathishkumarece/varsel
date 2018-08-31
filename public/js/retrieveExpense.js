var table_activity
$(document).ready(function () {

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
            { 'data': '_id', 'visible':false },
            { 'data': 'amount' },
            { 'data': 'date',
            'render': function(d){
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
});