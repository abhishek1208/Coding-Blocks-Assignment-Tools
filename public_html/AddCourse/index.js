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



let availableCourses =[
    'Elixir',
    'Pandora',
    'Crux',
    'Launchpad',
    'Perceptron',
    'Django'
];
courseName.autocomplete({
    source: availableCourses
});
let Teachers =[
    'Arnav Gupta',
    'Sumeet Malik',
    'Rajesh Sachdeva',
    'Rishabh Kapoor',
    'Prateek Narang',
    'Manmohan Gupta',

];
teacher.autocomplete({
    source: Teachers
});


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

//TODO remove hard code
    $.post('http://localhost:4000/addcourse', {
        courseName: courseName.val(),
        teacher: teacher.val(),
        students: students.val().split(';'),
        date: dateval
    },function (data) {
        if(data == "success"){
            window.location.replace('http://localhost:4000/addCourse/thanks?success=true')
        }
        else{
            window.location.replace('http://localhost:4000/addCourse/thanks?success=false')
        }

    })


})



