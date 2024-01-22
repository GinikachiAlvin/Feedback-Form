// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the feedback form and feedback message elements
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Add a submit event listener to the feedback form
    feedbackForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get values from the input fields and trim whitespace
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback').value.trim();

        // Check if any of the required fields are empty
        if (!name || !email || !feedback) {
            // Display an alert if any field is empty
            alert('Please fill in all fields');
            return;
        }

        // Create an object with the form data
        const formData = {
            name,
            email,
            feedback
        };

        // Send a POST request to the server with the form data in JSON format
        fetch('/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            // Check if the feedback submission was successful
            if (data.success) {
                // Display a success message in the feedback message element
                feedbackMessage.textContent = 'Feedback submitted successfully!';
                // Reset the form after successful submission
                feedbackForm.reset();
            } else {
                // Display an alert if there was an error submitting feedback
                alert('Error submitting feedback. Please try again later.');
            }
        })
        .catch(error => {
            // Log any errors that occurred during the fetch operation
            console.error('Error:', error);
        });
    });
});
