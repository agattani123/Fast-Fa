<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/public/form.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/form.js)
- [scholarship_app/public/script.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/script.js)
</details>

# Scholarship Matching

## Introduction

The "Scholarship Matching" feature is a crucial component of the scholarship application project. It aims to assist students in finding and applying for relevant scholarships based on their personal information and financial circumstances. This feature leverages the power of artificial intelligence (AI) to generate personalized scholarship recommendations and potentially automate parts of the application process.

The core functionality of "Scholarship Matching" involves collecting user data through a form, processing the data, and utilizing AI models to generate tailored scholarship suggestions. Additionally, it may provide tools or guidance to streamline the application process for the recommended scholarships.

## User Data Collection

The project includes a form (`scholarshipForm`) for users to input their personal and financial information. This data serves as the basis for the scholarship matching process.

### Form Submission

The form submission process is handled by JavaScript code in two separate files:

1. `scholarship_app/public/form.js`
2. `scholarship_app/public/script.js`

Both files contain event listeners that capture the form submission event and send the form data to a server-side endpoint (`/submit-application`) using the `fetch` API.

```javascript
// scholarship_app/public/form.js
document.getElementById('scholarshipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/submit-application', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
      .then(data => alert(data));
});
```

```javascript
// scholarship_app/public/script.js
document.getElementById('scholarshipForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const financial_info = document.querySelector('textarea[name="financial_info"]').value;

    fetch('/submit-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, financial_info }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
```

## AI Integration

The `scholarship_app/AiHelper.js` file contains functions for interacting with the OpenAI API to generate text and images. However, according to the changelog, the OpenAI API endpoint has been replaced with a new endpoint `https://google.gemini.com/v1/chat/completions` for text generation.

The `fetchFromOpenAI` function has been updated to handle the API request to the new endpoint, and the payload structure has been modified to match the requirements of the new API endpoint. The `model` field is now set to `"gemini"`, and the `messages` field is now an array containing the user's prompt as an object with `role` and `content` fields.

```javascript
// Utility function to fetch from the new API endpoint
async function fetchFromOpenAI(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Update the Authorization header with the appropriate API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching from the new API:", error);
    throw new Error("Failed to fetch from the new API");
  }
}

// Function to generate text using the new API endpoint
async function generateText(prompt) {
  const chatUrl = "https://google.gemini.com/v1/chat/completions";
  const payload = {
    model: "gemini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const data = await fetchFromOpenAI(chatUrl, payload);
  return data.choices[0].message.content;
}
```

The core functionality of generating text based on a given prompt remains the same, but with a different underlying API implementation.

The `generateImage` function and the example usage code have been removed from the updated file, as they are not relevant to the "Scholarship Matching" feature.