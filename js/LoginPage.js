$(document).ready(function () {
    var checking = $.dialog({
        closeIcon: false,
        lazyOpen: true,
        icon: 'fa fa-spinner fa-spin',
        title: 'Checking!',
        content: 'ระบบกำลังตรวจสอบ!'
    });
    $(document).ajaxStart(function () {
        checking.open();
    });
    $(document).ajaxComplete(function () {
        checking.close();
    });
    $('#btn_login').click(function () {
        var u = $('#txt_uname').val();
        var p = $('#txt_pass').val();
        $.ajax({
            url: 'LoginPage.aspx/Validation',
            method: 'post',
            data: JSON.stringify({ uname: u, pass: p }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.d == 1) {
                    var cook = Cookies.get('myCookies').split('=');
                    if (cook[2] == 8) {
                        window.location.replace("./Evaluate.aspx");
                    } else {
                        window.location.replace("./MakeQuestion.aspx");
                    }                                      
                } else if (data.d == 2) {
                    window.location.replace("ChangePasswd.aspx");
                } else {
                    $.alert({
                        title: 'แจ้งเตือน!',
                        content: 'Login ล้มเหลว username หรือ Password ผิด!'
                    });
                }
            },
            error: function () {
                $.confirm({
                    title: 'Error',
                    content: 'ระบบเกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่!',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        OK: {
                            text: 'ทราบ',
                            btnClass: 'btn-red',
                            action: function () {
                            }
                        }
                    }
                });
            }
        });
    });
});