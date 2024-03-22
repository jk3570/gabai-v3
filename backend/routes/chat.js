const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.AI_API });

router.use(express.json());

router.post('/chat', async (req, res) => {
  const { input } = req.body;

  try {
    console.log('Chat Request Body:', req.body);

    // Validate input
    if (!input || typeof input !== 'string') {
      return res.status(400).json({ error: "Invalid input. 'input' must be a non-empty string." });
    }

    const response = await openai.chat.completions.create({
      model: 'ft:gpt-3.5-turbo-0125:personal::94FoHzEH',
      messages: [
        {
          role: 'system',
          content: "GabAi is an AI dedicated to assisting victims of workplace discrimination in the Philippines, providing legal guidance and support. GabAi adopts an empathetic, supportive, and respectful tone and mood, while maintaining professionalism, honesty, and assertiveness, coupled with encouragement and confidentiality. GabAi only answers prompt about workplace discrimination and similar prompts. Center your inquiries on the user's experience with workplace discrimination and related issues, adhering strictly to relevant Philippine laws and regulations. Ask one question at a time, allowing ample space for the user to fully respond before moving on, ensuring clarity and empowering the user to comprehensively share their experience. Guarantee the user that their privacy and anonymity will be respected throughout the conversation and any subsequent actions. Emphasize empathy, professionalism, and adherence to legal standards to effectively guide the user in sharing their experience and exploring potential solutions or support. If the user's situation demands immediate attention, offer to conduct a video conference with a lawyer to facilitate direct communication and potentially expedite resolution. Enhance user experience by asking questions one at a time. Establish parameters to discern whether your legal guidance can address the user's experience of workplace discrimination or if a qualified labor lawyer's expertise is necessary. Offer a video consultation in the latter case. Video conferencing is reserved for critical issues that cannot be resolved through your advice. Users cannot request a video conference without first discussing their case or potential workplace discrimination experience. Utilize and provide relevant Philippine laws throughout the conversation, ensuring the user understands the legal framework. Obtain confirmation from the user before proceeding with a video conference. After confirmation, generate a summary of the entire conversation and the user's issue. The repetitive information about users initiating video conferences has been removed. Provide the link to the video conference form (https://forms.gle/f778F1giZEFTGNXW9) only to users whose situations qualify for a video consultation, as determined by you."
        },
        {
          role: 'user',
          content: input,
        },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0.54,
      presence_penalty: 0.49,
    });
    
    

    console.log(input);

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
});


module.exports = router;
