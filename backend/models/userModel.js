const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');

const Schema = mongoose.Schema

// User structure in database
const userSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'LGBTQ', 'Prefer not to say'],
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  barangay: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // isVerified: {
  //   type: Boolean,
  //   required: true
  // },
  // verificationToken: {
  //   type: String
  // }

})

// Static signup method
userSchema.statics.signup = async function(
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
  password) {
  
  // Validation of all fields
  if (!role || !username || !firstname || !lastname || !gender || !birthdate || !region || !province || !city || !barangay || !email || !password) {
    throw Error('All fields are required')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }
  
  const usernameExists = await this.findOne({ username })
  if (usernameExists) {
    throw Error('Username already in use')
  }

  //initialize the hashing attribute
  const salt = await bcrypt.genSalt(10)

  //hashing all the users data
  const passwordHash = await bcrypt.hash(password, salt)

      // Generate verification token
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '24h' });


  // Inserting data to database
  const user = await this.create({ 
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
    password: passwordHash,
    // verificationToken: token, 
    // isVerified: false 
    })

  //    const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     secure: false,
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS
  //     }
  //   });

  //  const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: 'Email Verification',
  //   html: `
  //     <p>Hello, ${email} </p>
  //     <p>
  //       Thank you for signing up! To complete your registration and start using our platform, please verify your email address by clicking the link below:
  //     </p>
  //     <p>
  //       <a href="http://localhost:3000/verify/${token}">Verify Email</a>
  //     </p>
  //     <p>
  //       If you didn't sign up for our service, you can safely ignore this email.
  //     </p>
  //     <p>
  //       Best regards,<br>
  //       The PARAGON Team
  //     </p>
  //   `
  // };


  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //       return res.status(500).json({ message: 'Failed to send verification email' });
  //     }
  //     console.log('Email sent: ' + info.response);
  //     console.log('Verification email sent');
  //     res.status(200).json({ message: 'Verification email sent' });

  //   });

  return user
}


// Get the user from the database
userSchema.statics.login = async function(identifier, password) {

  if (!identifier || !password) {
    throw Error('All fields are required')
  }

  const user = await this.findOne({
    $or: [{ username: identifier }, { email: identifier }]
  })
  
  // .select('username email firstname lastname gender birthdate region province city barangay') //get the user's information from the database

  if (!user) {
    throw Error('Incorrect username or email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)
