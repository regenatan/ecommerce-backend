const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const AuthenticateWithJWT = require('../middlewares/AuthenticateWithJWT');


// POST register a new user
router.post('/register', async (req, res) => {
    console.log('Register route hit with body:', req.body);
  try {
    // Register user with the new payload structure
    const user = await userService.registerUser(req.body);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST login a user
router.post('/login', async (req, res) => {
  console.log('Login route hit with body:', req.body);
 try {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);

    if (user){
      const token = jwt.sign({
      userId: user.id },
      process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ 
      message: "Login successful", token, user_id: user.id });
    }
    else {
      throw new Error("Unable to get user"); 
    }
    
  } catch (error) {
    console.log(e)
    res.status(400).json({ 
      'message': 'Unable to log in',
      'error': error.message });
    }
  
});

router.get('/me', AuthenticateWithJWT, async (req, res) =>{
try {
const user = await userService.getUserDetailsById(req.userId);
if (!user) { 
  return res.json(404).json({
    message: "User not found"
  })
}

  const {password, ...userWithoutPassword} = user;
  res.json({
    'user': userWithoutPassword
});

} catch (e){
  res.status(500).json({
    message: e.message
  })
 }
} )

// PUT update user details
router.put('/me', AuthenticateWithJWT, async (req, res) => {
  try {
    const userId = req.userId; // Extracted from JWT
    const userDetails = req.body;

    await userService.updateUserDetails(userId, userDetails);
    res.json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE delete user account
router.delete('/me', AuthenticateWithJWT, async (req, res) => {
  try {
    const userId = req.userId; // Extracted from JWT

    await userService.deleteUserAccount(userId);
    res.json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;