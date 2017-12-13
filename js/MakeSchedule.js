var exam = {
    exam_id: 0,
    year: 0,
    term: 0,
    subject_id: 0,
    exam_start_time: 0,
    exam_end_time: 0,
    kr_value: 0,
    exam_gain: 0
};
var allExam = [];
$(document).ready(function () {
    $('.mainLink').removeClass('active');
    $($('.mainLink')[1]).addClass('active');
    var jc;
    getSubjectByDept();
    $('#btn_addExam').on('click', function () {
        var btn = $(this);
        btn.prop({ disabled: true });
        exam.year = $('#txt_year').val();
        exam.term = $('input[name=term]:checked').val();
        exam.subject_id = $('#select_subject').val();
        exam.kr_value = 0;
        exam.exam_gain = $('#txt_exGain').val();
        console.log(exam);
        $.ajax({
            url: 'MakeSchedule.aspx/addExam',
            method: 'post',
            data: JSON.stringify({ ex: exam }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                $('#modal_addExam').modal('hide');
                btn.prop({ disabled: true });
                $('#calendar').fullCalendar('changeView', 'month');
                $('#calendar').fullCalendar('refetchEvents');
            }
        });
    });
    $('#btn_submitEditExam').on('click', function () {
        exam.year = $('#txt_year').val();
        exam.term = $('input[name=term]:checked').val();
        exam.subject_id = $('#select_subject').val();
        exam.kr_value = 0;
        exam.exam_gain = $('#txt_exGain').val();
        console.log(exam);
        $.ajax({
            url: 'MakeSchedule.aspx/editExam',
            method: 'post',
            data: JSON.stringify({ ex: exam }),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function () {
                $('#modal_addExam').modal('hide');
                $('#calendar').fullCalendar('changeView', 'month');
                $('#calendar').fullCalendar('refetchEvents');
            }
        });
    });

    //var tooltip = $('<div/>').qtip({
    //    id: 'fullcalendar',
    //    prerender: true,
    //    content: {
    //        text: ' ',
    //        title: {
    //            button: true
    //        }
    //    },
    //    show: false,
    //    hide: false,
    //    style: 'qtip-light'
    //}).qtip('api');

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'month listMonth'
        },
        locale: 'th',
        editable: true,
        selectable: true,
        select: function (start, end, jsEvent, view) {
            if (view.name == 'agendaDay') {
                $('#txt_year').val(new Date().getFullYear() + 543);
                $('#txt_date').val(start.format('DD/MM/YYYY'));
                $('#txt_time').val(start.format('HH:mm') + ' - ' + end.format('HH:mm'));
                exam.exam_id = 0;
                exam.exam_start_time = start;
                exam.exam_end_time = end;
                $('#btn_addExam').removeClass('d-none');
                $('#btn_submitEditExam').addClass('d-none');
                $('#modal_addExam').modal('show');
            }
        },
        selectMinDistance: 2,
        selectOverlap: false,
        timeFormat: 'HH:mm',
        slotLabelFormat: 'HH:mm',
        eventLimit: true, // allow "more" link when too many events
        contentHeight: 600,
        allDaySlot: false,
        displayEventEnd: true,
        dayClick: function (date, jsEvent, view) {
            //$('.fc-event').popover('hide');
            $('#calendar').fullCalendar('changeView', 'agendaDay', date);
        },
        eventOverlap: false,
        eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
            if (view.name == 'agendaDay' && event.color == '#5cb85c') {
                $.confirm({
                    title: 'ยืนยัน!',
                    content: 'ท่านต้องการจะเปลี่ยนแปลงเวลาสอบ ใช่หรือไม่!',
                    buttons: {
                        'ใช่': function () {
                            $.ajax({
                                url: 'MakeSchedule.aspx/editTimeExam',
                                method: 'post',
                                data: JSON.stringify({ ex_id: event.id, est: event.start, eet: event.end }),
                                dataType: 'json',
                                contentType: 'application/json;charset=utf-8',
                                success: function () {
                                    $('#calendar').fullCalendar('changeView', 'month');
                                    $('#calendar').fullCalendar('refetchEvents');
                                }
                            });
                        },
                        'ไม่ใช่': function () {
                            revertFunc();
                        }
                    }
                });
            } else {
                revertFunc();
            }
        },
        eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
            if (event.color == '#5cb85c') {
                $.confirm({
                    title: 'ยืนยัน!',
                    content: 'ท่านต้องการจะเปลี่ยนแปลงเวลาสอบ ใช่หรือไม่!',
                    buttons: {
                        'ใช่': function () {
                            $.ajax({
                                url: 'MakeSchedule.aspx/editTimeExam',
                                method: 'post',
                                data: JSON.stringify({ ex_id: event.id, est: event.start, eet: event.end }),
                                dataType: 'json',
                                contentType: 'application/json;charset=utf-8',
                                success: function () {
                                    $('#calendar').fullCalendar('changeView', 'month');
                                    $('#calendar').fullCalendar('refetchEvents');
                                }
                            });
                        },
                        'ไม่ใช่': function () {
                            revertFunc();
                        }
                    }
                });
            } else {
                revertFunc();
            }
        },
        eventRender: function (event, element) {
            if (event.color == '#5cb85c') {
                element.qtip({
                    style: 'qtip-light',
                    content: {
                        text: '<div class="btn-group btn-group-sm"><button id="btn_detail" class="btn btn-info" onclick="infoExam(' + event.id + ')"><i class="fa fa-info-circle"></i></button><button id="btn_check" class="btn btn-success" onclick="checkExam(' + event.id + ')"><i class="fa fa-check"></i></button><button id="btn_editExam" class="btn btn-warning" onclick="editExam(' + event.id + ');"><i class="fa fa-pencil"></i></button><button id="btn_delExam" type="button" class="btn btn-danger" onclick="delExam(' + event.id + ')"><i class="fa fa-trash"></i></button></div>',
                        title: {
                            button: false
                        }
                    },
                    hide: {
                        delay: 1000,
                        fixed: 'mouseout'
                    },
                    show: {
                        solo: true
                    }
                });
            }
        },
        eventAfterAllRender: function (view) {
            jc.close();
        },
        eventSources: [
            {
                events: function (start, end, timezone, callback) {
                    $.ajax({
                        url: 'MakeSchedule.aspx/getSchedule',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        success: function (data) {
                            allExam = [];
                            var events = [];
                            var yourDept = $('#Hidden1').val();
                            $(data.d).each(function (i, s) {
                                var tmp = {
                                    id: s.exam_id,
                                    title: s.subject_name,
                                    start: moment(s.exam_start_time),
                                    end: moment(s.exam_end_time),
                                    color: (yourDept == s.dept_id) ? '#5cb85c' : '#428bca'
                                };
                                if (yourDept == 9) {
                                    tmp.color = '#5cb85c';
                                }
                                events.push(tmp);
                                allExam.push({
                                    exam_id: s.exam_id,
                                    year: s.year,
                                    term: s.term,
                                    subject_id: s.subject_id,
                                    exam_start_time: s.exam_start_time,
                                    exam_end_time: s.exam_end_time,
                                    kr_value: 0,
                                    exam_gain: s.exam_gain
                                });
                            });
                            callback(events);
                        }
                    });
                },
                textColor: 'white',
                overlap: false
            }
        ],
        loading: function (isLoading, view) {
            if (isLoading == true) {
                jc = $.dialog({
                    closeIcon: false,
                    icon: 'fa fa-spinner fa-spin',
                    title: 'Loading!',
                    content: 'ระบบกำลังโหลดข้อมูล ตารางสอบ!'
                });
            }
        }
    });

    function getSubjectByDept() {
        $.ajax({
            url: 'MakeSchedule.aspx/getSubjectByDept',
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                $('#select_subject').empty();
                $(data.d).each(function (i, subject) {
                    $('#select_subject').append($('<option>', { text: subject.subject_name, value: subject.subject_id }));
                });
            },
            error: function () {
                getSubjectByDept();
            }
        });
    }
});

function editExam(exam_id) {
    $('.fc-event').popover('hide');
    var ex = allExam.find(function (ex) {
        return ex.exam_id == exam_id;
    });
    //console.log(allExam);
    //console.log(ex);
    $('#txt_year').val(ex.year);
    $('input[name=term][value=' + ex.term + ']').prop({ checked: true });
    $('#select_subject option[value=' + ex.subject_id + ']').prop({ selected: true });
    $('#txt_date').val(moment(ex.exam_start_time).format('DD/MM/YYYY'));
    $('#txt_time').val(moment(ex.exam_start_time).format('HH:mm') + ' - ' + moment(ex.exam_end_time).format('HH:mm'));
    $('#txt_exGain').val(ex.exam_gain);
    exam.exam_id = exam_id;
    exam.exam_start_time = moment(ex.exam_start_time);
    exam.exam_end_time = moment(ex.exam_end_time);
    $('#btn_addExam').addClass('d-none');
    $('#btn_submitEditExam').removeClass('d-none');
    $('#modal_addExam').modal('show');
}

function delExam(exam_id) {
    $('.fc-event').popover('hide');
    $.confirm({
        title: 'ยืนยัน!',
        content: 'ท่านต้องการจะยกเลิกการสอบครั้งนี้ ใช่หรือไม่!',
        buttons: {
            'ใช่': function () {
                $.ajax({
                    url: 'MakeSchedule.aspx/delExam',
                    method: 'post',
                    data: JSON.stringify({ ex_id: exam_id }),
                    dataType: 'json',
                    contentType: 'application/json;charset=utf-8',
                    success: function () {
                        $('#calendar').fullCalendar('changeView', 'month');
                        $('#calendar').fullCalendar('refetchEvents');
                    }
                });
            },
            'ไม่ใช่': function () {

            }
        }
    });
}

function infoExam(exam_id) {
    Cookies.set('ex_id', exam_id);
    window.location.replace('MakeExam.aspx');
}

function checkExam(exam_id) {
    Cookies.set('ex_id', exam_id);
    window.location.replace('Check.aspx');
}