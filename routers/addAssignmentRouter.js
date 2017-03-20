/**
 * Created by abhishekyadav on 15/03/17.
 */

//abhishek's code
const express = require('express');
const bp = require('body-parser');
const dbfuns_sql=require('../utils/dbfuns_sql');
const dbfuns=require('../utils/dbfuns')
const router = require('express').Router();

router.use(bp.json());
router.use(bp.urlencoded({extended: true}))



router.use('/', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/AddAssignment'));
router.post('/add',function (req,res) {
    // dbfuns_sql.addcourse("Elixir","Arnav Gupta","abhishek1208@gmail.com;varun@gmail.com;aditi23@gmail.com",
    //     function (){}
    //
    // );
    // dbfuns_sql.addcourse("Pandora","Arnav Gupta","abhishek1208@gmail.com;varun@gmail.com;aditi23@gmail.com",
    //     function (){}
    //
    // );
    // dbfuns_sql.addasgn(req.body.name,req.body.desc,req.body.courseid);
    res.send("success");

    // dbfuns.addasgn(req.body.name,req.body.desc,req.body.courseid);
})



router.get('/thanks', function (req, res) {

    if(req.query.success ==="true") {


        res.render('index', {
            title: "Assignment Added",
            body: "The Assignment has been added Successfully. Thankyou for using HackerAdvance"
        })
    }
    else {


        res.render('index', {
            title: "Assignment not Added",
            body: "Sorry we are facing some issues at the moment plz try again later. Thankyou for using HackerAdvance"
        })

    }
})



// router.get('/delete',function (req,res) {
//     dbfuns_sql.endcourse(6);
//     res.send("ended course");
// })
// router.get('/addstud',function (req,res) {
//     dbfuns_sql.addStudent(5,"ishan@gmail.com",function () {
//     });
//     res.send("Student Added");
// })
// router.get('/addAssgn',function (req,res) {
//
//     // dbfuns_sql.addasgn("assignmentabc","make a todolist",5);
//     dbfuns_sql.addasgn("assignment3","SQL",6);
//
//     res.send("Assignment added");
//
// })
//
// router.get('/submitAssgn',function (req,res) {
//
//     dbfuns_sql.submitasgn(5,1,"ishan@gmail.com","www.github.com/assignment");
//     res.send("Submission added");
//
// })

module.exports = router;