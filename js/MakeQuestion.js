var mod = 0;
$(document).ready(function () {
    $('.mainLink').removeClass('active');
    $($('.mainLink')[0]).addClass('active');
    var jc = $.dialog({
        closeIcon: false,
        lazyOpen: true,
        icon: 'fa fa-spinner fa-spin',
        title: 'Loading!',
        content: 'ระบบกำลังโหลดข้อมูล!'
    });
    var formData = new FormData();
    var quest = {
        question_id: 0,
        subject_id: 0,
        topic_id: 0,
        question_text: '',
        question_img: '',
        ans_type: 0,
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        choice5: '',
        ans_choice: 0,
        score: 0,
        p_value: 0,
        r_value: 0,
        bloom: 0
    };

    loadSubject();

    $('#select_subject').change(function () {
        loadTopic();
    });

    $('#quest_detail').on('show.bs.modal', function (e) {
        formData = new FormData();
        var a_Type = $('input[name=ans_type]:checked').val();
        $('#select_new_topic option[value=' + $('#select_topic').val() + ']').prop({ selected: true });
        if (a_Type == 0) {
            $('.pnl_c').removeClass('d-none');
        } else {
            $('.pnl_c').addClass('d-none');
        }

        if (mod == 1) {
            $('#btn_addSubmit').removeClass('d-none');
            $('#btn_editSubmit').addClass('d-none');
            initModal();
        } else if (mod == 2) {
            $('#select_new_topic option[value=' + $('#select_topic').val() + ']').prop({ selected: true });
            $('#btn_editSubmit').removeClass('d-none');
            $('#btn_addSubmit').addClass('d-none');
            $('#txt_question,input[name=choice]').removeClass('is-invalid');
            $('.rd_c').removeClass('alert-danger');
        }

    })

    $('#select_topic,input[name=ans_type]').change(function () {
        loadQuestion();
    });

    $('#txt_question,input[name=choice]').keyup(function () {
        if ($(this).val().length > 0) {
            $(this).removeClass('is-invalid');
        } else {
            $(this).addClass('is-invalid');
        }
    });

    $('input[type=file][name=quest_img]').change(function () {
        var file = $(this)[0].files[0];
        var preview = $('#pre_quest_img');
        var reader = new FileReader();
        reader.onload = function () {
            preview.attr('src', reader.result).removeClass('d-none');
            $('#clear_quest_img').removeClass('d-none');
            formData.append('quest_img', file);
        }
        reader.readAsDataURL(file);

    });

    $('input[type=file][name=ans_img]').change(function () {
        var file = $(this)[0].files[0];
        var r = $(this).parent().parent().parent();
        var txt = $('input[type=text][name=choice]');
        var preview = $(r).find('img');
        var btn_clear = $('button[name=clear_img]');
        var v = ($(r).find('span').html()).charAt(0);
        formData.delete('ans_img' + v);
        var reader = new FileReader();
        reader.onload = function () {
            txt.prop({ disabled: true }).removeClass('is-valid is-invalid').val('');
            txt.parent().addClass('d-none');
            $('div.div-img-choice').removeClass('d-none');
            preview.prop({ src: reader.result }).removeClass('d-none');
            btn_clear.removeClass('d-none');
            formData.append('ans_img' + v, file);
        }
        reader.readAsDataURL(file);
    });

    $('button[name=clear_img]').click(function () {
        $('div.div-img-choice').addClass('d-none');
        $('div.div-txt-choice').removeClass('d-none');
        var txt = $('input[type=text][name=choice]');
        txt.prop({ disabled: false }).addClass('is-valid is-invalid');
        $(this).addClass('d-none');
        $($('form')[1]).get(0).reset();
    });

    $('#clear_quest_img').click(function () {
        $('#pre_quest_img').addClass('d-none');
        $(this).addClass('d-none');
        $($('form')[0]).get(0).reset();
        quest.question_img = '';
    });

    $('input[type=radio][name=ans_choice]').click(function () {
        $('.rd_c').removeClass('alert-danger');
    });

    $('#btn_addSubmit,#btn_editSubmit').click(function () {
        addQuestion();
    });

    $('#txt_new_topic').keyup(function () {
        if ($(this).length > 0) {
            $(this).removeClass('is-invalid');
            $('#btn_submitAddTopic').removeClass('disabled').prop({ disabled: false });
            $('#btn_submitEditTopic').removeClass('disabled').prop({ disabled: false });
        } else {
            $(this).addClass('is-invalid');
            $('#btn_submitAddTopic').addClass('disabled').prop({ disabled: true });
            $('#btn_submitEditTopic').addClass('disabled').prop({ disabled: true });
        }
    });

    $('#btn_addTopic').click(function () {
        $('#btn_submitAddTopic').removeClass('d-none');
        $('#btn_submitEditTopic').addClass('d-none');
        $('#txt_new_topic').addClass('is-invalid').val('');
        $('#modal_man_topic').modal('show');
    });

    $('#btn_editTopic').click(function () {
        $('#btn_submitAddTopic').addClass('d-none');
        $('#btn_submitEditTopic').removeClass('d-none');
        $('#txt_new_topic').removeClass('is-invalid').val($('#select_topic option:selected').text());
        $('#modal_man_topic').modal('show');
    });

    $('#btn_submitAddTopic').click(function () {
        $(this).prop({ disabled: true });
        $.ajax({
            url: 'MakeQuestion.aspx/addTopic',
            method: 'post',
            data: JSON.stringify({ tname: $('#txt_new_topic').val(), sid: $('#select_subject').val() }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                $('#txt_new_topic').val('').addClass('is-invalid');
                $('#modal_man_topic').modal('hide');
                loadTopic();
            }
        });
    });

    $('#btn_submitEditTopic').click(function () {
        $(this).prop({ disabled: true });
        $.ajax({
            url: 'MakeQuestion.aspx/editTopic',
            method: 'post',
            data: JSON.stringify({ tid: $('#select_topic').val(), tname: $('#txt_new_topic').val() }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                $('#txt_new_topic').val('').addClass('is-invalid');
                $('#modal_man_topic').modal('hide');
                loadTopic();
            }
        });
    });

    function loadSubject() {
        jc.open();
        $.ajax({
            url: 'MakeQuestion.aspx/getSubjectByDept',
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                if ($(data.d).length == 0) {
                    jc.close();
                    $.confirm({
                        title: 'แจ้งเตือน!',
                        content: 'ท่านยังไม่มีข้อมูลรายวิชาในระบบ กดปุ่ม ทราบ เพื่อไปยังหน้าต่างเพิ่มรายวิชา!',
                        buttons: {
                            'ทราบ': function () {
                                window.location.replace('./Subject.aspx');
                            }
                        }
                    });
                }
                $(data.d).each(function (i, subject) {
                    $('#select_subject').append($('<option>', { text: subject.subject_name, value: subject.subject_id }));
                });
                loadTopic();
            }
        });
    }

    function loadTopic() {
        jc.open();
        var sub_id = $('#select_subject').val();
        $('#select_topic,#select_new_topic').empty();
        $.ajax({
            url: 'MakeQuestion.aspx/getTopicBySubject',
            method: 'post',
            data: JSON.stringify({ sid: sub_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                if ($(data.d).length == 0) {
                    $('#show_quest > tbody').empty();
                    $('#show_quest > tbody').append($('<tr>').append($('<td>', { text: 'ไม่มีข้อมูลในระบบ', colspan: '5' }).addClass('text-center')));
                    jc.close();
                    $.confirm({
                        title: 'แจ้งเตือน!',
                        content: 'ท่านยังไม่มีข้อมูลหัวข้อเรื่องในระบบ กดปุ่ม ทราบ เพื่อเพิ่ม หัวข้อเรื่อง!',
                        buttons: {
                            'ทราบ': function () {
                                $('#btn_addTopic').click();
                            }
                        }
                    });
                } else {
                    $(data.d).each(function (i, topic) {
                        $('#select_topic,#select_new_topic').append($('<option>', { text: topic.topic_name, value: topic.topic_id }));
                    });
                    loadQuestion();
                }
            },
            complete: function () {
                jc.close();
            }
        });
    }

    function loadQuestion() {
        jc.open();
        var sub_id = $('#select_subject').val();
        var top_id = $('#select_topic').val();
        var ans_t = $('input[name=ans_type]:checked').val();
        $.ajax({
            url: 'MakeQuestion.aspx/getQuestion',
            method: 'post',
            data: JSON.stringify({ sid: sub_id, tid: top_id, at: ans_t }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $('#show_quest > tbody').empty();
                if ($(data.d).length == 0) {
                    $('#show_quest > tbody').append($('<tr>').append($('<td>', { text: 'ไม่มีข้อมูลในระบบ', colspan: '5' }).addClass('text-center')));
                } else {
                    $(data.d).each(function (i, q) {
                        var btn_edit = $('<button>').addClass('btn btn-warning').append('<i class="fa fa-pencil"></i>').click(function () {
                            mod = 2;
                            quest.question_id = q.question_id;
                            $("#txt_question").val(q.question_text);
                            if (q.question_img != null) {
                                $('#pre_quest_img').attr('src', q.question_img).removeClass('d-none');
                                $('#clear_quest_img').removeClass('d-none');
                                quest.question_img = '';
                            } else {
                                $('#pre_quest_img').addClass('d-none');
                                $('#clear_quest_img').addClass('d-none');
                            }
                            if (q.ans_type == 0) {
                                var tmp = q.choice1.split(".");
                                tmp = tmp[(tmp.length - 1)];
                                if (tmp == 'jpg' || tmp == 'jpeg' || tmp == 'png' || tmp == 'gif') {
                                    $('input[type=text][name=choice]').prop({ disabled: true }).val('');
                                    $('div.div-img-choice').removeClass('d-none');
                                    $('div.div-txt-choice').addClass('d-none');
                                    $($('.pre_ans_img')[0]).attr('src', q.choice1);
                                    $($('.pre_ans_img')[1]).attr('src', q.choice2);
                                    $($('.pre_ans_img')[2]).attr('src', q.choice3);
                                    $($('.pre_ans_img')[3]).attr('src', q.choice4);
                                    $($('.pre_ans_img')[4]).attr('src', q.choice5);
                                    $('button[name=clear_img]').removeClass('d-none');
                                } else {
                                    $('div.div-img-choice').addClass('d-none');
                                    $('div.div-txt-choice').removeClass('d-none');
                                    $('input[type=text][name=choice]').prop({ disabled: false });
                                    $($('input[type=text][name=choice]')[0]).val(q.choice1);
                                    $($('input[type=text][name=choice]')[1]).val(q.choice2);
                                    $($('input[type=text][name=choice]')[2]).val(q.choice3);
                                    $($('input[type=text][name=choice]')[3]).val(q.choice4);
                                    $($('input[type=text][name=choice]')[4]).val(q.choice5);
                                }
                                $('input[type=radio][name=ans_choice][value=' + q.ans_choice + ']').prop({ checked: true });
                            } else {
                                //ข้อสอบอัตนัย
                            }
                            $('#select_bloom > option[value=' + q.bloom + ']').prop({ selected: true });
                            $('#num_score').val(q.score);
                            quest.score = q.score;
                            $('#quest_detail').modal('show');

                        });

                        var btn_del = $('<button>').addClass('btn btn-danger').append('<i class="fa fa-eraser"></i>').click(function () {
                            delQuestion(q);
                        });

                        var row = $('<tr>').append($('<td>', { text: q.question_text }), $('<td>', { text: (q.p_value == '') ? 'N/A' : q.p_value }), $('<td>', { text: (q.r_value == '') ? 'N/A' : q.r_value }), $('<td>').append(btn_edit), $('<td>').append(btn_del));

                        $('#show_quest > tbody').append(row);
                    });
                }
            },
            error: function () {
                $('#show_quest > tbody').empty();
                $('#show_quest > tbody').append($('<tr>').append($('<td>', { text: 'ไม่มีข้อมูลในระบบ', colspan: '5' }).addClass('text-center')));
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

    function addQuestion() {
        quest.subject_id = $('#select_subject').val();
        quest.topic_id = $('#select_new_topic').val();
        quest.ans_type = $('input[name=ans_type]:checked').val();
        quest.question_text = $('#txt_question').val();
        quest.question_img = '';
        if (quest.ans_type == 0) {
            var valid = true;
            if ($('input[type=text][name=choice]:disabled').length == 5) {
                var ans_i = $('input[type=file][name=ans_img]');
                var ck = 0 + ($($(ans_i[0]).get(0).files[0]).length) + ($($(ans_i[1]).get(0).files[0]).length) + ($($(ans_i[2]).get(0).files[0]).length) + ($($(ans_i[3]).get(0).files[0]).length) + ($($(ans_i[4]).get(0).files[0]).length);
                if (mod == 1 && ck < 5) {
                    $.alert('ท่านจำเป็นต้อง อัพโหลดไฟล์คำตอบให้ครบถ้วน!');
                    valid = false;
                } else if (mod == 2) {
                    var ans_pre = $('.pre_ans_img');
                    if (!formData.has('quest_img')) {
                        var tmp = $('#pre_quest_img').attr('src').split('/');
                        quest.question_img = tmp[3];
                    }
                    if (!formData.has('ans_img1')) {
                        var tmp = $($(ans_pre)[0]).attr('src').split('/');
                        quest.choice1 = tmp[3];
                    }
                    if (!formData.has('ans_img2')) {
                        var tmp = $($(ans_pre)[1]).attr('src').split('/');
                        quest.choice2 = tmp[3];
                    }
                    if (!formData.has('ans_img3')) {
                        var tmp = $($(ans_pre)[2]).attr('src').split('/');
                        quest.choice3 = tmp[3];
                    }
                    if (!formData.has('ans_img4')) {
                        var tmp = $($(ans_pre)[3]).attr('src').split('/');
                        quest.choice4 = tmp[3];
                    }
                    if (!formData.has('ans_img5')) {
                        var tmp = $($(ans_pre)[4]).attr('src').split('/');
                        quest.choice5 = tmp[3];
                    }
                }

            } else {
                quest.choice1 = $($('input[type=text][name=choice]')[0]).val();
                quest.choice2 = $($('input[type=text][name=choice]')[1]).val();
                quest.choice3 = $($('input[type=text][name=choice]')[2]).val();
                quest.choice4 = $($('input[type=text][name=choice]')[3]).val();
                quest.choice5 = $($('input[type=text][name=choice]')[4]).val();
            }
            if ($('input[type=text][name=choice]').hasClass('is-invalid') || $('.rd_c').hasClass('alert-danger')) {
                $.alert('ท่านจำเป็นต้องกรอกข้อมูลให้ครบถ้วน!');
                valid = false;
            }
            quest.ans_choice = $('input[type=radio][name=ans_choice]:checked').val();
        } else {
            quest.choice1 = '';
            quest.choice2 = '';
            quest.choice3 = '';
            quest.choice4 = '';
            quest.choice5 = '';
        }
        quest.bloom = $('#select_bloom').val();
        quest.score = $('#num_score').val();
        formData.append('mod', mod);
        formData.append('obj', JSON.stringify(quest));
        $('#quest_detail').modal('hide');

        if (valid) {
            var saving = $.dialog({
                closeIcon: false,
                icon: 'fa fa-spinner fa-spin',
                title: 'Processing!',
                content: 'ระบบกำลังบันทึกข้อมูล!'
            });
            $.ajax({
                url: 'MakeQuestionHandler.ashx',
                method: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function () {
                    formData = new FormData();
                    loadQuestion();
                },
                complete: function () {
                    saving.close();
                }
            });
        }
    }

    function delQuestion(quest) {
        $.confirm({
            title: 'แจ้งเตือน!',
            content: 'ท่านต้องการจะลบโจทย์นี้ ใช่ หรือ ไม่!',
            buttons: {
                'ใช่': function () {
                    $.ajax({
                        url: 'MakeQuestion.aspx/delQuestion',
                        method: 'post',
                        data: JSON.stringify({ q: quest }),
                        contentType: 'application/json;charset=utf-8',
                        success: function () {
                            loadQuestion();
                        }
                    });
                },
                'ยกเลิก': function () {

                }
            }
        });
    }

    function initModal() {
        $('div.div-txt-choice').removeClass('d-none');
        $('div.div-img-choice').addClass('d-none');
        $('#txt_question,input[name=choice]').addClass('is-valid is-invalid').val('').prop({ disabled: false });
        $('#pre_quest_img').addClass('d-none');
        $('#clear_quest_img').addClass('d-none');
        $($('form')[0]).get(0).reset();
        $($('form')[1]).get(0).reset();
        $('#clear_img').addClass('d-none');
        $('input[type=radio][name=ans_choice]:checked').prop({ checked: false });
        $('.rd_c').addClass('alert-danger')
        $('#num_score').val(1);
        quest.subject_id = 0;
        quest.topic_id = 0;
        quest.question_text = '';
        quest.question_img = '';
        quest.ans_type = 0;
        quest.choice1 = '';
        quest.choice2 = '';
        quest.choice3 = '';
        quest.choice4 = '';
        quest.choice5 = '';
        quest.ans_choice = 0;
        quest.p_value = 0;
        quest.r_value = 0;
        quest.bloom = 0;
    }

});
