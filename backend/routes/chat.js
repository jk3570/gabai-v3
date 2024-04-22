// chatRoute.js

const express = require('express');
const { makeChat, getConversationTitles, getConversationMessages } = require('../controllers/chatController');
const router = express.Router();

// Create a new chat
router.post('/conversation', makeChat);

// Fetch all conversation titles
router.get('/conversations/:userid', getConversationTitles);

// Fetch messages for a specific conversation
router.get('/conversation/:conversationId', getConversationMessages);

module.exports = router;
