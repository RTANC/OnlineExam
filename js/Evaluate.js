$(document).ready(function () {
    $('.mainLink').removeClass('active').addClass('d-none');
    $($('.mainLink')[3]).addClass('active').removeClass('d-none');
    $('#txt_year').val(parseInt(moment().format('YYYY')) + 543);
    $('#show_exam').DataTable({
        "language": {
            "url": "language/Thai.json"
        }
    });
    var conType = 'application/json;charset=utf-8';
    getSubject();
    $('#txt_year').keyup(function () {
        if ($(this).val().length == 4) {
            getSubject();
            $('#show_exam > tbody').empty();
        }
    });
    $('#txt_year,input[type=radio][name=term]').change(function () {
        getSubject();
        $('#show_exam > tbody').empty();
    });
    function getSubject() {
        $.ajax({
            url: 'Evaluate.aspx/getSubject',
            method: 'post',
            data: JSON.stringify({ y: $('#txt_year').val(), t: $('input[type=radio][name=term]:checked').val() }),
            dataType: 'json',
            contentType: conType,
            success: function (data) {
                var obj = JSON.parse(data.d);
                $('div.dropdown-menu.scrollable-menu').empty();
                $(obj).each(function (i, sub) {
                    $('div.dropdown-menu.scrollable-menu').append($('<a>', { href: '#', text: sub.subject_name, value: sub.subject_id }).addClass('dropdown-item').click(function () {
                        getExamBySubject(sub.subject_id);
                    }));
                });
            }
        });
    }

    function getExamBySubject(sub_id) {
        $.ajax({
            url: 'Evaluate.aspx/getExam',
            method: 'post',
            data: JSON.stringify({ y: $('#txt_year').val(), t: $('input[type=radio][name=term]:checked').val(), sid: sub_id }),
            dataType: 'json',
            contentType: conType,
            success: function (data) {
                var obj = JSON.parse(data.d);
                $('#show_exam > tbody').empty();
                $(obj).each(function (i, ex) {
                    var btn_info = $('<button>').attr({ 'data-toggle': 'modal', 'data-target': '#modal_Examinfo', 'data-exid': ex.exam_id }).addClass('btn btn-info').append('<i class="fa fa-search"></i>');
                    $('#show_exam > tbody').append($('<tr>').append($('<th>', { text: (i + 1), scope: 'row' }), $('<td>', { text: ex.subject_no }), $('<td>', { text: ex.subject_name }), $('<td>').append($(btn_info))));
                });
                //$('#show_exam').DataTable();
            }
        });
    }

    function getNumQuest(exam_id) {
        $.ajax({
            url: 'Evaluate.aspx/getNumQuest',
            method: 'post',
            data: JSON.stringify({ ex_id: exam_id, ex_copy: $('#select_exam_copy').val() }),
            dataType: 'json',
            contentType: conType,
            success: function (data) {
                var obj = JSON.parse(data.d);
                $('#numQuest').text(obj[0].numQuest);
            }
        });
    }
    $('#modal_Examinfo').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var exam_id = button.data('exid');
        $.ajax({
            url: 'Check.aspx/getExamCopy',
            method: 'post',
            data: JSON.stringify({ ex_id: exam_id }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $('#select_exam_copy').empty();
                if ($(data.d).length > 0) {
                    $('#btn_exam_analysis').removeClass('d-none');
                    $(data.d).each(function (i, ex_copy) {
                        $('#select_exam_copy').append($('<option>', { text: ex_copy, value: ex_copy }));
                    });
                    getNumQuest(exam_id);
                } else {
                    $('#numQuest').text('N/A');
                }
            }
        });
    })

});