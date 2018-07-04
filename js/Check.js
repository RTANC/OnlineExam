$(document).ready(function () {
    $('.mainLink').removeClass('active');
    $($('.mainLink')[1]).addClass('active');
    var bloomMap = ['ยังไม่กำหนด', 'ความรู้ที่เกิดจากความจำ', 'ความเข้าใจ', 'การประยุกต์', 'การวิเคราะห์', 'การสังเคราะห์', 'การประเมินค่า'];
    var jc = $.dialog({
        closeIcon: false,
        lazyOpen: true,
        icon: 'fa fa-spinner fa-spin',
        title: 'Loading!',
        content: 'ระบบกำลังโหลดข้อมูล!'
    });
    var fullScore = [];
    $(document).ajaxStart(function () {
        jc.open();
    });
    var tbl_student = $('#show_student').DataTable({
        "language": {
            "url": "language/Thai.json"
        }
    });
    var tbl_analysis = $('#show_analysis').DataTable({
        'rowsGroup': [0],
        "language": {
            "url": "language/Thai.json"
        }
    });
    $(document).ajaxStop(function () {
        jc.close();
    });

    getExam();
    getFullScore();

    //getTotalScore();
    $('#select_exam_copy').change(function () {
        getExamAnalysis();
        getStatEval();
        getKr();
    });

    $('#btn_gotoSchedule').click(function () {
        Cookies.remove('ex_id');
        window.location.replace('MakeSchedule.aspx');
    });

    $.ajax({
        url: 'Check.aspx/getExamCopy',
        method: 'post',
        data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
        dataType: 'json',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            if ($(data.d).length > 0) {
                $('#btn_exam_analysis').removeClass('d-none');
                $(data.d).each(function (i, ex_copy) {
                    $('#select_exam_copy').append($('<option>', { text: ex_copy, value: ex_copy }));
                });
                getKr()
                getExamAnalysis();
                getStatEval();
            }
        }
    });

    $('#btn_exam_analysis').click(function () {
        $.ajax({
            url: 'Check.aspx/calExamAnalysis',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: $('#select_exam_copy option:selected').val() }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                $('#btn_exam_analysis').addClass('d-none');
                getExamAnalysis();
                getStatEval();
            }
        });
    });

    $('#btn_saveScore').click(function () {
        var input_score = $('#pnl_quest > .card-body > input[type=number]');
        for (var i = 0; i < $(input_score).length; i++) {
            var answer_id = $(input_score).attr('name');
            var score = $(input_score).va();
            $.ajax({
                url: 'Check.aspx/updateExplainPoint',
                method: 'post',
                data: JSON.stringify({ ans_id: answer_id, p: score }),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function () {
                    getTotalScore();
                    $('#check_explain').modal('show');
                }
            });
        }
    });

    function getFullScore() {
        $.ajax({
            url: 'Check.aspx/getFullScore',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $(data.d).each(function (i, fs) {
                    fullScore.push({
                        topic_name: fs.topic_name,
                        fullScore: fs.fullScore
                    });
                    $('#show_student > thead > tr').append($('<th>', { html: fs.topic_name + '&nbsp;(' + fs.fullScore + ')&nbsp;' }).addClass('text-center'));
                });
                getFullReport();
            }
        });
    }

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
                $('#lbl_exam_gain').text(exam.exam_gain);
            }
        });
    }

    function getKr() {
        $.ajax({
            url: 'MakeExam.aspx/getKr',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: $('#select_exam_copy option:selected').val()}),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var exam = $(data.d)[0];
                $('#lbl_year').text(exam.year);
                $('#lbl_term').text((exam.term > 2) ? 'ภาคฤดูร้อน' : 'ภาคการศึกษาที่ ' + exam.term);
                $('#lbl_subject').text(exam.subject_name);
                $('#lbl_date').text(moment(exam.exam_start_time).format('DD/MM/YYYY'));
                $('#lbl_time').text(moment(exam.exam_start_time).format('HH:mm') + ' ถึง ' + moment(exam.exam_end_time).format('HH:mm'));
                $('#lbl_exam_gain').text(exam.exam_gain);
            }
        });
    }

    //function getTotalScore() {
    //    $.ajax({
    //        url: 'Check.aspx/getTotalScore',
    //        method: 'post',
    //        data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
    //        dataType: 'json',
    //        contentType: 'application/json;charset=utf-8',
    //        success: function (data) {
    //            getTotalQuest(data.d);
    //        }
    //    });
    //}

    //function getTotalQuest(totalScore) {
    //    $.ajax({
    //        url: 'Check.aspx/getTotalQuest',
    //        method: 'post',
    //        data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
    //        dataType: 'json',
    //        contentType: 'application/json;charset=utf-8',
    //        success: function (data) {
    //            getStudentPoint(totalScore, data.d);
    //        }
    //    });
    //}

    function getFullReport() {
        $.ajax({
            url: 'Check.aspx/getFullReport',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id') }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                tbl_student.clear();
                var obj = JSON.parse(data.d);
                var gain = parseInt($('#lbl_exam_gain').text()) / 100;
                $(obj).each(function (i, stu) {
                    //var btn_info = $('<button>').addClass('btn btn-info').append($('<i class="fa fa-list-alt"></i>')).click(function () {
                    //    $.ajax({
                    //        url: 'Test.aspx/getReportScore',
                    //        method: 'post',
                    //        data: JSON.stringify({ ex_id: Cookies.get('ex_id'), stu_id: stu.student_id }),
                    //        dataType: 'json',
                    //        contentType: 'application/json;charset=utf-8',
                    //        success: function (data) {
                    //            var p = '';
                    //            var totalScore = 0;
                    //            $(data.d).each(function (i, report) {
                    //                p += report.topic_name + ' ' + report.sumScore + ' จาก ' + report.maxScore + ' คะแนน <br />';
                    //                totalScore += report.sumScore;
                    //            });
                    //            $.alert({
                    //                title: 'ผลสอบอัตนัย!',
                    //                content: p + 'รวมทั้งหมด ' + totalScore + ' คะแนน'
                    //            });
                    //        }
                    //    });
                    //});
                    //var btn_check = $('<button>').addClass('btn btn-warning').append($('<i class="fa fa-check"></i>')).click(function () {
                    //    getQuestion(Cookies.get('ex_id'), stu.student_id);
                    //    $('#check_explain').modal('show');
                    //});
                    //if (totalQuest == stu.checked) $(btn_check).prop({ disabled: true }).css('cursor', 'not-allowed');
                    var fullName = '';
                    if (stu.student_type == 1) {
                        fullName = 'นรพ.&emsp;' + stu.student_fname + '&emsp;&emsp;&emsp;&emsp;&emsp;' + stu.student_lname;
                    } else if (stu.student_type == 2) {
                        fullName = 'นรช.&emsp;' + stu.student_fname + '&emsp;&emsp;&emsp;&emsp;&emsp;' + stu.student_lname;
                    } else if (stu.student_type == 3) {
                        fullName = 'นทน.&emsp;' + stu.student_fname + '&emsp;&emsp;&emsp;&emsp;&emsp;' + stu.student_lname;
                    }
                    var row = $('<tr>').append($('<td>', { text: stu.student_id }).addClass('text-center'), $('<td>', { html: fullName }));
                    for (var j = 0; j < fullScore.length; j++) {
                        var p = stu[fullScore[j].topic_name];
                        var td = $('<td>', { text: p }).addClass('text-center w-25');
                        (p < (fullScore[j].fullScore * gain)) ? td.addClass('text-danger') : td;
                        $(row).append(td);
                    }
                    if (stu.examinee_check == 0) $(row).addClass('alert alert-danger');
                    tbl_student.row.add(row);
                });
                tbl_student.draw();
                var ExportButtons = document.getElementById('show_student');
                var instance = new TableExport(ExportButtons, {
                    formats: ['xlsx'],
                    exportButtons: false,
                    filename: 'รายงานคะแนนสอบ'
                });
                //                                        // "id" of selector    // format
                var exportData = instance.getExportData()['show_student']['xlsx'];
                $('#btn_ReportScore').removeClass('d-none').click(function () {
                    instance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
                });

            }
        });
    }

    function getQuestion(exam_id, student_id) {
        $.ajax({
            url: 'Check.aspx/getAnsExplain',
            method: 'post',
            data: JSON.stringify({ ex_id: exam_id, stu_id: student_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $('#pnl_quest > .card-body').remove();
                var totalQuest = 0;
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
                    div_body.append($('<textarea class="form-control" rows="10"></textarea>'));
                    div_body.append($('<label>', { html: 'คะแนนเต็ม : ' + q.score + '<br/>' }));
                    div_body.append($('div>').addClass('input-group').append($('<span class="input-group-addon">ลงคะแนน</span>'), $('<input name="' + q.answersheet_id + '" class="form-control" type="number" min="0" value="0" />')));
                    $('#pnl_quest > .card-footer').before(div_body);
                    totalQuest = i;
                });
            }
        });
    }

    function changeQuest(totalQuest) {
        var currQuest = 0;
        var quest = $('.card-body');
        $(quest).eq(0).removeClass('d-none');
        $('#btn_preQuest,#btn_nextQuest').click(function () {
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

    function getExamAnalysis() {
        $.ajax({
            url: 'Check.aspx/getExamAnalysis',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: $('#select_exam_copy option:selected').val() }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                tbl_analysis.clear();
                if ($(data.d).length == 0) {
                    $('#btn_exam_analysis').removeClass('d-none');
                    //$('#show_analysis > tbody').append('<tr><td class="text-center" colspan= "8">ไม่มีข้อมูลในระบบ</td></tr>');
                } else {
                    $('#btn_exam_analysis').addClass('d-none');
                    $(data.d).each(function (i, ea) {
                        var row = $('<tr>').append($('<td>').addClass('text-center').append($('<a>', { text: ea.question_id, href: '#!' }).addClass('btn btn-link').click(function () {
                            questionMoreDetail($(this).text());
                        })), $('<td>', { text: ea.choice }).addClass('text-center'), $('<td>', { text: ea.h }).addClass('text-center'), $('<td>', { text: ea.l }).addClass('text-center'), $('<td>', { text: ea.ph }).addClass('text-center'), $('<td>', { text: ea.pl }).addClass('text-center'), $('<td>', { text: ea.p }).addClass('text-center'), $('<td>', { text: ea.r }).addClass('text-center'));
                        //if (((i + 1) % 5) == 1) {
                        //    $(row).append($('<td>', { rowspan: 5 }).addClass('text-center').append($('<a>', { text: ea.question_id, href: '#!' }).addClass('btn btn-link').click(function () {
                        //        questionMoreDetail($(this).text());
                        //    })));
                        //}
                        //$(row).append($('<td>', { text: ea.choice }).addClass('text-center'), $('<td>', { text: ea.h }).addClass('text-center'), $('<td>', { text: ea.l }).addClass('text-center'), $('<td>', { text: ea.ph }).addClass('text-center'), $('<td>', { text: ea.pl }).addClass('text-center'), $('<td>', { text: ea.p }).addClass('text-center'), $('<td>', { text: ea.r }).addClass('text-center'));
                        if (ea.key_choice == '1') {
                            $(row).find('td[rowspan!=5]').addClass('table-success');
                        }
                        //$('#show_analysis > tbody').append(row);
                        tbl_analysis.row.add(row);
                    });
                    tbl_analysis.draw().order([0, 'desc']);
                }

            }
        });
    }

    function questionMoreDetail(quest_id) {
        $.ajax({
            url: 'Check.aspx/getQuestionById',
            method: 'post',
            data: JSON.stringify({ qid: quest_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $(data.d).each(function (i, q) {
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
            }
        });
    }

    function getStatEval() {
        $.ajax({
            url: 'Evaluate.aspx/getStatEval',
            method: 'post',
            data: JSON.stringify({ ex_id: Cookies.get('ex_id'), ex_copy: $('#select_exam_copy').val() }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                var obj = JSON.parse(data.d);
                $('#show_sumation > tbody').empty();
                $(obj).each(function (i, stat) {
                    $('#show_sumation > tbody').append($('<tr>').append($('<td>', { text: stat.type }), $('<td>', { text: stat.mean }), $('<td>', { text: stat.minimum }), $('<td>', { text: stat.maximum }), $('<td>', { text: stat.sd })));
                });
                if ($(obj).length == 0) {
                    $('#show_sumation > tbody').append('<tr><td colspan="5" class="text-center">ไม่มีข้อมูลที่จะแสดง</td></tr>');
                }
            }
        });
    }
});