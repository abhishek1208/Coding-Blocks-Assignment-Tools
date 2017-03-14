/**
 * Created by varun on 3/14/17.
 */
const express = require('express');
const bp = require('body-parser');


const addCourseRouter = require('./routers/addCourseRouter')

const app = express();


app.use(bp.json());
app.use(bp.urlencoded({extended: true}));


app.use('/addCourse', addCourseRouter);


//TODO add other routers


app.use('/', express.static(__dirname + '/public_html'));

