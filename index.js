/**
 * Created by varun on 3/14/17.
 */
const express = require('express');
const bp = require('body-parser');
const hbs = require('express-hbs');
const path = require('path');


const addCourseRouter = require('./routers/addCourseRouter')
const addAssignmentRouter=require('./routers/addAssignmentRouter')
const submitAssignmentRouter=require('./routers/submitAssignmentRouter')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");


app.use(bp.json());
app.use(bp.urlencoded({extended: true}));


app.use('/addCourse', addCourseRouter);

app.use('/addAssignment',addAssignmentRouter);

app.use('/submitAssignment',submitAssignmentRouter);


app.use('/', express.static(__dirname + '/public_html'));

app.listen(4000,function () {
    console.log("listening on port 4000");
})

