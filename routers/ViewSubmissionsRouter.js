/**
 * Created by bhavya on 24/3/17.
 */
const express = require('express');
const db = require('../utils/dbfuns');
const router = express.Router();
const bp = require('body-parser');

router.use(bp.json());
router.use(bp.urlencoded({extended: true}));

router.get('/', function (req, res) {
    db.getAllSubmissions((data) => {
        res.render('List', {
            title: "Submissions",
            body: data,
            heading: "List of All Submissions"
        })
    })
});

module.exports = router;