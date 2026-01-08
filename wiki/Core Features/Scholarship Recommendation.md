<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/public/script.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/script.js)

</details>

# Scholarship Recommendation

## Introduction

The "Scholarship Recommendation" feature within the project aims to provide personalized scholarship recommendations to users based on their financial information and other relevant criteria. This feature leverages the capabilities of OpenAI's GPT-4 language model to generate tailored scholarship recommendations for each user.

## Architecture and Data Flow

The "Scholarship Recommendation" feature consists of the following key components:

1. **Client-side UI**: The user interface (UI) is implemented in the `script.js` file, which handles user interactions and form submissions.
2. **Server-side API**: The server-side API receives the user's financial information and other relevant data from the client-side UI.
3. **OpenAI API Integration**: The project integrates with the OpenAI API to leverage the GPT-4 language model for generating scholarship recommendations.

The data flow for the "Scholarship Recommendation" feature is as follows:

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant OpenAI

    Client->>Server: Submit user information (firstName, lastName, financial_info)
    Server->>OpenAI: Request scholarship recommendations (user information)
    OpenAI-->>Server: Scholarship recommendations
    Server-->>Client: Scholarship recommendations
```

Sources: [scholarship_app/public/script.js](), [scholarship_app/AiHelper.js]()

## Client-side UI

The client-side UI is responsible for capturing user input and submitting the data to the server. The relevant code is located in the `script.js` file.

### Form Submission

The `script.js` file listens for the `submit` event on the `scholarshipForm` element and handles the form submission:

```javascript
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
        // Display the response from the server
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
```

Sources: [scholarship_app/public/script.js:10-26]()

This code collects the user's first name, last name, and financial information from the form inputs and sends a POST request to the `/submit-application` endpoint on the server with the collected data.

### UI Interactions

The `script.js` file also includes event listeners for mouse hover effects on the "Download" button:

```javascript
document.getElementById('download-button').addEventListener('mouseover', function() {
    this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
});

document.getElementById('download-button').addEventListener('mouseout', function() {
    this.style.boxShadow = 'none';
});
```

Sources: [scholarship_app/public/script.js:1-6]()

These event listeners add and remove a box shadow effect on the "Download" button when the user hovers over or moves the cursor away from the button, respectively.

## Server-side API

The server-side API is responsible for receiving the user's information from the client-side UI and interacting with the OpenAI API to generate scholarship recommendations.

### OpenAI API Integration

The `AiHelper.js` file contains functions to interact with the OpenAI API for generating text and images using the GPT-4 and DALL-E 2 models, respectively.

#### Utility Function

The `fetchFromOpenAI` function is a utility function that handles the communication with the OpenAI API:

```javascript
async function fetchFromOpenAI(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
    throw new Error("Failed to fetch from OpenAI API");
  }
}
```

Sources: [scholarship_app/AiHelper.js:2-15]()

This function sends a POST request to the specified OpenAI API endpoint with the provided payload and returns the response as JSON.

#### Text Generation

The `generateText` function uses the OpenAI GPT-4 model to generate text based on a given prompt:

```javascript
async function generateText(prompt) {
  const chatUrl = "https://api.openai.com/v1/chat/completions";
  const payload = {
    model: "gpt-4",
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

Sources: [scholarship_app/AiHelper.js:17-27]()

This function constructs a payload with the provided prompt and sends it to the OpenAI API's chat completions endpoint using the `fetchFromOpenAI` utility function. The generated text response is then returned.

#### Image Generation

The `generateImage` function uses the OpenAI DALL-E 2 model to generate an image based on a given prompt:

```javascript
async function generateImage(prompt) {
  const dalleUrl = "https://api.openai.com/v1/images/generations";
  const payload = {
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "256x256",
  };

  const data = await fetchFromOpenAI(dalleUrl, payload);
  return data.data[0].url;
}
```

Sources: [scholarship_app/AiHelper.js:29-38]()

This function constructs a payload with the provided prompt and sends it to the OpenAI API's image generations endpoint using the `fetchFromOpenAI` utility function. The generated image URL is then returned.

#### Example Usage

The `AiHelper.js` file includes an example usage of the `generateText` and `generateImage` functions:

```javascript
(async () => {
  try {
    const textPrompt = "Explain quantum mechanics in simple terms";
    const imagePrompt = "Picture of a cute cat";

    const textResponse = await generateText(textPrompt);
    console.log("Text Response:", textResponse);

    const imageUrl = await generateImage(imagePrompt);
    console.log("Image URL:", imageUrl);
  } catch (error) {
    console.log(error.message);
  }
})();
```

Sources: [scholarship_app/AiHelper.js:40-52]()

This code demonstrates how to use the `generateText` and `generateImage` functions with sample prompts and logs the generated text and image URL to the console.

## Scholarship Recommendation Generation

While the provided source files do not contain the specific implementation for generating scholarship recommendations, it is expected that the server-side API would utilize the `generateText` function from the `AiHelper.js` module to generate personalized scholarship recommendations based on the user's financial information and other relevant data.

The server-side API would likely construct a prompt for the GPT-4 model, incorporating the user's financial information and any other relevant criteria, and pass it to the `generateText` function. The generated text response would then be processed and returned to the client-side UI as the scholarship recommendations.

## Conclusion

The "Scholarship Recommendation" feature leverages the power of OpenAI's GPT-4 language model to provide personalized scholarship recommendations to users based on their financial information and other relevant criteria. The feature consists of a client-side UI for capturing user input, a server-side API for interacting with the OpenAI API, and the integration with the OpenAI API for generating text and image content. While the specific implementation for generating scholarship recommendations is not provided in the source files, the project demonstrates the integration with the OpenAI API and the potential for leveraging its capabilities for various use cases.