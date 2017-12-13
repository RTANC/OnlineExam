$(document).ready(function () {
    $.ajax({
        url: 'MakeExam.aspx/getAllCourse',
        method: 'post',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            $('select[name=select_course]').empty();
            $(data.d).each(function (i, course) {
                $('select[name=select_course]').append($('<option>', { text: course.course_name, value: course.course_id }));
            });
        }
    });
});