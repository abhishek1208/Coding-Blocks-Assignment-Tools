/**
 * Created by varun on 3/16/17.
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize("cb", "cbUser", "cbPass", {
    host: 'localhost',
    dialect: 'mysql',
});


const activecourses = sequelize.define('courses', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    students_list: {type: Sequelize.ARRAY({type: Sequelize.STRING, validate: {isEmail: true}})},
    assn_list: {type: Sequelize.ARRAY(Sequelize.INTEGER)}

});


// TODO table to store assignments

const archivedcourses = sequelize.define('courses', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    students_list: {type: Sequelize.ARRAY({type: Sequelize.STRING, validate: {isEmail: true}})},
    assn_list: {type: Sequelize.ARRAY(Sequelize.INTEGER)}

});


sequelize.sync().then(() => {
}).catch(() => {
    console.log("error while syncing")
});


//function to add course

function addcourse(courseName, teacherName, Students, StartDate) {

    activecourses.create({
        name: courseName,
        teacher: teacherName,
        students_list: Students,
        assn_list: [],
        startDate: StartDate || new Date()
    });

}


//function to end course and move to archive


function endcourse(courseID) {

    if (Number.isInteger(courseID)) {
        //remove entry and push in archivedcourses
    }

    if (courseID instanceof Date) {
        //remove by date
        //catch if conflict
    }
    else {
        //remove by courseName
        //catch if conflict
    }

}


//function for student to enroll in course


module.exports = {addcourse, endcourse}
