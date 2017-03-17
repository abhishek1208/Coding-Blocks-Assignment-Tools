/**
 * Created by abhishekyadav on 17/03/17.
 */


const Sequelize = require('sequelize');
const sequelize = new Sequelize("cb", "cbUser", "cbPass", {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.sync().then(() => {
}).catch((err) => {
    throw err;
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
    name: {type: Sequelize.STRING, unique: true},
    description: Sequelize.STRING
});

//table for submissions
const submissions = sequelize.define('submissions', {
    courseID: Sequelize.INTEGER,
    asgnID: Sequelize.INTEGER,
    student_email: Sequelize.STRING,
    submission_url:{ type:Sequelize.STRING,unique:true,allowNull: false} //detecting same links submitted by different students, unique:true

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
        allowNull: true
    },
    assn_list: {
        type: Sequelize.STRING,
        allowNull: true
    }

});


//function to add course

function addcourse(courseName, teacherName, Students, done, StartDate) {
    var stDate = StartDate || new Date()

    activecourses.create({
        name: courseName,
        teacher: teacherName,
        students_list: Students,
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


            let list = row.students_list;
            if(!list)
            row.update({
                students_list: email
            })
            else{
                row.update({
                    students_list : row.students_list + ';' + email
                })
            }
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

function addasgn(asgn_name, asgn_desc, courseID) {
    asgns.create({
        name: asgn_name,
        description: asgn_desc
    }).then(function (row) {
        console.log("done");
        if (courseID) {
            addAsgnToCourse(courseID, asgn_name);
        }
    }).catch(function (err) {
        //TODO error if assignment with same name already present
        if (err) { //TODO check the type of error
            if (courseID) {
                addAsgnToCourse(courseID, asgn_name);
            }
        }
    })

}


//function to add assignment to course

function addAsgnToCourse(courseID, asgnID) {

    if (Number.isInteger(asgnID)) {

        activecourses.findOne({where: {id: courseID}}).then(function (row) {

            let list = row.assn_list;

            if (!row.assn_list) {
                row.update({
                    assn_list: asgnID
                })
            }
            else {
                row.update({
                    assn_list: list + ';' + asgnID
                })
            }


        }).catch(function (err) {
            //wrong course id
            console.log("wrong course id")
            throw err;
        })

    }
    else {

        asgns.findOne({where: {name: asgnID}}).then(function (assn_row) {
            activecourses.findOne({where: {id: courseID}}).then(function (row) {

                let list = row.assn_list;

                if (!list) {
                    row.update({
                        assn_list: assn_row.id
                    })
                }
                else {
                    row.update({
                        assn_list: list + ';' + assn_row.id
                    })
                }


            }).catch(function (err) {
                //wrong course id
            })
        })

    }

}


//function to submit assignment
function submitasgn(courseID, asgnID, email, url) {
    activecourses.findOne({where: {id: courseID}}).then(function (Course_row) {
        //Todo change this comment to find the email of the student in active courses table
        // if(Course_row.students_list.indexOf(email)===-1) throw new SQLException('Student not enrolled in course');
        //Todo if submission exists, then update the submission
        submissions.create({
            courseID: courseID,
            asgnID: asgnID,
            student_email: email,
            submission_url: url
        })



    }).catch(function (err) {
        if (err) throw err;
    });
}


module.exports = {addcourse, endcourse, addStudent, addasgn, submitasgn}
