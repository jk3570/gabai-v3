const express = require("express");

// controller functions
const { getAllArchive, totalArchives, sendArchive, deleteSchedule } = require("../controllers/archiveController");

const router = express.Router();

//get all counts
router.get('/total', totalArchives);

//get all users
router.get('/schedule', getAllArchive);

//pass to archive
router.post('/create', sendArchive);

//delete schedule
router.delete('/delete/:id', deleteSchedule);

module.exports = router;
