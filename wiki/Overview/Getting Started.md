<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md)
- [scholarship_app/package.json](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/package.json)
- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
</details>

# Getting Started

## Introduction

FastFa! is a web application that aims to simplify the process of finding and applying for scholarships. It leverages OpenAI's GPT-4 language model to generate a personalized list of scholarship opportunities based on the user's input. The application is built using Node.js, Express.js, and JavaScript, with a focus on providing a user-friendly interface and a seamless experience.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

## Application Architecture

The FastFa! application follows a client-server architecture, with the backend server handling the API requests and the frontend providing the user interface. The backend is built using Node.js and Express.js, while the frontend is developed with HTML, CSS, and JavaScript.

```mermaid
graph TD
    Client[Client] -->|HTTP Request| Server[Server]
    Server -->|HTTP Response| Client
    Server -->|OpenAI API Request| OpenAI[OpenAI API]
    OpenAI -->|Response| Server
```

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

## Backend Server

The backend server is responsible for handling incoming HTTP requests, processing user input, and generating scholarship recommendations using the OpenAI API. It is built using Express.js, a popular Node.js web application framework.

### Server Setup

The server is initialized and configured in the `server.js` file. It sets up the Express.js application, defines middleware for parsing request bodies, and serves static files from the `public` directory.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));
```

Sources: [scholarship_app/server.js:1-9](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L1-L9)

### OpenAI API Integration

The server integrates with the OpenAI API to generate scholarship recommendations based on the user's input. The `fetchFromOpenAI` function is responsible for making API requests to OpenAI, while the `generateText` function utilizes the `fetchFromOpenAI` function to generate text based on a given prompt.

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

Sources: [scholarship_app/server.js:25-43](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L25-L43), [scholarship_app/server.js:46-57](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L46-L57)

### Scholarship Recommendation Endpoint

The server exposes a `/submit-application` endpoint that handles incoming POST requests containing the user's information. Upon receiving a request, the server generates a prompt based on the user's input and passes it to the `generateText` function to obtain scholarship recommendations from the OpenAI API.

```javascript
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`"Take a prompt and give me a list and URLs to specific scholarships that would specifically give me access to opportunities." + 
    "I do not want any opportunity that are generalized to a big group of students and rather want opportunities as specific to the prompt as possible." +
    "Each opportunity should include a description of what that student specifically a good fit.  Facets include age, race, gender, location, future occupation, interests, and future plans." + 
    "Also, the complete list should have addressed at least each facet provided in the prompt. For example, if the student wants to study in Hawaii then at least one opportunity in that area and please write that out explicitly." +
    "If a student is from a certain area, you must provide at least one opportunity that is specific to that area and please write this our explicitly." +
    "Please be VERY specific as to which part of the prompt this opportunity addresses. If it is not in the prompt, absolutely do not include that opportunity. Only include opportunities DIRECTLY applicable to the prompt." +
    "It must be very specific to the prompt and tailored directly to it. Give me at least 10 distinct results. Structure the output as follows: I want an HTML list with each opportunity having the fields" +
    "\"Scholarship\" (Opportunity name), \"Why me?\" (Description of why I am a good fit and what Facets it addresses), \"How much?\" (Prize Amount), and \"Deadline\" (around when should you apply by), and \"APPLY\" (a URL of where to apply, have the link hyperlinked to APPLY and not in front of a colon). I just want the html do not include any other text before and after (include any quotation marks, i just want the html)" +
    "The prompt is follows: ${financial_info}`);

    console.log('Application Received:', firstName, lastName, financial_info, output);
    // Replace "APPLY" with a button
    const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);

    res.send(`
    <!DOCTYPE html>
    <html>
    <!-- ... -->
    </html>
    `);
});
```

The server sends an HTML response containing the scholarship recommendations, formatted with CSS styles and interactive buttons for applying to each scholarship.

Sources: [scholarship_app/server.js:60-117](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L60-L117)

## Frontend User Interface

The frontend user interface is built using HTML, CSS, and JavaScript. It provides a visually appealing and user-friendly experience for users to input their information and view the generated scholarship recommendations.

### HTML Structure

The HTML structure defines the layout and elements of the user interface, including input fields for user information and a container to display the scholarship recommendations.

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

Sources: [scholarship_app/server.js:82-116](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L82-L116)

### CSS Styling

The CSS styles define the visual appearance of the user interface, including colors, fonts, and layout. The application uses a gradient background and responsive design principles to provide an engaging and accessible experience.

```css
body {
    font-family: Arial, sans-serif;
    background: linear-gradient(-45deg, #3d7ec7, #7f91a9, #4b7c86, #ecf0ef);
    background-size: 400% 400%;
    margin: 0
    padding: 0
    animation: gradient 10s ease infinite;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    padding-top: 400px;
}

.container {
    background: white;
    border-radius: 8px;
    padding: 20px;
    max-width: 600px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
    margin-top: 400px;
}

/* Additional styles for scholarship list, buttons, and animations */
```

Sources: [scholarship_app/server.js:83-116](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L83-L116)

### JavaScript Interactivity

The JavaScript code handles user interactions, such as form submissions and button clicks. It also provides functionality for making API requests to the backend server and updating the user interface with the scholarship recommendations.

```javascript
// JavaScript code for handling user interactions and updating the UI
```

Sources: [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js) (No specific JavaScript code provided in the source files)

## Conclusion

FastFa! is a web application that aims to simplify the scholarship application process by leveraging OpenAI's GPT-4 language model to generate personalized scholarship recommendations based on user input. The application follows a client-server architecture, with the backend server built using Node.js and Express.js, and the frontend user interface developed with HTML, CSS, and JavaScript. By integrating with the OpenAI API and providing a user-friendly interface, FastFa! aims to help students find and apply for relevant scholarship opportunities more efficiently.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)