/**
 * Created by varun on 3/14/17.
 */
const express = require('express');
const bp = require('body-parser');


const addCourseRouter = require('./routers/addCourseRouter')
const addAssignmentRouter=require('./routers/addAssignmentRouter')
const submitAssignmentRouter=require('./routers/submitAssignmentRouter')

const app = express();


app.use(bp.json());
app.use(bp.urlencoded({extended: true}));


app.use('/addCourse', addCourseRouter);

app.use('/addAssignment',addAssignmentRouter);

app.use('/submitAssignment',submitAssignmentRouter);


app.use('/', express.static(__dirname + '/public_html'));

