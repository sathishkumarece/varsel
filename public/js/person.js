var table_person;

$(document).ready(function(){
    // $.ajax({
    //     type: 'GET',
    //     url:"/person"
    // }).done(function(data){
    //     table_person = $('#example').DataTable({
    //         // autoWidth: true,
    //         destroy: true,
    //         select: true,
    //         data: data,
    //         columns: [
    //             {'data':'name_en'},
    //             {'data':'phone'},
    //             {'data':'address'},
    //             {'data':'email'},
    //             {'data':'name_tn'}
    //         ],
    //         "fnRowCallback": function (nRow, aData, iDisplayIndex) {
    //             $(nRow).addClass("body-item mbr-fonts-style display-7");
    //         },
    //         order: [],
    //         responsive: true
    //     });
    // });


    table_person = $('#example').DataTable({
        // autoWidth: true,
        ajax: {
            //         // "cache": true,
                "type": 'GET',
                "url":"/person",
            //         // "data": "",
               "dataSrc":""
                },
        destroy: true,
        select: true,
        // data: data,
        columns: [
            {'data':'name_en', 'width':'1%'},
            {'data':'phone'},
            {'data':'address'},
            {'data':'email'},
            {'data':'name_tn'}
        ],
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $(nRow).addClass("body-item mbr-fonts-style display-7");
        },
        order: [],
        responsive: true
    });
    // table_person = $("#example").DataTable({
    //     "destroy": true,
    //     "processing": true,
    //     "serverSide": true,
    //     "ajax": {
    //         // "cache": true,
    //         "type": 'GET',
    //         "url":"/person",
    //         // "data": "",
    //        "dataSrc":""
    //     },
    //     // "select": true,
    //     // "data": data,
    //     "columns": [
    //             {"data":"name_en"},
    //             {"data":"phone"},
    //             {"data":"address"},
    //             {"data":"email"},
    //             {"data":"name_tn"}
    //         ],
    //     "fnRowCallback": function (nRow, aData, iDisplayIndex) {
    //             $(nRow).addClass("body-item mbr-fonts-style display-7");
    //         },
    //     "responsive": true
    // });

    // var table_person = $("#example").DataTable();
    $("#example tbody").on('click', 'tr', function(){
        if($(this).hasClass('selected')){
            $(this).removeClass('selected');
        }else{
            table_person.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            console.log(this);
        }
    });

    $("#delete-person").click(function(){
        // alert('Inside');
        console.log(table_person.row('.selected'));
        table_person.row('.selected').remove().draw(true);
        deletePersonData();
    });

    // $('#delete-person').click( function () {
    //     console.log(table_person);
    // } );

    $("form").submit(function(){
        // alert($("form").serializeArray());
       let form_val= $("form").serialize();
        $.post("/person", form_val , function(data, status){
            // alert("Success");
            console.log(data);
            location.href = "/html/managePerson.html";
            // $('#successMessage').show();
            // $('#successMessage').delay(3000).fadeOut("slow");
        })
    });
    
    /* editor = new $.fn.dataTable.Editor( {
        ajax: "/person",
        table: "#example",
        fields: [ {
                label: "First name:",
                name: "first_name"
            }, {
                label: "Last name:",
                name: "last_name"
            }, {
                label: "Position:",
                name: "position"
            }, {
                label: "Office:",
                name: "office"
            }, {
                label: "Extension:",
                name: "extn"
            }, {
                label: "Start date:",
                name: "start_date",
                type: 'datetime'
            }, {
                label: "Salary:",
                name: "salary"
            }
        ]
    } );
    
    var table = $('#example').DataTable( {
        lengthChange: false,
        ajax: "/person",
        columns: [
            { data: null, render: function ( data, type, row ) {
                // Combine the first and last names into a single table field
                return data.first_name+' '+data.last_name;
            } },
            { data: "position" },
            { data: "office" },
            { data: "extn" },
            { data: "start_date" },
            { data: "salary", render: $.fn.dataTable.render.number( ',', '.', 0, '$' ) }
        ],
        select: true
    } );
    
    // Display the buttons
    new $.fn.dataTable.Buttons( table, [
        { extend: "create", editor: editor },
        { extend: "edit",   editor: editor },
        { extend: "remove", editor: editor }
    ] );
 
    table.buttons().container()
        .appendTo( $('.col-md-6:eq(0)', table.table().container() ) );*/
});