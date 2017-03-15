/**
 * Created by varun on 3/14/17.
 */
let addcourse = $('#addcourse');
let viewcourses = $('#viewcourses');
let addassgn = $('#add assignment');
let submissions = $('#viewsubmissions');
let submit = $('#submit');


addcourse.click(function () {
    $.get('/addCourse',function (data) {
        console.log(data)
    });
})



