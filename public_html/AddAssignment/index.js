/**
 * Created by abhishekyadav on 20/03/17.
 */


var assgn_name=$('#assgn_name')
var assgn_desc=$('#assgn_desc')
var assgn_courseid=$('#assgn_courseid')
var submit = $('#submit');


$(document).ready(function() {
    $('#assignmentForm').bootstrapValidator({
        container: '#messages',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: 'The name is required and cannot be empty'
                    }
                }
            },
            desc: {
                validators: {
                    notEmpty: {
                        message: 'The Description is required and cannot be empty'
                    }
                }
            }
            ,
            courseid: {
                validators: {
                    notEmpty: {
                        message: 'The courseid is required and cannot be empty'
                    }
                }
            }
        }
    });
});

submit.click(function (ev) {


    $.post('http://localhost:4000/addAssignment/add', {
        name:assgn_name.val(),
        desc:assgn_desc.val(),
        courseid: assgn_courseid.val()
    },function (data) {
        if(data == "success"){
            window.location.replace('http://localhost:4000/addAssignment/thanks?success=true')
        }
        else{
            window.location.replace('http://localhost:4000/addAssignment/thanks?success=false')
        }
    })



})