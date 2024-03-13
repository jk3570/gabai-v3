const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

// User structure in database
const userSchema = new Schema({
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
})

// Static signup method
userSchema.statics.signup = async function(username,
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
  if (!username || !firstname || !lastname || !gender || !birthdate || !region || !city || !email || !password) {
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

  // Inserting data to database
  const user = await this.create({ 
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
    password: passwordHash })

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
