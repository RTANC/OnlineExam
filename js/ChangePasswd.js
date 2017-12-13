$(document).ready(function () {
    var editing = $.dialog({
        closeIcon: false,
        lazyOpen: true,
        icon: 'fa fa-spinner fa-spin',
        title: 'Checking!',
        content: 'ระบบกำลังแก้ไขข้อมูล!'
    });
    $(document).ajaxStart(function () {
        editing.open();
    });
    $(document).ajaxComplete(function () {
        editing.close();
    });
    var txt_pass1 = $('#txt_passwd1');
    var txt_pass2 = $('#txt_passwd2');
    txt_pass1.keyup(function () {
        var reg = /^[A-z]{8,16}$/;
        var passwd = txt_pass1.val();
        if (reg.test(passwd)) {
            if (txt_pass2.val()) {
                if (!txt_pass1.val().localeCompare(txt_pass2.val())) {
                    txt_pass1.removeClass('is-invalid');
                    $('#txt_msg').addClass('text-hide');
                    $('#btn_submit').prop("disabled", false);
                    $('#btn_submit').removeClass("disabled");
                    txt_pass2.removeClass('is-invalid');
                } else {
                    txt_pass1.addClass('is-invalid');
                    txt_pass2.addClass('is-invalid');
                    $('#txt_msg').removeClass('text-hide');
                    $('#btn_submit').prop("disabled", true);
                    $('#btn_submit').addClass("disabled");
                }
            } else {
                txt_pass1.removeClass('is-invalid');
            }
        } else {
            txt_pass1.addClass('is-invalid');
        }
    });

    txt_pass2.keyup(function () {
        var reg = /^[A-z]{8,16}$/;
        var passwd = txt_pass2.val();
        if (reg.test(passwd)) {
            if (txt_pass1.val()) {
                if (!txt_pass1.val().localeCompare(txt_pass2.val())) {
                    txt_pass2.removeClass('is-invalid');
                    $('#txt_msg').addClass('text-hide');
                    $('#btn_submit').prop("disabled", false);
                    $('#btn_submit').removeClass("disabled");
                    txt_pass1.removeClass('is-invalid');
                } else {
                    txt_pass2.addClass('is-invalid');
                    $('#txt_msg').removeClass('text-hide');
                    $('#btn_submit').prop("disabled", true);
                    $('#btn_submit').addClass("disabled");
                }
            } else {
                txt_pass2.removeClass('is-invalid');
            }
        } else {
            txt_pass2.addClass('is-invalid');
        }
    });

    $('#btn_submit').click(function () {
        callSubmit(txt_pass1.val());       
    });

    function callSubmit(passwd) {
        $.ajax({
            url: 'ChangePasswd.aspx/Change',
            method: 'post',
            data: JSON.stringify({ pass: passwd }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.d) {
                    $.confirm({
                        icon: 'fa fa-check-circle text-success',
                        title: 'เปลี่ยน Password สำเร็จ!',
                        content: 'ระบบจะนำท่านกลับไปสู่หน้า Login',
                        buttons: {
                            OK: function () {
                                window.location.replace('LoginPage.aspx');
                            }
                        }
                    });
                } else {
                    $.confirm({
                        icon: 'fa fa-times-circle text-danger',
                        title: 'เปลี่ยน Password ล้มเหลว!',
                        content: 'กรุณา Login ใหม่อีกครั้ง',
                        buttons: {
                            OK: function () {
                                window.location.replace('LoginPage.aspx');
                            }
                        }
                    });
                }
            }
        });
    }
    
});
