/**
 * Created by abhishekyadav on 17/03/17.
 */


const Sequelize = require('sequelize');
const sequelize = new Sequelize("cb", "cbUser", "cbPass", {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.sync().then(() => {
}).catch(() => {
    console.log("error while syncing")
});
//table to store active courses
const activecourses = sequelize.define('activecourses', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    students_list: {
        type: Sequelize.STRING,
        allowNull: true,

    },


    assn_list: {
        type: Sequelize.STRING,
        allowNull: true,

    }

});


//table to store assignments

const asgns = sequelize.define('assignments', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    description: Sequelize.STRING
})


//table for submissions
const submissions = sequelize.define('submissions', {
    courseID: Sequelize.INTEGER,
    asgnID: Sequelize.INTEGER,
    students: {
        type: Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('students').split(';')
        },
        set: function (val) {
            this.setDataValue('students', val.join(';'));
        },
        validate: {isEmail: true}
    }
})


//table to store archived courses
const archivedcourses = sequelize.define('archivedcourses', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    students_list: {
        type: Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('students_list').split(';')
        },
        set: function (val) {
            this.setDataValue('students_list', val.join(';'));
        },
    },
    assn_list: {
        type: Sequelize.STRING,
        allowNull: true,
        get: function () {
            return this.getDataValue('assn_list').split(';')
        },
        set: function (val) {
            this.setDataValue('assn_list', val.join(';'));
        },
    }

});





//function to add course

function addcourse(courseName, teacherName, Students, done, StartDate) {
    var stDate = StartDate || new Date()

    activecourses.create({
        name: courseName,
        teacher: teacherName,
        students_list:Students,
        assn_list: "",
        startDate: stDate,
        endDate: new Date().setMonth(stDate.getMonth() + 3)
    }).then(function () {
        done();
    }).catch(function (err) {
        console.log(err);
    })

}


//function to end course and move to archive

function endcourse(courseID) {

    if (Number.isInteger(courseID)) {
        activecourses.findOne({where: {id: courseID}}).then(function (row) {
            //TODO check if row null

            submissions.findAndCountAll({where: {courseID: row.id}}).then(function (rows) {
                rows.destroy();
            })
            archivedcourses.create({
                name: row.name,
                teacher: row.teacher,
                students_list: row.students_list,
                assn_list: row.assn_list,
                startDate: row.startDate,
                endDate: new Date()

            })
            row.destroy();
        }).catch(function (err) {
            if (err) throw err
        })
    }

    else if (courseID instanceof Date) {
        //TODO remove by startDate
        //catch if conflict
    }
    else {
        //TODO catch if conflict

        activecourses.findOne({where: {name: courseID}}).then(function (row) {

            //TODO check if row null

            submissions.findAndCountAll({where: {courseID: row.id}}).then(function (rows) {
                rows.destroy();
            })

            archivedcourses.create({
                name: row.name,
                teacher: row.teacher,
                students_list: row.students_list,
                assn_list: row.assn_list,
                startDate: row.startDate,
                endDate: new Date()


            })
            row.destroy();
        })
    }

}


//function for student to enroll in course

function addStudent(courseID, email, done) {

//TODO check if email is right


    if (Number.isInteger(courseID)) {

        activecourses.findOne({where: {id: courseID}}).then(function (row) {
            //TODO check row null

            let arr = row.students_list;
            arr.push(email);

            row.update({
                students_list: arr
            })
            done();
        }).catch(function (err) {
            throw err
        })

    }
    else {
        //TODO check row null

        activecourses.findOne({where: {name: courseID}}).then(function (row) {
            //TODO handle name conflict

            let arr = row.students_list;
            arr.push(email);

            row.update({
                students_list: arr
            })
        })
    }
}


//function to add assignment

function addasgn() {
    //TODO
}

//function to submit assignment
function submitasgn() {
    //TODO
}


module.exports = {addcourse, endcourse, addStudent, addasgn, submitasgn}
