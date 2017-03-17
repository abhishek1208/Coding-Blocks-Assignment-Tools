/**
 * Created by varun on 3/17/17.
 */



var courseName = $('#courseName');
var teacher = $('#teacher');
var students = $('#students');
var open = $('#open');
var close = $('#close');
var date = $('#date_inp')
var submit = $('#submit');


open.click(function () {
    console.log("hello")
    if (open.is(':checked')) {
        date.css('visibility', 'visible');
    }
    else {
        date.css('visibility', 'hidden');

    }
})
close.click(function () {

    if (open.is(':checked')) {
        date.css('visibility', 'visible');
    }
    else {
        date.css('visibility', 'hidden');

    }
})

submit.click(function (ev) {



    let dateval = undefined;
    if (open.is(':checked')) {
        dateval = new Date(date.val());
    }


    $.post('http://localhost:4000/addcourse', {
        courseName: courseName.val(),
        teacher: teacher.val(),
        students: students.val().split(';'),
        date: dateval
    })


})



