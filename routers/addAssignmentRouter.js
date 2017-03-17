/**
 * Created by abhishekyadav on 15/03/17.
 */

//abhishek's code
const dbfuns_sql=require('../utils/dbfuns_sql');
const router = require('express').Router();

router.get('/add',function (req,res) {
    // dbfuns_sql.addcourse("Elixir","Arnav Gupta","abhishek1208@gmail.com;varun@gmail.com;aditi23@gmail.com",
    //     function (){}
    //
    // );
    dbfuns_sql.addcourse("Pandora","Arnav Gupta","abhishek1208@gmail.com;varun@gmail.com;aditi23@gmail.com",
        function (){}

    );
    res.send("added course");
})
router.get('/delete',function (req,res) {
    dbfuns_sql.endcourse(6);
    res.send("ended course");
})
router.get('/addstud',function (req,res) {
    dbfuns_sql.addStudent(5,"ishan@gmail.com",function () {
    });
    res.send("Student Added");
})
router.get('/addAssgn',function (req,res) {

    // dbfuns_sql.addasgn("assignmentabc","make a todolist",5);
    dbfuns_sql.addasgn("assignment3","SQL",6);

    res.send("Assignment added");

})

router.get('/submitAssgn',function (req,res) {

    dbfuns_sql.submitasgn(5,1,"ishan@gmail.com","www.github.com/assignment");
    res.send("Submission added");

})
module.exports = router;