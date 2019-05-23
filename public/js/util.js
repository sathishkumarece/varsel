function showNotification(from, align, message, type) {
    // type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

    // color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      icon: "../images/success.png",
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