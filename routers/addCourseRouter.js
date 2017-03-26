/**
 * Created by varun on 3/14/17.
 */
const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const dbfuns = require('../utils/dbfuns');
const dbfuns_sql = require('../utils/dbfuns_sql');
const path = require('path');


router.use(bp.json());
router.use(bp.urlencoded({extended: true}))


router.post('/', function (req, res) {
    // console.log(req);
    dbfuns.addcourse(req.body.courseName, req.body.teacher, req.body.students,function () {
        res.send('success');
    }, req.body.date)
});

router.get('/thanks', function (req, res) {

    if(req.query.success ==="true") {


        res.render('index', {
            title: "Course Added",
            body: "The course has been added Successfully. Thank you for using HackerAdvance"
        })
    }
    else {


        res.render('index', {
            title: "Course not Added",
            body: "Sorry we are facing some issues at the moment plz try again later. Thank you for using HackerAdvance"
        })

    }
})


router.use('/', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/AddCourse'));

module.exports = router;




