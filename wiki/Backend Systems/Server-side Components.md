<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# Server-side Components

## Introduction

The server-side components of this project are responsible for handling incoming HTTP requests, generating personalized scholarship recommendations based on user input, and rendering dynamic HTML responses. The core functionality revolves around the `server.js` file, which sets up an Express.js server and defines the necessary routes and handlers.

The server utilizes the OpenAI API to generate tailored scholarship recommendations based on the user's provided financial information. The API key for OpenAI is stored in the `creds.js` file, which is imported and used within the server code.

## Server Setup and Configuration

### Express.js Server

The server is initialized using the Express.js framework, which provides a minimalistic and flexible web application server for Node.js. The server listens on port 3000 by default.

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Sources: [scholarship_app/server.js:1-2,19-21]()

### Middleware

The server uses several middleware functions to handle various aspects of the request-response cycle:

- `express.json()`: Parses incoming requests with JSON payloads.
- `express.static('public')`: Serves static files from the `public` directory.
- `bodyParser.urlencoded({ extended: true })`: Parses URL-encoded request bodies.

```javascript
app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));
```

Sources: [scholarship_app/server.js:5-7]()

## Routes and Handlers

### Root Route (`/`)

The root route (`/`) is a simple GET route that responds with the string "Hello World".

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

Sources: [scholarship_app/server.js:9-11]()

### Scholarship Application Route (`/submit-application`)

The `/submit-application` route is a POST route that handles the submission of a scholarship application. It expects the following fields in the request body: `firstName`, `lastName`, and `financial_info`.

The `financial_info` field is used as the prompt for the `generateText` function, which generates a list of personalized scholarship recommendations using the OpenAI API.

```javascript
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`...`);

    // Replace "APPLY" with a button
    const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);

    res.send(`
        <!DOCTYPE html>
        <html>
        ...
    `);
});
```

Sources: [scholarship_app/server.js:13-89]()

#### `generateText` Function

The `generateText` function is responsible for generating the personalized scholarship recommendations using the OpenAI API. It takes a prompt as input and returns the generated text response from the API.

```javascript
async function generateText(prompt) {
  const chatUrl = "https://open-ai.com/v1/chat/completions";
  const payload = {
    model: "open-ai",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const data = await fetchFromGemini(chatUrl, payload);
  return data.choices[0].message.content;
}
```

Sources: [scholarship_app/server.js:33-46]()

The `fetchFromGemini` function is used to make the API request to the OpenAI API. It takes the API URL and the payload as input and returns the API response as JSON.

```javascript
async function fetchGemini(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer sk-gemikey72893789237`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    throw new Error("Failed to fetch from Gemini API");
  }
}
```

Sources: [scholarship_app/server.js:13-28]()

### OpenAI API Key

The OpenAI API key is imported from the `creds.js` file, which is not provided in the given source files. However, it is likely that this file exports an object containing the API key as a property.

```javascript
import default {
    openAiKey: APIKEY,
};
```

Sources: [scholarship_app/creds.js]()

## Response Rendering

The server generates an HTML response containing the personalized scholarship recommendations. The response includes the following components:

- A container div with a heading displaying the user's first name.
- An unordered list (`<ul>`) containing the scholarship recommendations, where each list item (`<li>`) represents a single recommendation with the following fields:
  - Scholarship (Opportunity name)
  - "Why me?" (Description of why the user is a good fit and what facets it addresses)
  - "How much?" (Prize Amount)
  - "Deadline" (Approximate deadline for applying)
  - "APPLY" (A hyperlinked button to the application URL)

The HTML response also includes some basic styling using CSS, including a gradient background, centered layout, and hover effects for the buttons.

Additionally, the response includes two fixed-position buttons:

- A "Home" button that redirects to the `index.html` file.
- A "Feedback" button that opens a Google Forms link in a new tab for providing feedback.

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* CSS styles */
    </style>
</head>
<body>
    <button class="button-nav home-button" onclick="location.href='index.html';">Home</button>
    <button class="button-nav feedback-button" onclick="window.open('https://forms.gle/2KvT9ztjWGgbKuGX9', '_blank');">Feedback</button>
    <div class="container">
        <h1>we got you, ${firstName} :)</h1>
        <ul class="scholarship-list">${modifiedOutput}</ul>
    </div>
</body>
</html>
```

Sources: [scholarship_app/server.js:54-89]()

## Conclusion

The server-side components of this project provide a simple yet effective way to generate personalized scholarship recommendations based on user input. The Express.js server handles incoming requests, utilizes the OpenAI API to generate recommendations, and renders dynamic HTML responses with the recommendations. The server also includes basic styling and navigation buttons for an enhanced user experience.