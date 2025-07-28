<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)
- [wiki/Backend Systems/Server-side Components.md](https://github.com/agattani123/Fast-Fa/blob/master/wiki/Backend Systems/Server-side Components.md)

</details>

# Server-side Components

## Introduction

The server-side components of this project are responsible for handling incoming HTTP requests, generating personalized scholarship recommendations based on user input, and rendering dynamic HTML responses. The core functionality is implemented using Node.js and the Express.js framework, with integration to the OpenAI API for generating tailored recommendations.

The main server-side component is the `server.js` file, which sets up an Express.js server, defines routes and request handlers, and handles the submission of scholarship applications. The server listens on port 3000 and serves static files from the `public` directory. Additionally, it utilizes the `creds.js` file to store the OpenAI API key securely.

Sources: [scholarship_app/server.js](), [scholarship_app/creds.js](), [wiki/Backend Systems/Server-side Components.md]()

## Express.js Server Setup

The server is initialized using the Express.js framework, and the necessary middleware is configured:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));
```

The server listens on port 3000 and logs a message when it starts running:

```javascript
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Sources: [scholarship_app/server.js:1-10](), [scholarship_app/server.js:41-43]()

## Routing and Request Handling

The server defines two routes: a root route (`/`) and a route for submitting scholarship applications (`/submit-application`).

### Root Route

The root route (`/`) is a simple GET route that sends the response "Hello World":

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

Sources: [scholarship_app/server.js:11-13]()

### Submit Application Route

The `/submit-application` route is a POST route that handles the submission of scholarship applications. It extracts the user's first name, last name, and financial information from the request body:

```javascript
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;
    // ...
});
```

Sources: [scholarship_app/server.js:24-26]()

## OpenAI Integration

The server integrates with the OpenAI API to generate personalized scholarship recommendations based on the user's financial information. This integration is implemented in the `fetchOpenAI` and `generateText` functions.

### Fetching from OpenAI API

The `fetchOpenAI` function is an asynchronous function that sends a POST request to the OpenAI API with the provided payload. It retrieves the OpenAI API key from the `creds.js` file and includes it in the request headers. The function returns the response data as JSON:

```javascript
async function fetchOpenAI(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.openAiKey}`,
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

Sources: [scholarship_app/server.js:14-24](), [scholarship_app/creds.js]()

### Generating Text with OpenAI

The `generateText` function is an asynchronous function that generates text using the OpenAI API based on the provided prompt. It constructs a payload with the prompt and sends it to the OpenAI API using the `fetchOpenAI` function:

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

  const data = await fetchOpenAI(chatUrl, payload);
  return data.choices[0].message.content;
}
```

Sources: [scholarship_app/server.js:27-38]()

## Scholarship Recommendation Generation

Within the `/submit-application` route, the server generates personalized scholarship recommendations using the `generateText` function and the user's financial information as the prompt:

```javascript
const output = await generateText(`"

    Making this prompt super simplistic. 
    Take a prompt and give me a list and URLs to specific scholarships that would specifically give me access to opportunities." + 
    "I do not want any opportunity that are generalized to a big group of students and rather want opportunities as specific to the prompt as possible." +
    // ... (prompt construction omitted for brevity)
    
    "The prompt is follows: ${financial_info}`);
```

The generated output is an HTML list of scholarship opportunities, with each opportunity containing fields like the scholarship name, a description of why the user is a good fit, the prize amount, the deadline, and a link to apply.

Sources: [scholarship_app/server.js:28-39]()

## Response Rendering

After generating the scholarship recommendations, the server constructs an HTML response with the recommendations list and sends it back to the client:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        /* ... (CSS styles omitted for brevity) */
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

The response includes a container with the user's first name and the list of scholarship recommendations. It also includes two buttons: a "Home" button that redirects to the `index.html` page and a "Feedback" button that opens a feedback form in a new window.

Sources: [scholarship_app/server.js:40-121]()

## Conclusion

The server-side components of this project provide a robust foundation for handling incoming HTTP requests, integrating with external APIs (in this case, OpenAI), generating dynamic content based on user input, and rendering HTML responses. The use of Node.js and Express.js allows for efficient and scalable server-side processing, while the integration with OpenAI enables the generation of personalized scholarship recommendations tailored to the user's financial information.