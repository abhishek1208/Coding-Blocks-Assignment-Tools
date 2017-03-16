/**
 * Created by varun on 3/14/17.
 */
const express = require('express')
const router = express.Router();
const dbfuns=require('../utils/dbfuns')

router.use('/',express.static(__dirname.substr(0,__dirname.length - 7) + 'public_html/AddCourse'));

//code here


module.exports = router;




