  const mongoose = require('mongoose');

  const Schema = mongoose.Schema;

  const chatSchema = new Schema({
    userid: {type: String, required: true},
    title: { type: String, required: true },
    messages: [{ role: { type: String, required: true }, content: { type: String, required: true } }],
    summary: { type: String }, 
    createdAt: { type: Date, default: Date.now, required: true }
  });

  module.exports = mongoose.model('Chat', chatSchema);
