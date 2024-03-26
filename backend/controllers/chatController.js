const Chat = require('../models/chatModel');
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const generateDefaultTitle = () => {
  const currentDate = new Date();
  return `Chat ${currentDate.toLocaleString()}`;
};

const openai = new OpenAI({ apiKey: process.env.AI_API });

// Store conversation history
let conversationHistory = [];

  // start a chat
  const startChat = async (req, res) => {
  const { input } = req.body;

  try {
    console.log('Chat Request Body:', req.body);

    // Validate input
    if (!input || typeof input !== 'string' || input.trim() === '') {
      return res.status(400).json({ error: "Invalid input. 'input' must be a non-empty string." });
    }

    // Add user input to conversation history
    conversationHistory.push({ role: 'user', content: input });

    // Generate response from OpenAI API
    const response = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-0125:personal::94FoHzEH',
      messages: [
        {
          role: 'system',
          content: "You are an AI Assistant against workplace discrimination in the Philippines, and your name is Gab. You were developed by the group of computer science students with a group name of PARAGON at the University of Caloocan City, and you were developed in year 2024 and still developing. You can answer in different languages such as English, Filipino, Tagalog, and do not answer other languages you will encounter and questions that are consider as unprofessional, irrelevant, explicit, offensive, and not related to the topic, like programming language, teaching how to cook, composing a music, like that. You need to reply all the prompts of user in a short, simple, professional, calm, empathetic manner, your maximum reply must be 200 words only, and do not reply unnecessary message to the user. Also, use words that are easy to understand by laypeople. Moreover, give relevant Laws or Republic Acts in the Philippines based on the information you collected about workplace discrimination in an easy-to-understand way, so that the user will know what law and rights are being violated. Furthermore, ask these questions in order to gain information about the user experience with workplace discrimination, one question at a time: What happened?, How did that happen?, Who did that?, Where did that happen?, and When did that happen? You can also modify the given questions. Do not proceed to the next order of questions if you have not obtained the answer of all the given questions. Also, throughout the conversation, make it human-like and keep on answering and questioning the user to obtain the information. You can also add questions aside from the order of questions I have given to gather more relevant information. Moreover, give this link [https://paragon-gabai.vercel.app/request] that they can access to request a schedule for a lawyer video conference consultation if they want to proceed to a more detailed advice and guidance on what they need to do, but do not give a link of request form if the basic given order of questions were not answered. Lastly, you need to ask the user to type the word 'case summary' And you will send the case summary. After sending the summary, you will also send the link for a request. But if the user did not type the 'case summary' do not send the request link form."
        },
        ...conversationHistory // Include conversation history in messages
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0.54,
      presence_penalty: 0.49,
    });

    console.log('User Input:', input);
    console.log('AI Response:', response.choices[0].message.content);

    // Add AI response to conversation history
    conversationHistory.push({ role: 'assistant', content: response.choices[0].message.content });

    // Save conversation to the database at the end of each chat session
    await saveConversationToDatabase(conversationHistory);

    // Send AI response to the client
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('Error processing request:', error);

    if (error.response) {
      // The request was made and the server responded with a non-2xx status code
      console.error('Server responded with:', error.response.status, error.response.statusText);
      res.status(error.response.status).send('Error processing request: ' + error.response.statusText);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server:', error.request);
      res.status(500).send('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up request:', error.message);
      res.status(500).send('Error setting up request: ' + error.message);
    }
  }
}

// Function to save conversation to the database
const saveConversationToDatabase = async (conversation) => {
  try {
    // Check if conversation contains any messages
    if (conversation.length === 0) {
      return; // Don't save empty conversation
    }

    // Save conversation to the database
    const chat = new Chat({
      title: generateDefaultTitle(),
      messages: conversation,
    });
    await chat.save();
  } catch (error) {
    console.error('Error saving conversation to database:', error);
    throw error;
  }
};

  // get all chats
  const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
    console.log(chats)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  // new chat
  const newChat = async (req, res) => {
    const chat = new Chat({
      title: req.body.title,
      messages: req.body.messages,
    });

    try {
      const newChat = await chat.save();
      res.status(201).json(newChat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


module.exports = { getAllChats, newChat, startChat, saveConversationToDatabase,  generateDefaultTitle };
