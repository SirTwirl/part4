const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialUsers = [
  {
    username: 'root',
    name: 'Superuser',
    passwordHash: '$2b$10$wVa3S8C3pE3B2yH8jN4e7.a8eKqO9P1X5y6z7w8v9u0t1s2r3q4w'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}