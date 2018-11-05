var table_person;

$(document).ready(function(){
    $('#error_message').hide();

    table_person = $('#example').DataTable({
        // autoWidth: true,
        ajax: {
                "type": 'GET',
                "url":"/person",
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

    $("form").submit(function(e){
        // alert($("form").serializeArray());
        e.preventDefault();
       let form_val= $("form").serialize();
       $.ajax({
           url: '/person',
           type: 'POST',
           data: form_val,
           async: false,
           success: function(data){
               setTimeout(function(){
                   console.log(data);
                }, 2000);
                showNotification('top','right', 'User saved successful!', 'success');
            },
            error: function(e){
                console.log(e);
                console.log(e.responseText);
                if(e.responseText.includes("duplicate key error")){
                    $('#error_message').show();
                }else{
                showNotification('top','right', 'Error occured while saving user', 'danger');
                }
            },
            complete: function(){
                // location.href = "/html/managePerson.html";
           }
       });
    });
    
});

function showNotification(from, align, message, type) {
    // type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

    // color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      icon: "fas fa-check",
      message: message

    }, {
      type: type,
      timer: 2000,
      placement: {
        from: from,
        align: align
      }
    });
  }