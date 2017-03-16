/**
 * Created by varun on 3/16/17.
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize("cb","cbUser","cbPass",{
    host : 'localhost',
    dialect : 'mysql',
});

// TODO table to store courses

const Course = sequelize.define('courses', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher:Sequelize.STRING,
    startdate:Sequelize.DATE,
    enddate:Sequelize.DATE,
    students:Sequelize.ARRAY,
    assignments:Sequelize.ARRAY
});

function addCourse(Course) {

    Course.create({
        task: Course.name,
    }).then(function () {
        console.log("Added");
    }).catch(function () {
        console.log("could not add");
    })
}




// TODO table to store assignments

const assignmentSubmission=sequelize.define('assginmentsub', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    submissions:Sequelize.ARRAY,
    dated:Sequelize.DATE
});






//TODO archive table for courses

const Course = sequelize.define('courses', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher:Sequelize.STRING,
    startdate:Sequelize.DATE,
    enddate:Sequelize.DATE,
    students:Sequelize.ARRAY,
    assignments:Sequelize.ARRAY
});



module.exports = {addCourse
}
