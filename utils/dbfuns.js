/**
 * Created by varun on 3/16/17.
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres", "postgres", "Cool@man6", {
    host: 'localhost',
    dialect: 'postgres',
    port : 5433
});






//table to store active courses
const activecourses = sequelize.define('activecourses', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    students_list: {type: Sequelize.ARRAY({type: Sequelize.STRING, validate: {isEmail: true}})},
    assn_list: {type: Sequelize.ARRAY(Sequelize.INTEGER)}

});








//table to store assignments

const asgns = sequelize.define('assignments', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type : Sequelize.STRING,validate : {unique : true}},
    description: Sequelize.STRING
})








//table for submissions
const submissions = sequelize.define('submissions', {
    courseID: Sequelize.INTEGER,
    asgnID: Sequelize.INTEGER,
    students : Sequelize.ARRAY( Sequelize.ARRAY({type : Sequelize.STRING}))
})





//table to store archived courses
const archivedcourses = sequelize.define('archivedcourses', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    teacher: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    students_list: {type: Sequelize.ARRAY({type: Sequelize.STRING, validate: {isEmail: true}})},
    assn_list: {type: Sequelize.ARRAY(Sequelize.INTEGER)}

});







sequelize.sync().then(() => {
}).catch((err) => {
    throw  err;
});







//function to add course

function addcourse(courseName, teacherName, Students, StartDate) {
    var stDate = StartDate || new Date();

    activecourses.create({
        name: courseName,
        teacher: teacherName,
        students_list: Students,
        assn_list: [],
        startDate: stDate,
        endDate: new Date().setMonth(stDate.getMonth() + 3)
    }).then(function () {
    }).catch(function (err) {
        if(err) throw  err;
    })

}









//function to end course and move to archive

function endcourse(courseID) {

    if (Number.isInteger(courseID)) {
        activecourses.findOne({where: {id: courseID}}).then(function (row) {
            //TODO check if row null

            submissions.findAndCountAll({where : {courseID : row.id}}).then(function (rows) {
                rows.destroy();
            })
            archivedcourses.create({
                name: row.name,
                teacher: row.teacher,
                students_list: row.students_list,
                assn_list: row.assn_list,
                startDate: row.startDate,
                endDate: new Date()

            }).then(function () {
                row.destroy();
            })

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

            submissions.findAndCountAll({where : {courseID : row.id}}).then(function (rows) {
                rows.destroy();
            })

            archivedcourses.create({
                name: row.name,
                teacher: row.teacher,
                students_list: row.students_list,
                assn_list: row.assn_list,
                startDate: row.startDate,
                endDate: new Date()


            }).then(function () {
                row.destroy();
            })

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

function addasgn(asgn_name,asgn_desc,courseID) {
    asgns.create({
        name : asgn_name,
        description: asgn_desc
    }).then(function () {
        if(courseID){
            addAsgnToCourse(courseID,asgn_name);
        }
    }).catch(function (err) {
        if(err) throw err;
    })



}


//function to add assignment to course

function addAsgnToCourse(courseID, asgnID) {

    if(Number.isInteger(asgnID)){

        activecourses.findOne({where: {id: courseID}}).then(function (row) {

            let arr = row.assn_list;
            arr.push(asgnID);

            row.update({
                assn_list: arr
            })

            submissions.create({
                courseID : courseID,
                asgnID : asgnID,
                students : [[]]


            })

        }).catch(function (err) {
            //wrong course id
        })

    }
    else {

        asgns.findOne({where : {name : asgnID}}).then(function (assn_row) {
            activecourses.findOne({where: {id: courseID}}).then(function (row) {

                let arr = row.assn_list;
                arr.push(assn_row.id);

                row.update({
                    students_list: arr
                })

                submissions.create({
                    courseID : courseID,
                    asgnID : asgnID,
                    students : [[]]

                })
            }).catch(function (err) {
                //wrong course id
            })
        })

    }

}





//function to submit assignment
function submitasgn(courseID,asgnID,email,url) {
    activecourses.findOne({where : {id : courseID}}).then(function (Course_row) {
        if(Course_row.students_list.indexOf(email)===-1) throw new SQLException('Student not enrolled in course');

        submissions.findOne({where : {courseID : courseID , asgnID : asgnID}}).then(function (row) {
            let arr = row.students;

            arr.push([email,url]);

            row.update({
                students: arr
            })

        })

    }).catch(function (err) {
        if(err) throw err;
    });
}




module.exports = {addcourse , endcourse , addStudent , addasgn , addAsgnToCourse , submitasgn}
