$(document).ready(function () {
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
    $(document).ajaxStop(function () {
        jc.close();
    });
    initPage();
    //getQuestion(20, 1);
    function initPage() {
        var obj = Cookies.getJSON("obj");

        if ($(obj).length == 0) window.location.replace('StudentLogin.aspx');

        $('#lbl_stu_id').text(obj.student_id);
        var fullName = '';
        if (obj.student_type == 1) {
            fullName = 'นรพ.&nbsp;' + obj.student_fname + '&emsp;' + obj.student_lname;
        } else if (obj.student_type == 2) {
            fullName = 'นรช.&nbsp;' + obj.student_fname + '&emsp;' + obj.student_lname;
        } else if (obj.student_type == 3) {
            fullName = 'นทน.&nbsp;' + obj.student_fname + '&emsp;' + obj.student_lname;
        }
        $('#lbl_stu_name').html(fullName);
        $('#lbl_year').text(obj.year);
        $('#lbl_term').text((obj.term > 2) ? 'ภาคฤดูร้อน' : 'ภาคการศึกษาที่ ' + obj.term);
        $('#lbl_sub').text(obj.subject_name);
        $('#lbl_date').text(moment(obj.exam_start_time).format('DD/MM/Y'));
        $('#lbl_startTime').text(moment(obj.exam_start_time).format('HH:mm'));
        $('#lbl_endTime').text(moment(obj.exam_end_time).format('HH:mm'));

        $('#clock').countdown(moment(obj.exam_end_time).format('Y/MM/DD HH:mm:ss'))
            .on('update.countdown', function (event) {
                var format = '%H:%M:%S';
                $(this).html(event.strftime(format));
            })
            .on('finish.countdown', function (event) {
                $(this).html('00:00:00')
                    .parent().parent().addClass('alert-danger');

            });
        getNumCopy(obj.exam_id);
    }


    $('#btn_finish').click(function () {
        $(this).prop({ disabled: true });
        sendAnswer();
    });

    function getNumCopy(exam_id) {
        $.ajax({
            url: 'Test.aspx/getNumCopy',
            method: 'post',
            data: JSON.stringify({ ex_id: exam_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var numCopy = data.d;
                var copy = Math.floor(Math.random() * numCopy) + 1;
                getQuestion(exam_id, copy);
            }
        });
    }

    function sendAnswer() {
        var totalQuest = $('#pnl_quest > .card-body').length;
        for (var i = 0; i < totalQuest; i++) {
            //Check answer type
            var ans = $('#pnl_quest > .card-body')[i];
            if ($(ans).find('textarea').length == 0) {
                //Choice
                var ans_choice = $(ans).find('input[type=radio]:checked');
                if (ans_choice.length == 0) {
                    //นักเรียนไม่ตอบ 0 คะแนนไปเลยไม่ต้องเช็ค
                    addZeroPoint($(ans).find('input[type=radio]').attr('name'));
                } else {
                    addPointOfAnsChoice(ans_choice.attr('name'), ans_choice.val());
                }
            } else {
                //Explain
                var ans_explain = $(ans).find('textarea');
                addAnsExplain(ans_explain.attr('name'), ans_explain.val());
            }
        }
        var obj = Cookies.getJSON("obj");
        $.ajax({
            url: 'Test.aspx/getReportScore',
            method: 'post',
            data: JSON.stringify({ ex_id: obj.exam_id, stu_id: parseInt($('#lbl_stu_id').text()) }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var p = '';
                var totalScore = 0;
                $(data.d).each(function (i, report) {
                    p += report.topic_name + ' ' + report.sumScore + ' จาก ' + report.maxScore + ' คะแนน <br />';
                    totalScore += report.sumScore;
                });
                $.alert({
                    title: 'ผลสอบอัตนัย!',
                    content: p + 'รวมทั้งหมด ' + totalScore + ' คะแนน',
                    buttons: {
                        Okay: function () {
                            Cookies.remove('obj');
                            window.location.replace('StudentLogin.aspx');
                        }
                    }
                });
            },
            error: function (err) {
                $.confirm({
                    title: 'Error!',
                    content: 'การส่งข้อสอบ ล้มเหลว! กรุณากดส่ง ข้อสอบอีกครั้ง',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        Okey: {
                            text: 'ทราบ',
                            btnClass: 'btn-red',
                            action: function () {
                                $('#btn_finish').prop({ disabled: false });
                            }
                        }
                    }
                });
            }
        });
    }

    function addPointOfAnsChoice(exam_detail_id, ans_c) {
        $.ajax({
            url: 'Test.aspx/addPointOfAnsChoice',
            method: 'post',
            async: false,
            data: JSON.stringify({ stu_id: parseInt($('#lbl_stu_id').text()), exd_id: exam_detail_id, ac: ans_c }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
            }
        });
    }

    function addZeroPoint(exam_detail_id) {
        $.ajax({
            url: 'Test.aspx/addZeroPoint',
            method: 'post',
            async: false,
            data: JSON.stringify({ stu_id: parseInt($('#lbl_stu_id').text()), exd_id: exam_detail_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
            }
        });
    }

    function addAnsExplain(exam_detail_id, ans_x) {
        $.ajax({
            url: 'Test.aspx/addAnsExplain',
            method: 'post',
            async: false,
            data: JSON.stringify({ stu_id: parseInt($('#lbl_stu_id').text()), exd_id: exam_detail_id, ax: ans_x }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
            }
        });
    }

    function getQuestion(exam_id, copy) {
        $.ajax({
            url: 'Test.aspx/getQuestionToTest',
            method: 'post',
            data: JSON.stringify({ ex_id: exam_id, ex_copy: copy }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $('#pnl_quest > .card-body').remove();
                var totalQuest = 0;
                var curentPage = 0;
                $(data.d).each(function (i, q) {
                    var div_body = $('<div>').addClass('card-body d-none');
                    var title = $('<h4>', { text: 'ข้อที่ ' + (i + 1) + '.' }).addClass('card-title');
                    div_body.append(div_body, title);
                    if (q.question_img != '') {
                        var quest_img = $('<img>', { src: q.question_img });
                        div_body.append(quest_img);
                    }
                    var p = $('<p>', { text: q.question_text }).addClass('card-text');
                    div_body.append(p);
                    if (q.ans_type == 0) {
                        var tmp = q.choice1.split(".");
                        tmp = tmp[(tmp.length - 1)];
                        if (tmp == 'jpg' || tmp == 'jpeg' || tmp == 'png' || tmp == 'gif') {
                            for (var j = 1; j <= 5; j++) {
                                var input_group = $('<div>').addClass('input-group my-2').append($('<span>').addClass('input-group-addon').append($('<input>', { name: q.exam_detail_id, type: 'radio', value: j })), $('<img class="img-thumbnail" src="' + q["choice" + j] + '" />'));
                                div_body.append(input_group);
                            }
                        } else {
                            for (var j = 1; j <= 5; j++) {
                                var input_group = $('<div>').addClass('input-group my-2').append($('<span>').addClass('input-group-addon').append($('<input>', { name: q.exam_detail_id, type: 'radio', value: j })), $('<input  type="text" class="form-control" value="' + q["choice" + j] + '" readonly/>'));
                                div_body.append(input_group);
                            }
                        }
                    } else {
                        //อัตนัย
                        div_body.append($('<textarea name="' + q.exam_detail_id + '" class="form-control" rows="10"></textarea>'));
                    }
                    $('#pnl_quest > .card-footer').before(div_body);
                    totalQuest = i;
                    $('.forgot').append($('<div>', { text: i + 1 }).addClass('alert alert-warning mx-1 forgot-list d-none').css({ cursor: 'pointer' }));
                });
                changeQuest(totalQuest + 1);
                exid = exam_id;
                excopy = copy;
            }
        });
    }
    function changeQuest(totalQuest) {
        var currQuest = 0;
        var quest = $('.card-body');

        $('div.forgot-list').click(function () {
            ckEmptyAns(currQuest);
            currQuest = ($(this).text()) - 1;
            $(quest).addClass('d-none');
            $(quest).eq(currQuest).removeClass('d-none');
        });
        $(quest).eq(0).removeClass('d-none');
        $('#btn_preQuest,#btn_nextQuest').click(function () {
            ckEmptyAns(currQuest);
            var btn_Id = $(this).attr('id');
            if (btn_Id == 'btn_preQuest') {
                $(quest).addClass('d-none');
                $(quest).eq(--currQuest).removeClass('d-none');
            } else {
                $(quest).addClass('d-none');               
                $(quest).eq(++currQuest).removeClass('d-none');
            }

            if (currQuest == 0) {
                $(this).addClass('d-none');
            } else if (currQuest == (totalQuest - 1)) {
                $(this).addClass('d-none');
            } else {
                $('#btn_preQuest').removeClass('d-none');
                $('#btn_nextQuest').removeClass('d-none');
            }
        });
    }

    function ckEmptyAns(currQuest) {
        var ans = $('#pnl_quest > .card-body')[currQuest];
        if ($(ans).find('textarea').length == 0) {
            //Choice
            var ans_choice = $(ans).find('input[type=radio]:checked');
            if (ans_choice.length == 0) {
                $('div.forgot-list').eq(currQuest).removeClass('d-none');
            } else {
                $('div.forgot-list').eq(currQuest).addClass('d-none');
            }
        } else {
            //Explain
            var ans_explain = $(ans).find('textarea');
            if (ans_explain.val().length == 0) {
                $('div.forgot-list').eq(currQuest).removeClass('d-none');
            }
        }
    }
});

