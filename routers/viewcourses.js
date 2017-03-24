/**
 * Created by Apoorvaa on 24/3/17.
 */

const express = require('express');
const db = require('../utils/dbfuns_sql');
const router = express.Router();
const bp = require('body-parser');

router.use(bp.json());
router.use(bp.urlencoded({extended: true}));

// Add another to view archived courses
router.get('/', function (req, res) {
    db.getAllCourses(function (data) {
        res.render('List', {
            title: "Active Courses",
            body: data,
            heading: "List of All Active Courses"
        })
    })
});

module.exports = router;