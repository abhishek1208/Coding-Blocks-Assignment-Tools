/**
 * Created by varun on 3/14/17.
 */
let addcourse = $('#AddCourse');
let viewcourses = $('#ViewCourses');
let addassgn = $('#Add Assignment');
let submissions = $('#ViewSubmissions');
let submit = $('#Submit');


addcourse.click(function () {
    window.location.replace(window.location.href + '/addCourse');
});
addassgn.click(function () {
    window.location.replace(window.location.href + '/addAssignment');
});
submit.click(function () {
    window.location.replace(window.location.href + '/submitAssignment');
});




