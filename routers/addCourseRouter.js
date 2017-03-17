/**
 * Created by varun on 3/14/17.
 */
const express = require('express');
const bp = require('body-parser');
const router = express.Router();
const dbfuns = require('../utils/dbfuns');

router.use(bp.json());
router.use(bp.urlencoded({extended : true}))


router.post('/',function (req,res) {
   // console.log(req);
    dbfuns.addcourse(req.body.courseName,req.body.teacher,req.body.students,req.body.date)


})

router.get('/test',function () {
    dbfuns.endcourse(8);
})

router.use('/',express.static(__dirname.substr(0,__dirname.length - 7) + 'public_html/AddCourse'));






module.exports = router;




