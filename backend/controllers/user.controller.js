const userService = require('../services/user.service');

exports.signup = async (req, res) => {
  try {
    const task = await userService.signup(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to signup" });
  }
};


exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const task = await userService.login(req.body);
    res.json(task);
  } catch (error) {
    console.error("Failed to login", error);
    res.status(500).json({ message: "Failed to login" });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const deletedUser = await userService.deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Failed to delete user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, { name, email });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

exports.getUserByName = async (req, res) => {
  const { name } = req.params;

  try {
    const user = await userService.getUserByName(name);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed to get user:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
};
