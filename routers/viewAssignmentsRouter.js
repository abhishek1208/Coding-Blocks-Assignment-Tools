/**
 * Created by varun on 3/23/17.
 */


const express = require('express');
const bp = require('body-parser');
const db = require('../utils/dbfuns');
const router = express.Router();

router.use(bp.json());
router.use(bp.urlencoded({extended: true}));

router.get('/', function (req, res) {
    if (!req.query.id) {

        db.getAllAssignments((data) => {
            res.render('List', {
                title: "Assignments",
                body: data,
                heading: "List of All Assignments"
            })
        })

    }
    else {
        db.getAssignment(req.query.id, (data) => {

            res.render('assgn', {
                title: data.name,
                name: data.name,
                desc: data.description
            })

        })


    }


})


module.exports = router;
