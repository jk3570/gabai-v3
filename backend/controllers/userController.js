const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  //Create a token using the ID provided

  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1h' });
};

// Login a user via Google
async function loginWithGoogle(req, res) {
  const { gEmail } = req.body;

  // Validate the request
  if (!gEmail) {
    return res.status(400).json({ error: "Missing email" });
  }

  try {
    const user = await User.findOne({ email: gEmail });

    if (!user) {
      return res.status(401).json({ message: "The email doesn't exists" });
    }

    const token = createToken(user._id);

    res.status(200).json({
      token,
      userid: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      gender: user.gender,
      birthdate: user.birthdate,
      province: user.province,
      region: user.region,
      barangay: user.barangay,
      city: user.city,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Login a user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    console.log('Login Request Body:', req.body); // Log the request body
    const user = await User.login(identifier, password); // Get the user from the model > db 

    // Create a token
    // Get the user id from the model and pass it as argument to the createToken function
    const token = createToken(user._id);

    //Response on local storage
    res.status(200).json({ 
      token,
      userid: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      gender: user.gender,
      birthdate: user.birthdate,
      province: user.province,
      region: user.region,
      barangay: user.barangay,
      city: user.city,
        });
    //user: user.email
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// Signup a user
const signupUser = async (req, res) => {
  const {
    role,
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
    if (!role || !username || !firstname || !lastname || !gender || !birthdate || !region || !province || !city || !barangay || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await User.signup(
      role,
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

    // response on local storage
    res.status(200).json({ 
      token,
      userid: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      gender: user.gender,
      region: user.region,
      birthdate: user.birthdate,
      province: user.province,
      barangay: user.barangay,
      city: user.city,
    });

    //user: user.email
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};

  // get all the users
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  // update the user pro  file
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userData = req.body;
    try {
      // Logic to update user data
      res.status(200).json(/* updated user data */);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };  

// Define route to get total count
const totalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Endpoint to get total count per gender
const countsByGender = async (req, res) => {
  try {
    const countsByGender = await User.aggregate([
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 }, 
        },
      },
    ]);
    res.json(countsbygender);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Endpoint to get total count per gender
const countsByRegion = async (req, res) => {
  try {
    const countsByRegion = await User.aggregate([
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 }, 
        },
      },
    ]);
    res.json(countsByRegion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const countsByAge = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Calculate age and categorize users
    const countsByAge = {
      '18-20': 0,
      '21-30': 0,
      '31-40': 0,
      '41-50': 0,
      '51-59': 0,
      '60 above': 0
    };

    const currentDate = new Date();
    users.forEach(user => {
      const birthDate = new Date(user.birthdate);
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      if (age >= 18 && age <= 20) {
        countsByAge['18-20']++;
      } else if (age >= 21 && age <= 30) {
        countsByAge['21-30']++;
      } else if (age >= 31 && age <= 40) {
        countsByAge['31-40']++;
      } else if (age >= 41 && age <= 50) {
        countsByAge['41-50']++;
      } else if (age >= 51 && age <= 59) {
        countsByAge['51-59']++;
      } else {
        countsByAge['60 above']++;
      }
    });

    res.json(countsByAge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { signupUser, loginUser, getAllUsers, updateUser, totalUsers,  loginWithGoogle, countsByGender, countsByRegion, countsByAge};
