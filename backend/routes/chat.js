const express = require('express');

const { startChat, getAllChats, newChat } = require('../controllers/chatController');

const router = express.Router();

// start a chat
router.post('/conversation', startChat)

// get all chats
router.get('/all-chat', getAllChats) 

// new chat
router.post('/new-chat', newChat)

module.exports = router;
