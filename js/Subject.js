$(document).ready(function () {
    $('.mainLink').removeClass('active');
    $($('.mainLink')[2]).addClass('active');

    var jc = $.dialog({
        closeIcon: false,
        lazyOpen: true,
        icon: 'fa fa-spinner fa-spin',
        title: 'Loading!',
        content: 'ระบบกำลังโหลดข้อมูล!'
    });
    loadCourse();

    $('#select_course').change(function () {
        $('#txt_sub_no,#txt_sub_name').addClass('is-invalid').val('');
        $('#btn_add').prop({ disabled: true }).addClass('disabled');
        loadSubject();
    });

    $('#txt_sub_no,#txt_sub_name,#txt_edit_sub_no,#txt_edit_sub_name').keyup(function () {
        var objId = $(this).prop('id');
        if (objId == 'txt_sub_no' || objId == 'txt_edit_sub_no') {
            var reg = /^[ก-ฮ]{4}\s{1}[0-9]{3,3}$/;
            var sno = $(this).val();
            if (reg.test(sno)) {
                $(this).removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid');
            }
        } else {
            if ($(this).val().length > 0) {
                $(this).removeClass('is-invalid');
            } else {
                $(this).addClass('is-invalid');
            }
        }
        if (!($('#txt_sub_no,#txt_sub_name').hasClass('is-invalid'))) {
            $('#btn_add').prop({ disabled: false }).removeClass('disabled');
        } else {
            $('#btn_add').prop({ disabled: true }).addClass('disabled');
        }

        if (!($('#txt_edit_sub_no,#txt_edit_sub_name').hasClass('is-invalid'))) {
            $('#btn_editSubmit').prop({ disabled: false }).removeClass('disabled');
        } else {
            $('#btn_editSubmit').prop({ disabled: true }).addClass('disabled');
        }
    });


    $('#btn_add').click(function () {
        $(this).prop({ disabled: true });
        var sub_no = $('#txt_sub_no').val();
        var sub_name = $('#txt_sub_name').val();
        $('#txt_sub_no').val('').addClass('is-invalid');
        $('#txt_sub_name').val('').addClass('is-invalid');
        addSubject(sub_no, sub_name);
    });

    $('#btn_editSubmit').click(function () {
        $(this).prop({ disabled: true });
        var sub_id = $('#txt_edit_sub_id').val();
        var sub_no = $('#txt_edit_sub_no').val();
        var sub_name = $('#txt_edit_sub_name').val();
        editSubject(sub_id, sub_no, sub_name);
    });

    function loadCourse() {
        jc.open();
        $.ajax({
            url: 'Subject.aspx/getAllCourse',
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $('select[name=select_course]').empty();
                $(data.d).each(function (i, course) {
                    $('select[name=select_course]').append($('<option>', { text: course.course_name, value: course.course_id }));
                });
                loadSubject();
            }
        });
    }

    function loadSubject() {
        var course_id = $('#select_course').val();
        $.ajax({
            url: 'Subject.aspx/getSubjectByCourse',
            method: 'post',
            data: JSON.stringify({ cid: course_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $('#show_subject > tbody').empty();
                $(data.d).each(function (i, subject) {
                    var btn_edit = $('<button>').addClass('btn btn-warning').append('<i class="fa fa-pencil" aria-hidden="true"></i>').click(function () {
                        $('#txt_edit_sub_id').val(subject.subject_id);
                        $('#txt_edit_sub_no').val(subject.subject_no).removeClass('is-invalid');
                        $('#txt_edit_sub_name').val(subject.subject_name).removeClass('is-invalid');
                        $('#btn_editSubmit').prop({ disabled: false }).removeClass('disabled');
                        $('#modal_editSubject').modal('show');
                    });
                    var btn_del = $('<button>').addClass('btn btn-danger').append('<i class="fa fa-eraser" aria-hidden="true"></i>').click(function () {
                        delSubject(subject.subject_id);
                    });
                    $('#show_subject > tbody').append($('<tr>').append($('<th>', { text: subject.subject_no, scope: 'row' }), $('<td>', { text: subject.subject_name }), $('<td>').append(btn_edit), $('<td>').append(btn_del)));
                });
                $('#show_subject').paging();
            },
            error: function () {
                $.confirm({
                    title: 'Error!',
                    content: 'โหลดข้อมูลล้มเหลว!',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'ลองอีกครั้ง',
                            btnClass: 'btn-red',
                            action: function () {
                                location.reload();
                            }
                        },
                        'ยกเลิก': function () {
                        }
                    }
                });
            },
            complete: function () {
                jc.close();
            }
        });
    }

    function addSubject(sub_no, sub_name) {
        var course_id = $('#select_course').val();
        $.ajax({
            url: 'Subject.aspx/addSubject',
            method: 'post',
            data: JSON.stringify({ sno: sub_no, sname: sub_name, cid: course_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                loadSubject();
            }
        });
    }

    function editSubject(sub_id, sub_no, sub_name) {
        var course_id = $('#select_course').val();
        $.ajax({
            url: 'Subject.aspx/editSubject',
            method: 'post',
            data: JSON.stringify({ sid: sub_id, sno: sub_no, sname: sub_name, cid: course_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                $('#btn_editSubmit').prop({ disabled: false });
                $('#modal_editSubject').modal('hide');
                loadSubject();
            }
        });
    }

    function delSubject(sub_id) {
        $.ajax({
            url: 'Subject.aspx/delSubject',
            method: 'post',
            data: JSON.stringify({ sid: sub_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                loadSubject();
            }
        });
    }
});

