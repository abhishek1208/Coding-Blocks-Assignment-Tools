/**
 * Created by varun on 3/17/17.
 */

var submit = $('#submit');

$('#open').click(function () {
    console.log("hello")
    if ($('#open').is(':checked')) {
        $('#date_inp').css('visibility', 'visible');
    }
    else {
        $('#date_inp').css('visibility', 'hidden');

    }
})
$('#close').click(function () {
    console.log("hello")
    if ($('#open').is(':checked')) {
        $('#date_inp').css('visibility', 'visible');
    }
    else {
        $('#date_inp').css('visibility', 'hidden');

    }
})

submit.click(function () {

})



