const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/feedback', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Feedback schema
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Express middleware
app.use(express.static('public'));
app.use(express.json());

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/feedback.html');
});

// Route to handle form submissions
app.post('/submit-feedback', async (req, res) => {
    const { name, email, feedback } = req.body;

    try {
        const newFeedback = new Feedback({ name, email, feedback });
        await newFeedback.save();
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
