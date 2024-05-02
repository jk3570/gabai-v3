const mongoose = require('mongoose');

// Function to format the date as "Monday 12, 2024"
// const formatDate = (date) => {
//   return date.toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
// };

const requestSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  // conversationId: {
  //   type: String,
  //   required: true,
  // },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  //   required: true,
  //   get: formatDate // Use the formatDate function to format the date
  // },

});

module.exports = mongoose.model('Request', requestSchema);
