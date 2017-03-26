/**
 * Created by Aditi on 17/03/2017.
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const dbfuns = require('../utils/dbfuns');
const bp = require('body-parser');

router.use(bp.json());
router.use(bp.urlencoded({extended: true}))

router.post('/submit', function (req, res) {
    dbfuns.submitAssgn(req.body.course, req.body.assgn, req.body.email, req.body.answer, function () {
        res.send('success');
    })
});

router.get('/thanks', function (req, res) {
    if(req.query.success ==="true") {
        res.render('index', {
            title: "Solution Submitted!",
            body: "Your solution has been submitted successfully. Thank you for using HackerAdvance!"
        })
    }
    else {
        res.render('index', {
            title: "Submission Failed :/",
            body: "Sorry we are facing some issues at the moment, please try again later. Thank you for using HackerAdvance."
        })
    }
})

router.use('/', express.static(__dirname.substr(0, __dirname.length - 7) + 'public_html/submitAssgn'));

module.exports = router;