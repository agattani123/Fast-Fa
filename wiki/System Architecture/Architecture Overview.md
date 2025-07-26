<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md)
- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
- [public/index.html](https://github.com/agattani123/Fast-Fa/blob/master/public/index.html)
- [public/styles.css](https://github.com/agattani123/Fast-Fa/blob/master/public/styles.css)
- [public/app.js](https://github.com/agattani123/Fast-Fa/blob/master/public/app.js)

</details>

# Architecture Overview

## Introduction

FastFa! is a web application that aims to simplify the process of finding and applying for scholarships. It leverages OpenAI's GPT-4 language model to generate personalized scholarship recommendations based on a user's input, such as their financial situation, interests, and background. The application also integrates with Starknet for secure payment processing and Kintone for storing user feedback.

The project's architecture follows a client-server model, with a Node.js and Express.js backend handling API requests and serving the frontend, which is built using HTML, CSS, and JavaScript. The frontend communicates with the backend through HTTP requests, and the backend interacts with the OpenAI API to generate scholarship recommendations.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

## Frontend Architecture

### User Interface

The frontend of FastFa! is built using HTML, CSS, and JavaScript. It provides a user-friendly interface for users to input their personal information and receive personalized scholarship recommendations.

```mermaid
graph TD
    A[index.html] -->|Renders| B(User Interface)
    B --> C{User Input}
    C -->|Submits Data| D[app.js]
    D -->|HTTP Request| E[Server]
```

Sources: [public/index.html](https://github.com/agattani123/Fast-Fa/blob/master/public/index.html), [public/styles.css](https://github.com/agattani123/Fast-Fa/blob/master/public/styles.css), [public/app.js](https://github.com/agattani123/Fast-Fa/blob/master/public/app.js)

### Frontend-Backend Communication

The frontend communicates with the backend through HTTP requests, typically using the `fetch` API or XMLHttpRequest. The user's input data is sent to the backend, which processes it and returns the scholarship recommendations.

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend

    Frontend->>Backend: HTTP POST /submit-application
    Note right of Frontend: Sends user input data

    Backend-->>Frontend: HTTP Response
    Note left of Backend: Returns scholarship recommendations
```

Sources: [public/app.js](https://github.com/agattani123/Fast-Fa/blob/master/public/app.js), [scholarship_app/server.js:34-54](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L34-L54)

## Backend Architecture

### Server Setup

The backend of FastFa! is built using Node.js and Express.js. The server listens for incoming HTTP requests and handles them accordingly.

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Sources: [scholarship_app/server.js:1-6](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L1-L6), [scholarship_app/server.js:64-66](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L64-L66)

### OpenAI API Integration

The backend integrates with the OpenAI API to generate scholarship recommendations based on the user's input. It uses the `fetch` function to make POST requests to the OpenAI API and processes the responses.

```mermaid
sequenceDiagram
    participant Backend
    participant OpenAI API

    Backend->>OpenAI API: HTTP POST /v1/chat/completions
    Note right of Backend: Sends user input as prompt

    OpenAI API-->>Backend: HTTP Response
    Note left of OpenAI API: Returns generated scholarship recommendations
```

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

Sources: [scholarship_app/server.js:19-33](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L19-L33), [scholarship_app/server.js:36-48](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L36-L48)

### Scholarship Recommendation Handling

The backend receives the user's input data through an HTTP POST request and generates scholarship recommendations using the OpenAI API. The recommendations are then rendered as an HTML response and sent back to the frontend.

```mermaid
graph TD
    A[HTTP POST /submit-application] -->|User Input Data| B[generateText()]
    B -->|OpenAI API Request| C[fetchFromOpenAI()]
    C -->|OpenAI API Response| D[Render HTML Response]
    D -->|HTTP Response| E[Frontend]
```

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
        </html>
    `);
});
```

Sources: [scholarship_app/server.js:55-63](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js#L55-L63)

## Data Flow

The overall data flow in the FastFa! application can be summarized as follows:

```mermaid
graph TD
    A[User Interface] -->|User Input Data| B[Frontend]
    B -->|HTTP Request| C[Backend]
    C -->|OpenAI API Request| D[OpenAI API]
    D -->|Scholarship Recommendations| C
    C -->|HTML Response| B
    B -->|Render Recommendations| A
```

1. The user inputs their personal information and financial details through the user interface on the frontend.
2. The frontend sends an HTTP request with the user's input data to the backend.
3. The backend processes the user's input and sends a request to the OpenAI API with the input as a prompt.
4. The OpenAI API generates scholarship recommendations based on the prompt and returns them to the backend.
5. The backend renders the scholarship recommendations as an HTML response and sends it back to the frontend.
6. The frontend receives the HTML response and renders the scholarship recommendations on the user interface.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js), [public/app.js](https://github.com/agattani123/Fast-Fa/blob/master/public/app.js)

## Conclusion

FastFa! is a web application that leverages OpenAI's GPT-4 language model to provide personalized scholarship recommendations to users based on their input. The application follows a client-server architecture, with a Node.js and Express.js backend handling API requests and serving the frontend, which is built using HTML, CSS, and JavaScript. The backend integrates with the OpenAI API to generate scholarship recommendations and renders them as an HTML response to be displayed on the frontend. The application also incorporates Starknet for secure payment processing and Kintone for storing user feedback.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)