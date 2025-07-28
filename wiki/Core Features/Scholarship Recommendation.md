<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [wiki/Core Features/Scholarship Recommendation.md](https://github.com/agattani123/Fast-Fa/blob/master/wiki/Core Features/Scholarship Recommendation.md)
- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/public/form.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/form.js)
- [scholarship_app/public/script.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/script.js)

</details>

# Scholarship Recommendation

## Introduction

The "Scholarship Recommendation" feature within the project aims to provide personalized scholarship recommendations to users based on their financial information and other relevant criteria. This feature leverages the power of OpenAI's GPT-4 language model to generate tailored recommendations for scholarships that best suit the user's needs.

The feature consists of two main components: a client-side form for collecting user data and a server-side component that interacts with the OpenAI API to generate scholarship recommendations based on the user's input.

Sources: [scholarship_app/public/form.js](), [scholarship_app/public/script.js](), [scholarship_app/AiHelper.js]()

## Client-side Form

The client-side form is responsible for collecting user information, such as their first name, last name, and financial details. This information is then sent to the server for processing and generating scholarship recommendations.

### Form Submission

The form submission process is handled by JavaScript event listeners attached to the form element. When the form is submitted, the following steps occur:

1. The default form submission behavior is prevented using `event.preventDefault()`.
2. The form data is either:
   a. Serialized and sent as `FormData` using the `fetch` API (in `form.js`).
   b. Extracted from individual form fields and sent as a JSON payload using the `fetch` API (in `script.js`).
3. The server's `/submit-application` endpoint is called with the form data using the `POST` method.
4. The server's response is handled, either by displaying an alert (in `form.js`) or logging the response to the console (in `script.js`).

```javascript
// form.js
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
// script.js
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

Sources: [scholarship_app/public/form.js](), [scholarship_app/public/script.js]()

### UI Enhancements

The `script.js` file also includes some basic UI enhancements for the "Download" button, adding a box shadow effect on hover and removing it on mouse out.

```javascript
document.getElementById('download-button').addEventListener('mouseover', function() {
    this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
});

document.getElementById('download-button').addEventListener('mouseout', function() {
    this.style.boxShadow = 'none';
});
```

Source: [scholarship_app/public/script.js]()

## Server-side Processing

The server-side component is responsible for interacting with the OpenAI API to generate scholarship recommendations based on the user's input. This is achieved through the `AiHelper.js` module, which provides utility functions for fetching data from the OpenAI APIs.

### OpenAI API Integration

The `AiHelper.js` module contains two main functions:

1. `generateText(prompt)`: This function sends a prompt to the OpenAI GPT-4 language model and returns the generated text response.
2. `generateImage(prompt)`: This function sends a prompt to the OpenAI DALL-E 2 image generation model and returns the URL of the generated image.

Both functions use a common `fetchFromOpenAI` utility function to make API requests to the respective OpenAI endpoints.

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

The `fetchFromOpenAI` function is responsible for making the actual API requests to OpenAI, handling authentication and error handling.

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

Note: The provided code includes an example usage of the `generateText` and `generateImage` functions, but it does not show how these functions are integrated with the server-side logic for generating scholarship recommendations based on the user's input.

Sources: [scholarship_app/AiHelper.js]()

## Sequence Diagram

The following sequence diagram illustrates the high-level flow of the "Scholarship Recommendation" feature:

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant OpenAI API

    Note over Client: User fills out scholarship form
    Client->>Server: POST /submit-application (form data)
    Server->>OpenAI API: Request scholarship recommendations (user data)
    OpenAI API-->>Server: Scholarship recommendations
    Server-->>Client: Scholarship recommendations
    Note over Client: Display recommendations to user
```

1. The user fills out the scholarship form on the client-side.
2. The client sends the form data to the server via a `POST` request to the `/submit-application` endpoint.
3. The server processes the user data and sends a request to the OpenAI API for scholarship recommendations.
4. The OpenAI API generates scholarship recommendations based on the user data and sends them back to the server.
5. The server forwards the scholarship recommendations to the client.
6. The client displays the scholarship recommendations to the user.

Sources: [scholarship_app/public/form.js](), [scholarship_app/public/script.js](), [scholarship_app/AiHelper.js]()

## Future Enhancements

While the provided source files cover the basic functionality of the "Scholarship Recommendation" feature, there are several potential enhancements that could be implemented:

1. **Improved User Interface**: The current implementation lacks a dedicated user interface for displaying the scholarship recommendations. A dedicated UI component or page could be added to enhance the user experience and provide more detailed information about the recommended scholarships.

2. **Additional Filtering and Sorting**: The current implementation does not include any filtering or sorting options for the scholarship recommendations. Adding the ability to filter and sort recommendations based on criteria such as scholarship amount, deadline, or eligibility requirements could improve the relevance and usability of the recommendations.

3. **Integration with Scholarship Databases**: Instead of relying solely on the OpenAI API for generating recommendations, the application could integrate with existing scholarship databases or APIs to provide more comprehensive and up-to-date information about available scholarships.

4. **User Authentication and Personalization**: Implementing user authentication and personalization features could allow users to save their information and preferences, enabling the application to provide more tailored and personalized scholarship recommendations over time.

5. **Recommendation Explanations**: The current implementation does not provide any explanations or rationale for the recommended scholarships. Adding explanations or highlighting the key factors that led to each recommendation could improve transparency and help users better understand the recommendations.

6. **Error Handling and Feedback**: Enhancing error handling and providing feedback to users in case of errors or API failures could improve the overall user experience and make the application more robust.

These enhancements are not directly evident from the provided source files but could be considered for future iterations of the "Scholarship Recommendation" feature to improve its functionality, usability, and overall user experience.

Sources: [scholarship_app/public/form.js](), [scholarship_app/public/script.js](), [scholarship_app/AiHelper.js]()

## Conclusion

The "Scholarship Recommendation" feature leverages the power of OpenAI's language models to provide personalized scholarship recommendations to users based on their financial information and other relevant criteria. The feature consists of a client-side form for collecting user data and a server-side component that interacts with the OpenAI API to generate recommendations.

While the provided source files cover the basic functionality, there is potential for further enhancements, such as improved user interfaces, additional filtering and sorting options, integration with scholarship databases, user authentication and personalization, recommendation explanations, and enhanced error handling and feedback.

Overall, the "Scholarship Recommendation" feature aims to simplify the process of finding and applying for suitable scholarships, ultimately helping students access educational opportunities and financial support.