const bcrypt = require('bcrypt');
const usersRepository = require('./users-repository');

async function getUsers() {
  return usersRepository.getUsers();
}

async function getUser(id) {
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}

async function loginUser(email, password) {
  const user = await usersRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('INVALID_PASSWORD');
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('INVALID_PASSWORD');
  }

  return { message: 'Login successful' };
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
