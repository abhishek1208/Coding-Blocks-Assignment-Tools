/**
 * Created by varun on 3/14/17.
 */
const express = require('express')
const router = express.Router();

router.use('/',express.static(__dirname.substr(0,__dirname.length - 7) + 'public_html/AddCourse'));

//code here
const dbfuns_sql=require('../utils/dbfuns_sql');
router.get('/add',function (req,res) {
    dbfuns_sql.addcourse("Pandora","Arnav Gupta","abhishek1208@gmail.com;varun@gmail.com;aditi23@gmail.com",
        function (){}

    );
    res.send("added course");
})


module.exports = router;




