$(document).ready(function () {
    $('#modal_warning').modal('show');
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
        if ($.isNumeric(u) == false) {
            $.alert({
                title: 'แจ้งเตือน!',
                content: 'Login ล้มเหลว โปรดตรวจสอบ รหัสนักเรียน รหัสผ่าน!'
            });
            return;
        }
        $.ajax({
            url: 'StudentLogin.aspx/Validation',
            method: 'post',
            data: JSON.stringify({ stu_id: u, pass: p }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                if (data.d.exam_id != 0) {
                    var obj = data.d;
                    Cookies.set("obj", obj);
                    //Cookies.set("obj", obj, { expires: 1 });//For Test
                    window.location.replace('Test.aspx');
                } else {
                    $.alert({
                        title: 'แจ้งเตือน!',
                        content: 'Login ล้มเหลว โปรดตรวจสอบ รหัสนักเรียน รหัสผ่าน และ วัน-เวลา สอบอีกครั้ง!'
                    });
                }
            }
        });
    });

});