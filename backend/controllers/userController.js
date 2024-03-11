const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  //Create a token using the ID provided
  //Expires in one day
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' });
};

// Login a user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    console.log('Login Request Body:', req.body); // Log the request body
    const user = await User.login(identifier, password); // Get the user from the model > db 

    // Create a token
    // Get the user id from the model and pass it as argument to the createToken function
    const token = createToken(user._id);

    //response on local storage
    res.status(200).json({ token });
    //user: user.email
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Signup a user
const signupUser = async (req, res) => {
  const {
    username,
    firstname,
    lastname,
    gender,
    birthdate,
    region,
    province,
    city,
    barangay,
    email,
    password
  } = req.body;

  try {
    console.log('Signup Request Body:', req.body); // Log the request body
    // Check if all required fields are provided
    if (!username || !firstname || !lastname || !gender || !birthdate || !region || !province || !city || !barangay || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.signup(
      username,
      firstname,
      lastname,
      gender,
      birthdate,
      region,
      province,
      city,
      barangay,
      email,
      password);

    // Create a token
    const token = createToken(user._id);

    //response on local storage
    res.status(200).json({ token });
    //user: user.email
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

module.exports = { signupUser, loginUser };
