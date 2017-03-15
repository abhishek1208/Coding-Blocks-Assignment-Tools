/**
 * Created by varun on 3/14/17.
 */
const express = require('express')
const router = express.Router();

router.use('/',express.static(__dirname + '/public/course'));


//code here


module.exports = router;




