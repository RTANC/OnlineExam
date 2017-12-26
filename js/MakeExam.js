$(document).ready(function () {
    var mod = 0;
    $('.mainLink').removeClass('active');
    $($('.mainLink')[1]).addClass('active');
    var bloomMap = ['ยังไม่กำหนด', 'ความรู้ที่เกิดจากความจำ', 'ความเข้าใจ', 'การประยุกต์', 'การวิเคราะห์', 'การสังเคราะห์', 'การประเมินค่า'];
    var jc = $.dialog({
        closeIcon: false,
        lazyOpen: true,
        icon: 'fa fa-spinner fa-spin',
        title: 'Loading!',
        content: 'กำลังโหลด!'
    });
    
    $(document).ajaxStart(function () {       
        jc.open();
    });
    var tbl_student = $('#show_student').DataTable({
        "language": {
            "url": "language/Thai.json"
        }
    });
    var tbl_question = $('#show_question').DataTable({
        "language": {
            "url": "language/Thai.json"
        }
    });
    var tbl_select_question = $('#show_select_question').DataTable({
        "language": {
            "url": "language/Thai.json"
        }
    });
    $(document).ajaxStop(function () {
        jc.close();
    });

    $(document).ajaxError(function () {
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
    });
    
    getExam();
    getExaminee();

    $('#btn_gotoSchedule').click(function () {
        Cookies.remove('ex_id');
        window.location.replace('MakeSchedule.aspx');
    });

    $('#btn_addSelectQuest').click(function () {
        var quest_id = $('input[type=checkbox][name=quest_id]:checked');
        for (var i = 0; i < $(quest_id).length; i++) {
            $.ajax({
                url: 'MakeExam.aspx/addQuestion',
                method: 'post',
                async: false,
                data: JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: $('input[type=number][name=numCopy]').val(), qid: $(quest_id[i]).val() }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function () {
                    getQuestionInExam();
                    $('#modal_question').modal('hide');
                }
            });
        }
    });

    $('#btn_addExaminee').click(function () {
        addExaminee();
    });

    $('#btn_delAllExaminee').click(function () {
        delAllExaminee();
    });

    $('#btn_delCopy').click(function () {
        $.confirm({
            title: 'ยืนยัน!',
            content: 'ท่านต้องการจะลบข้อสอบ ชุดนี้หรือไม่!',
            buttons: {
                'ยืนยัน': function () {
                    delCopy();
                },
                'ยกเลิก': function () {
                }
            }
        });
    });

    $('input[type=number][name=numCopy],#select_topic,input[type=radio][name=filter]').change(function () {
        getQuestionInExam();
    });

    $('input[name=stu_type]').change(function () {
        $("input[name=c").prop({ 'disabled': true });
        var p = $('input[name=stu_type]:checked').parent().parent().children();
        $(p).prop({ 'disabled': false });
    });

    $('input[type=checkbox][name=quest_checkAll]').click(function () {
        $('input[type=checkbox][name=quest_id]').prop({ checked: $(this).is(':checked') });
    });

    function getExam() {
        $.ajax({
            url: 'MakeExam.aspx/getExam',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var exam = $(data.d)[0];
                $('#lbl_year').text(exam.year);
                $('#lbl_term').text((exam.term > 2) ? 'ภาคฤดูร้อน' : 'ภาคการศึกษาที่ ' + exam.term);
                $('#lbl_subject').text(exam.subject_name);
                $('#lbl_date').text(moment(exam.exam_start_time).format('DD/MM/YYYY'));
                $('#lbl_time').text(moment(exam.exam_start_time).format('HH:mm') + ' ถึง ' + moment(exam.exam_end_time).format('HH:mm'));
                getTopicBySubject(exam.subject_id);
            }
        });
    }

    function getTopicBySubject(sub_id) {
        $.ajax({
            url: 'MakeExam.aspx/getTopicBySubject',
            method: 'post',
            data: JSON.stringify({ sid: sub_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $(data.d).each(function (i, topic) {
                    $('#select_topic').append($('<option>', { text: topic.topic_name, value: topic.topic_id }));
                });
                getQuestionInExam();
            }
        });
    }

    function getExaminee() {
        $.ajax({
            url: 'MakeExam.aspx/getExaminee',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                tbl_student.clear().draw();
                $(data.d).each(function (i, stu) {
                    var btn_del = $('<button>').addClass('btn btn-danger').append($('<i class="fa fa-trash"></i>')).click(function () {
                        delExaminee(stu.student_id);
                    });
                    var fullName = '';
                    if (stu.student_type == 1) {
                        fullName = 'นรพ.&emsp;' + stu.student_fname + '&emsp;&emsp;&emsp;&emsp;&emsp;' + stu.student_lname;
                    } else if (stu.student_type == 2) {
                        fullName = 'นรช.&emsp;' + stu.student_fname + '&emsp;&emsp;&emsp;&emsp;&emsp;' + stu.student_lname;
                    } else if (stu.student_type == 3) {
                        fullName = 'นทน.&emsp;' + stu.student_fname + '&emsp;&emsp;&emsp;&emsp;&emsp;' + stu.student_lname;
                    }
                    //$('#show_student > tbody').append($('<tr>').append($('<td>', { text: stu.student_id }).addClass('text-center'), $('<td>', { html: fullName }), $('<td>', { text: stu.examinee_passwd }).addClass('text-center'), $('<td>').append(btn_del).addClass('text-center')));
                    var r = $('<tr>').append($('<td>', { text: stu.student_id }).addClass('text-center'), $('<td>', { html: fullName }), $('<td>', { text: stu.examinee_passwd }).addClass('text-center'), $('<td>').append(btn_del).addClass('text-center'));
                    tbl_student.row.add(r).draw();
                });
                
            }
        });
    }

    function addExaminee() {
        var stu_type = $('input[type=radio][name=stu_type]:checked').val();
        var stu_intake = $('input[type=radio][name=stu_type]:checked').parent().parent().children('input[type=number][name=c]').val();
        var urlAdd = (stu_intake.length >= 5) ? 'MakeExam.aspx/addExamineeById' : 'MakeExam.aspx/addExaminee';
        $.ajax({
            url: urlAdd,
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id'), s_type: stu_type, intake: stu_intake }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                if (data.d == false) {
                    $.alert({
                        title: 'การแจ้งเตือน!',
                        content: 'ไม่มีข้อมูล นักเรียนที่ท่านเลือก!',
                    });
                } else {
                    getExaminee();
                }
            },
            error: function () {
                $.alert({
                    title: 'การแจ้งเตือน!',
                    content: 'เกิดความผิดพลาดในการเพิ่มข้อมูล!',
                });
            }
        });
    }

    function delAllExaminee() {
        $.confirm({
            title: 'การยืนยัน!',
            content: 'ท่านต้องการจะลบผู้เข้าสอบทั้งหมดนี้ หรือไม่!',
            buttons: {
                'ยืนยัน': function () {
                    $.ajax({
                        url: 'MakeExam.aspx/delAllExaminee',
                        method: 'post',
                        data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        success: function () {
                            getExaminee();
                        }
                    });
                },
                'ยกเลิก': function () {

                }
            }
        });
    }

    function delExaminee(student_id) {
        $.confirm({
            title: 'การยืนยัน!',
            content: 'ท่านต้องการนำนักเรียนคนนี้ ออกจากการสอบหรือไม่!',
            buttons: {
                'ยืนยัน': function () {
                    $.ajax({
                        url: 'MakeExam.aspx/delExaminee',
                        method: 'post',
                        data: JSON.stringify({ stu_id: student_id, ex_id: Cookies.get('ex_id') }),
                        dataType: 'json',
                        contentType: 'application/json;charset=utf-8',
                        success: function () {
                            getExaminee();
                        }
                    });
                },
                'ยกเลิก': function () {

                }
            }
        });
    }

    function getQuestion() {
        var dd = JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: $('input[type=number][name=numCopy]').val(), tid: $('#select_topic').val(), at: $('input[type=radio][name=filter]:checked').val() });
        $.ajax({
            url: 'MakeExam.aspx/getQuestion',
            method: 'post',
            data: dd,
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                //$('#show_select_question > tbody').empty();
                tbl_select_question.clear().draw();
                $(data.d).each(function (i, q) {
                    var ckBox = $('<input>', { name: 'quest_id', value: q.question_id, type: 'checkbox' });
                    var colQuestTxt = $('<td>', { text: q.question_text }).click(function () {
                        $('.quest_detail').removeClass('d-none');
                        $('#lbl_quest').text(q.question_text);
                        if (q.question_img != null) {
                            $('.pre_quest_img').prop({ src: q.question_img }).removeClass('d-none');
                        } else {
                            $('.pre_quest_img').addClass('d-none');
                        }
                        if (q.ans_type == 0) {
                            var tmp = q.choice1.split(".");
                            tmp = tmp[(tmp.length - 1)];
                            if (tmp == 'jpg' || tmp == 'jpeg' || tmp == 'png' || tmp == 'gif') {
                                $('.ans_txt').addClass('d-none');
                                $('.ans_img').removeClass('d-none');
                                $($('.pre_ans_img')[0]).attr('src', q.choice1);
                                $($('.pre_ans_img')[1]).attr('src', q.choice2);
                                $($('.pre_ans_img')[2]).attr('src', q.choice3);
                                $($('.pre_ans_img')[3]).attr('src', q.choice4);
                                $($('.pre_ans_img')[4]).attr('src', q.choice5);
                            } else {
                                $('.ans_txt').removeClass('d-none');
                                $('.ans_img').addClass('d-none');
                                $($('input[type=text][name=choice]')[0]).val(q.choice1);
                                $($('input[type=text][name=choice]')[1]).val(q.choice2);
                                $($('input[type=text][name=choice]')[2]).val(q.choice3);
                                $($('input[type=text][name=choice]')[3]).val(q.choice4);
                                $($('input[type=text][name=choice]')[4]).val(q.choice5);
                            }
                            $('#lbl_ans_choice').text(q.ans_choice);
                        } else {
                            //อัตนัย
                        }
                        $('#lbl_score').text(q.score);
                    }).css({ 'cursor': 'pointer' });
                    var r = $('<tr>').append(colQuestTxt, $('<td>', { text: (q.p_value == '') ? 'N/A' : q.p_value }), $('<td>', { text: (q.r_value == '') ? 'N/A' : q.r_value }), $('<td>').addClass('text-center').append(ckBox));
                    //$('#show_select_question > tbody').append(row);
                    tbl_select_question.row.add(r).draw();
                });
            },
            error: function () {
                tbl_select_question.clear().draw();
                //$('#show_select_question > tbody').empty();
                //$('#show_select_question > tbody').append($('<tr>').append($('<td>', { text: 'ไม่มีข้อมูลในระบบ', colspan: 4 }).addClass('text-center')));
            }
        });
    }

    function getQuestionInExam() {
        var top_id = $('#select_topic').val();
        var a_type = $('input[type=radio][name=filter]:checked').val();
        $.ajax({
            url: 'MakeExam.aspx/getQuestionInExam',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: $('input[type=number][name=numCopy]').val(), tid: top_id, at: a_type }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                //$('#show_question > tbody').empty();
                tbl_question.clear().draw();
                $(data.d).each(function (i, q) {
                    if (q.topic_id == top_id && q.ans_type == a_type) {
                        var btn_info = $('<button>').addClass('btn btn-info').append('<i class="fa fa-info"></i>').click(function () {
                            mod = 2;
                            $('#lbl_quest').text(q.question_text);
                            if (q.question_img != null) {
                                $('.pre_quest_img').prop({ src: q.question_img }).removeClass('d-none');
                            } else {
                                $('.pre_quest_img').addClass('d-none');
                            }
                            if (q.ans_type == 0) {
                                var tmp = q.choice1.split(".");
                                tmp = tmp[(tmp.length - 1)];
                                if (tmp == 'jpg' || tmp == 'jpeg' || tmp == 'png' || tmp == 'gif') {
                                    $('.ans_txt').addClass('d-none');
                                    $('.ans_img').removeClass('d-none');
                                    $($('.pre_ans_img')[0]).attr('src', q.choice1);
                                    $($('.pre_ans_img')[1]).attr('src', q.choice2);
                                    $($('.pre_ans_img')[2]).attr('src', q.choice3);
                                    $($('.pre_ans_img')[3]).attr('src', q.choice4);
                                    $($('.pre_ans_img')[4]).attr('src', q.choice5);
                                } else {
                                    $('.ans_txt').removeClass('d-none');
                                    $('.ans_img').addClass('d-none');
                                    $($('input[type=text][name=choice]')[0]).val(q.choice1);
                                    $($('input[type=text][name=choice]')[1]).val(q.choice2);
                                    $($('input[type=text][name=choice]')[2]).val(q.choice3);
                                    $($('input[type=text][name=choice]')[3]).val(q.choice4);
                                    $($('input[type=text][name=choice]')[4]).val(q.choice5);
                                }
                                $('#lbl_ans_choice').text(q.ans_choice);
                            } else {
                                //อัตนัย
                            }
                            $('#lbl_bloom').text(bloomMap[q.bloom]);
                            $('#lbl_score').text(q.score);
                            $('#modal_question').modal('show');
                        });
                        var btn_del = $('<button>').addClass('btn btn-danger').append('<i class="fa fa-trash"></i>').click(function () {
                            $.confirm({
                                title: 'ยืนยัน!',
                                content: 'ท่านต้องการจะนำ ข้อสอบข้อนี้ ออกจากชุดข้อสอบชุดนี้หรือไม่!',
                                buttons: {
                                    'ยืนยัน': function () {
                                        delQuestionInExam(q.exam_detail_id);
                                    },
                                    'ยกเลิก': function () {
                                    }
                                }
                            });
                        });
                        //$('#show_question > tbody').append($('<tr>').append($('<td>', { text: q.question_text }), $('<td>', { text: (q.p_value == 0) ? 'N/A' : q.p_value }), $('<td>', { text: (q.r_value == 0) ? 'N/A' : q.r_value }), $('<td>').append(btn_info), $('<td>').append(btn_del)));
                        var r = $('<tr>').append($('<td>', { text: q.question_text }), $('<td>', { text: (q.p_value == 0) ? 'N/A' : q.p_value }), $('<td>', { text: (q.r_value == 0) ? 'N/A' : q.r_value }), $('<td>').append(btn_info), $('<td>').append(btn_del));
                        tbl_question.row.add(r).draw();
                    }
                });
            }
        });
    }

    function delQuestionInExam(exdid) {
        $.ajax({
            url: 'makeExam.aspx/delQuestionInExam',
            method: 'post',
            data: JSON.stringify({ ex_d_id: exdid }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                getQuestionInExam()
            }
        });
    }

    function delCopy() {
        var cop = $('input[type=number][name=numCopy]').val();
        $.ajax({
            url: 'MakeExam.aspx/delCopy',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: cop }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                $('input[type=number][name=numCopy]').val(1);
                getQuestionInExam();
            }
        });
    }

    $('#btn_addQuest').click(function () {
        mod = 1;
        $('#modal_question').modal('show');
    });
    $('#modal_question').on('show.bs.modal', function (e) {
        $('input[type=checkbox][name=quest_checkAll]').prop({ checked: false });
        if (mod == 1) {//เพิ่มโจทย์
            getQuestion();
            $('.quest_select').removeClass('d-none');
            $('.quest_detail').addClass('d-none');
            $('#btn_addSelectQuest,#btn_cancalSelectQuest').removeClass('d-none');
            $('#exampleModalLabel').text('เลือกโจทย์');
        } else if (mod == 2) {//ดูข้อมูลโจทย์
            $('.quest_select').addClass('d-none');
            $('.quest_detail').removeClass('d-none');
            $('#btn_addSelectQuest,#btn_cancalSelectQuest').addClass('d-none');
            $('#exampleModalLabel').text('ข้อมูลโจทย์');
        }
    });
    $('#modal_question').on('hide.bs.modal', function (e) {
        mod = 0;
    });
});