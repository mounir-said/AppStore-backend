const User = require('../models/userModel');
const multer = require('multer');
require('dotenv').config({ path: './config/.env' }); 


// Define storage settings for Multer
const myStorage = multer.diskStorage({
    destination: './uploads', // Specify the destination folder for uploaded files
    filename: (req, file, cb) => {
        let date = Date.now();
        let fl = date + "." + file.mimetype.split('/')[1];
        cb(null, fl); // Set the filename
    }
});

// Initialize multer with storage settings
const upload = multer({ storage: myStorage });

// Register a new user
exports.registerUser = upload.single('imageURL'), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        
        // Extract imageURL from req.file
         const imageURL = req.file ? req.file.path : "";

        // Create a new user instance including imageURL
        const user = new User({ firstName, lastName, email, password, imageURL });

        // Save the user to the database
        await user.save();

        // Generate authentication token
        const token = user.generateAuthToken();

        // Send response with user details and token
        res.status(201).json({ user, token });
    } catch (error) {
        // Handle error if registration fails
        res.status(400).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // If user does not exist, return error
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        // If password does not match, return error
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate authentication token
        const token = user.generateAuthToken();

        // Send response with user details and token
        res.json({ user, token });
    } catch (error) {
        // Handle error if login fails
        res.status(500).json({ message: error.message });
    }
};
  


// GET all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// PUT/UPDATE a user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.imageURL = req.body.imageURL;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

