const Chat = require('../models/chatModel');
const RandomForestClassifier = require('ml-random-forest').RandomForestClassifier;
const fs = require('fs');
const path = require('path');
const natural = require('natural');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

// Initialize OpenAI API
const openai = new OpenAI(process.env.OPENAI_API_KEY);

let conversationHistory = []; // Moved the conversation history outside the function scope
let randomForestModel;
let uniqueLabels; // Define uniqueLabels globally
let encodedLabels; // Define encodedLabels globally
let dataset = []; // Declare dataset globally
let features = []; // Declare features globally
let labels = []; // Declare labels globally
let tfidfFeatures; // Define tfidfFeatures globally
let summary = ''; // Initialize the summary variable

// Path to the training data JSON file
const trainingDataPath = path.join(__dirname, 'WorkplaceDiscriminationDataset.jsonl');

// Function to load training data from the JSONL file
const loadTrainingData = () => {
    try {
        const lines = fs.readFileSync(trainingDataPath, 'utf-8').split('\n');
        lines.forEach(line => {
            if (line.trim() !== '') {
                try {
                    const [input, label] = JSON.parse(line);
                    dataset.push([input, label]);
                } catch (error) {
                    console.error('Error parsing line:', line);
                }
            }
        });

        // Separate features and labels
        features = dataset.map(([input, _]) => input);
        labels = dataset.map(([_, label]) => label);

    } catch (error) {
        console.error('Error loading training data:', error);
    }
};

const evaluateModel = (tfidf, features) => {
    const tfidfFeatures = features.map((document) => {
        const terms = tfidf.listTerms(document).map(term => term.term);
        const tfidfVector = [];
        terms.forEach(term => {
            tfidfVector.push(tfidf.tfidf(term, document));
        });
        return tfidfVector;
    });

    const predictions = randomForestModel.predict(tfidfFeatures);
    const correctPredictions = predictions.filter((prediction, index) => prediction === encodedLabels[index]);
    const accuracy = correctPredictions.length / predictions.length;
    console.log('Model Evaluation - Accuracy:', accuracy);

    // Get terms from TF-IDF
    const terms = tfidf.listTerms(features[0]).map(term => term.term);

    console.log('Terms:', terms);
    console.log('TF-IDF Vector:', tfidfFeatures); // Assuming this is what you want to log
};


// Function to update the dataset and retrain the model
const updateDatasetAndModel = () => {
    // Transform the features into TF-IDF vectors
    const tfidf = new natural.TfIdf();
    features.forEach((document) => {
        tfidf.addDocument(document);
    });
    tfidfFeatures = features.map((document) => {
        const terms = tfidf.listTerms(document).map(term => term.term); // Define 'terms' here
        const tfidfVector = [];
        terms.forEach(term => {
            tfidfVector.push(tfidf.tfidf(term, document));
        });
        return tfidfVector;
    });

    // Encode labels as categorical variables
    uniqueLabels = [...new Set(labels)];
    encodedLabels = labels.map(label => uniqueLabels.indexOf(label));

    // Train the random forest model
    try {
        randomForestModel = new RandomForestClassifier();
        randomForestModel.train(tfidfFeatures, encodedLabels);
        console.log('Random Forest model trained successfully.');
        // Evaluate the model on the training data
        evaluateModel(tfidf, features);
    } catch (error) {
        console.error('Error training Random Forest model:', error);
    }
};


// Function to append new data point to the dataset and update the model
const appendToDatasetAndModel = (input, label) => {
    // Append the new data point to the dataset
    const newDataPoint = { text: input, label };
    dataset.push(newDataPoint);

    // Update the features and labels arrays
    features.push(input);
    labels.push(label);

    // Update the training data file with the new data point
    fs.appendFileSync(trainingDataPath, JSON.stringify([newDataPoint.text, newDataPoint.label]) + '\n');

    // Retrain the model with the updated dataset
    updateDatasetAndModel();
};


// Function to check the balance of discrimination types in the dataset
const checkDatasetBalance = () => {
    const labelCounts = {};
    labels.forEach(label => {
        labelCounts[label] = (labelCounts[label] || 0) + 1;
    });
    console.log('Dataset Balance:', labelCounts);

    // Check if dataset is imbalanced
    const minLabelCount = Math.min(...Object.values(labelCounts));
    const maxLabelCount = Math.max(...Object.values(labelCounts));
    const imbalanceThreshold = 0.2; // Set a threshold for dataset imbalance (e.g., 20%)

    if ((maxLabelCount - minLabelCount) / dataset.length > imbalanceThreshold) {
        console.warn('Warning: Dataset is imbalanced.');

        // Calculate the desired number of samples per class
        const desiredSampleCount = Math.ceil((maxLabelCount + minLabelCount) / 2);

        // Perform oversampling by duplicating samples in minority classes
        const balancedDataset = [];
        const labelSamples = {};
        dataset.forEach(({ text, label }) => {
            balancedDataset.push({ text, label });
            labelSamples[label] = (labelSamples[label] || 0) + 1;
            if (labelSamples[label] < desiredSampleCount && labelCounts[label] < maxLabelCount) {
                balancedDataset.push({ text, label });
                labelSamples[label] = (labelSamples[label] || 0) + 1;
            }
        });

        // Update the dataset with the balanced dataset
        dataset = balancedDataset;
        features = dataset.map((data) => data.text);
        labels = dataset.map((data) => data.label);

        console.log('Balanced Dataset Size:', balancedDataset.length);
    }
};

const makePrediction = (input) => {
    // Transform the input into TF-IDF features
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(input);

    // Calculate TF-IDF scores for the input
    const tfidfVector = tfidfFeatures.map(document => {
        const terms = tfidf.listTerms(document).map(term => term.term);
        return terms.map(term => tfidf.tfidf(term, input));
    });

    // Predict the type of discrimination
    const predictionIndex = randomForestModel.predict(tfidfVector)[0];
    const predictedLabel = uniqueLabels[predictionIndex];
    const discriminationType = labels[predictionIndex]; // Extract discrimination type from dataset

    console.log(`Predicted Label: ${predictedLabel}`);
    console.log(`Discrimination Type: ${discriminationType}`);

    return { predictedLabel, discriminationType };
};

const makeChat = async (req, res) => {
    const { input, conversationId, userid } = req.body;
    console.log('Request Body:', req.body);

    try {
        // Check if input is valid
        if (!input || typeof input !== 'string' || input.trim() === '') {
            return res.status(400).json({ error: "Invalid input. 'input' must be a non-empty string." });
        }

        let conversation;
        // Find or create conversation based on conversationId
        if (conversationId) {
            conversation = await Chat.findById(conversationId);
        } else {
            conversation = new Chat();
            conversation.title = input;
        }

        // Reset conversation history and summary if it's a new conversation
        if (!conversationId) {
            conversationHistory = [];
            summary = '';
        }

        console.log(`User: ${input}`);
        conversationHistory.push({ role: 'user', content: input });

        // Train the model if it's not trained yet
        if (!randomForestModel) {
            console.log('Random Forest model not trained yet. Training...');
            loadTrainingData();
            updateDatasetAndModel();
        }

        if (!randomForestModel) {
            console.error('Error: Random Forest model is still not available after training.');
            return res.status(500).send('Error: Random Forest model is still not available after training.');
        }

        // Make prediction based on user input
        const { predictedLabel, discriminationType } = makePrediction(input);

        if (predictedLabel && discriminationType) {
            // Append user input to dataset and retrain the model
            appendToDatasetAndModel(input, discriminationType);
        } else {
            console.error('Error: Predicted label or discrimination type is null.');
        }

        // Associate conversation with user
        conversation.userid = userid;

        // Generate AI response asynchronously
        const responsePromise = openai.chat.completions.create({
            model: process.env.GPT_MODEL,
            messages: [
                {
                    role: 'system',
                    content: process.env.SYSTEM_CONTENT
                },
                ...conversationHistory.map(({ role, content }) => ({ role, content }))
            ],
            temperature: 0.5,
            max_tokens: 1000,
            top_p: 0.8,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
        });

        // Handling response asynchronously
            responsePromise.then(async (response) => {
            console.log(`AI: ${response.choices[0].message.content}`);

            // Extract summary from AI response
            const relevantPrompt = 'Thank you for confirming. You can now request a video conference with a lawyer by clicking the Request a Video Conference button below.';
            const summaryIndex = response.choices[0].message.content.indexOf(relevantPrompt);
            if (summaryIndex !== -1) {
                summary = response.choices[0].message.content.substring(summaryIndex + relevantPrompt.length).trim();
                console.log(`Summary: ${summary}`);
            } else {
                summary = 'No relevant summary has been detected in the conversation.';
            }

            // Update conversation history with AI response
            conversationHistory.push({ role: 'assistant', content: response.choices[0].message.content });

            // Update conversation data
            conversation.messages = conversationHistory;

            // Save conversation to database
            await conversation.save();

            // Send AI response and summary to client
            const responseMessage = response.choices[0].message.content;
            res.json({ message: responseMessage, conversationId: conversation._id, summary });
        }).catch((error) => {
            console.error('Error generating AI response:', error);
            res.status(500).send('Error generating AI response');
        });

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request');
    }
};




const getConversationTitles = async (req, res) => {
    const { userid } = req.params; // Assuming userid is sent as a URL parameter
    try {
        let conversations;
        if (userid) {
            conversations = await Chat.find({userid}, 'title');
        } else {
            conversations = []; // Return an empty array if userid is not provided
        }
        res.json(conversations);
    } catch (error) {
        console.error('Error fetching conversation titles:', error);
        res.status(500).send('Error fetching conversation titles');
    }
};

const getConversationMessages = async (req, res) => {
    const { conversationId } = req.params;

    try {
        const conversation = await Chat.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.json({ messages: conversation.messages });
    } catch (error) {
        console.error('Error fetching conversation messages:', error);
        res.status(500).send('Error fetching conversation messages');
    }
};

module.exports = { makeChat, getConversationTitles, getConversationMessages };
