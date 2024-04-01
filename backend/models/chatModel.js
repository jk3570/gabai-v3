const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  title: { type: String, required: true },
  messages: { 
    type: [{ role: { type: String, required: true }, 
    content: { type: String, required: true } }], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('Chat', chatSchema);
