function showNotification(from, align, message, type) {
    // type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

    // color = Math.floor((Math.random() * 6) + 1);

    let imageLoc = "../images/success.png";
    let option = $('#select-lang').find(":selected").text();
    if(option == 'தமிழ்') imageLoc = "../../images/success.png"

    $.notify({
      icon: imageLoc,
      message: message
    }, {
        icon_type: 'image',
        type: type,
        timer: 2000,
        placement: {
            from: from,
            align: align
        }
    });
  }