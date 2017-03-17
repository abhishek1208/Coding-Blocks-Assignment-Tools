/**
 * Created by abhishekyadav on 17/03/17.
 */

const Sequelize = require('sequelize');
const sequelize = new Sequelize("cb","cbUser","cbPass",{
    host : 'localhost',
    dialect : 'mysql',
});

// TODO table to store courses

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






//TODO archive table for courses



module.exports = {

}
