const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../dev-data/data/users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(usersFile));
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

exports.getAllUsers = (req, res) => {
  const users = readUsers();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
};

exports.getUser = (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u._id === req.params.id);
  if (!user) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }
  res.status(200).json({ status: 'success', data: { user } });
};

exports.createUser = (req, res) => {
  const users = readUsers();
  const newUser = { _id: Date.now().toString(), ...req.body };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ status: 'success', data: { user: newUser } });
};

exports.updateUser = (req, res) => {
  const users = readUsers();
  const userIdx = users.findIndex((u) => u._id === req.params.id);
  if (userIdx === -1) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }
  users[userIdx] = { ...users[userIdx], ...req.body };
  writeUsers(users);
  res.status(200).json({ status: 'success', data: { user: users[userIdx] } });
};

exports.deleteUser = (req, res) => {
  const users = readUsers();
  const userIdx = users.findIndex((u) => u._id === req.params.id);
  if (userIdx === -1) {
    return res.status(404).json({ status: 'fail', message: 'User not found' });
  }
  users.splice(userIdx, 1);
  writeUsers(users);
  res.status(204).json({ status: 'success', data: null });
};
// ...existing code...
