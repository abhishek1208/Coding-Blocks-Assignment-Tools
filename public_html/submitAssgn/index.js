/**
 * Created by Aditi on 17/03/2017.
 */

var courseID = $('#courseID');
var assgnID = $('#assgnID');
var stdntEmail = $('#stdntEmail');
var submission = $('#submission');
var submit = $('#submit');

$("#assgnSubmission").validate({
    rules: {
        cID: "required",
        aID: "required",
        eM: {
            required: true,
            email: true
        },
        ans: {
            required: true,
            url: true
        }
    },
    messages: {
        cID: "*Please enter a valid course ID",
        aID: "*Please enter a valid assignment ID",
        eM: {
            required: "*Please enter your email id",
            email: "*Please enter a valid email id"
        },
        ans: {
            required: "*Please enter your submission's url",
            url: "*Please enter a valid url"
        }
    },
    
    submitHandler: function() {
        $.post('http://localhost:4000/submitAssignment/submit', {
            course:courseID.val(),
            assgn:assgnID.val(),
            email: stdntEmail.val(),
            answer: submission.val()
        },function (data) {
            if(data == "success"){
                window.location.replace('http://localhost:4000/submitAssignment/thanks?success=true')
            }
            else{
                window.location.replace('http://localhost:4000/submitAssignment/thanks?success=false')
            }
        })
    }
});
