$(document).ready(function () {
    $.ajax({
        url: 'RegisterPage.aspx/getAllDept',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $(data.d).each(function (i, dept) {
                var opt = $('<option>', { value: dept.dept_id, text: dept.dept_name });
                $('#select_dept').append(opt);
            });
        }
    });

    $.ajax({
        url: 'RegisterPage.aspx/getAllRank',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $(data.d).each(function (i, rank) {
                var opt = $('<option>', { value: rank.rank_id, text: rank.rank_name });
                $('#select_rank').append(opt);
            });
        }
    });

    //Username Validation
    $('input[name=username]').keyup(function () {
        var txt_uname = $(this);
        var reg = /[A-z_]+/;
        var un = txt_uname.val();
        if (reg.test(un)) {
            txt_uname.removeClass('is-invalid');
            $.ajax({
                url: 'RegisterPage.aspx/ValidateUname',
                method: 'post',
                data: JSON.stringify({ uname: un }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data.d) {
                        $('#valmsg').addClass('text-hide');
                        txt_uname.removeClass('is-invalid');
                    } else {
                        $('#valmsg').removeClass('text-hide');
                        txt_uname.addClass('is-invalid');
                    }
                }               
            });
        } else {
            $(this).addClass('is-invalid');
        }
    });

    //Password Validation
    $('input[name=pass]').keyup(function () {
        var reg = /[A-z\d]{6,}/;
        if (reg.test($(this).val())) {
            $(this).removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid');
        }
    });

    //First Name Validation
    $('input[name=fname]').keyup(function () {
        var reg = /[\w\S]+/;
        if (reg.test($(this).val())) {
            $(this).removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid');
        }
    });

    //Last Name Validation
    $('input[name=lname]').keyup(function () {
        var reg = /[\w\S]+/;
        if (reg.test($(this).val())) {
            $(this).removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid');
        }
    });

    $('#btn_submit').click(function () {
        if (!($('input').hasClass('is-invalid'))) {
            var un = $('input[name=username]').val();
            var p = $('input[name=pass]').val();
            var r = $('select[name=rank]').val();
            var fn = $('input[name=fname]').val();
            var ln = $('input[name=lname]').val();
            var g = $('input[name=gender]').val();
            var d = $('select[name=dept]').val();
            $.ajax({
                url: 'RegisterPage.aspx/Register',
                method: 'post',
                data: JSON.stringify({ uname: un, passwd: p, rank: r, fname: fn, lname: ln, gender: g, dept: d }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function () {
                    $.confirm({
                        title: 'แจ้งเตือน!',
                        content: 'ลงทะเบียนสำเร็จ!',
                        buttons: {
                            'ตกลง': function () {
                                window.location.replace("LoginPage.aspx");
                            }
                        }
                    });
                    
                }
            });
        } else {
            $.alert({
                title: 'แจ้งเตือน!',
                content: 'ข้อมูลบางส่วนยังไม่ถุกต้อง!',
            });
        }

    });

    $('#btn_reset').click(function () {
        window.location.replace("LoginPage.aspx");
    });
});