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

FastFa! is a web application that aims to simplify the process of finding and applying for scholarships. It leverages OpenAI's GPT-4 language model to generate personalized lists of scholarship opportunities based on the user's input. The application follows a client-server architecture, with a Node.js backend and a frontend built with HTML, CSS, and JavaScript.

The key components of the FastFa! architecture include:

1. **Frontend**: Responsible for rendering the user interface, collecting user input, and displaying the generated scholarship list.
2. **Backend**: Handles the communication with the OpenAI API, processes the user input, and generates the scholarship list using GPT-4.
3. **OpenAI API**: The external service that provides the GPT-4 language model for generating the scholarship list.
4. **Starknet Integration**: Facilitates secure payment methods for students to receive scholarships directly from institutions.
5. **Kintone Database**: Stores user feedback responses for future analysis and improvements.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

## Frontend Architecture

The frontend of FastFa! is built using HTML, CSS, and JavaScript. It consists of the following main components:

### 1. User Interface

The user interface is rendered using HTML and styled with CSS. It includes input fields for the user to provide personal information and financial details.

```html
<!-- public/index.html -->
<form id="application-form">
    <input type="text" id="firstName" placeholder="First Name" required>
    <input type="text" id="lastName" placeholder="Last Name" required>
    <textarea id="financial_info" placeholder="Enter your financial information, background, interests, and future plans..." required></textarea>
    <button type="submit">Submit</button>
</form>
```

Sources: [public/index.html](https://github.com/agattani123/Fast-Fa/blob/master/public/index.html)

### 2. JavaScript Functionality

The frontend JavaScript code handles user input submission, communicates with the backend server, and displays the generated scholarship list.

```javascript
// public/app.js
const form = document.getElementById('application-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const financial_info = document.getElementById('financial_info').value;

    const response = await fetch('/submit-application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, financial_info }),
    });

    const scholarshipList = await response.text();
    document.body.innerHTML = scholarshipList;
});
```

Sources: [public/app.js](https://github.com/agattani123/Fast-Fa/blob/master/public/app.js)

## Backend Architecture

The backend of FastFa! is built using Node.js and Express.js. It consists of the following main components:

### 1. Server Setup

The server is set up using Express.js, and it listens for incoming requests on a specified port.

```javascript
// scholarship_app/server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Sources: [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

### 2. OpenAI API Integration

The backend communicates with the OpenAI API to generate the scholarship list using GPT-4. The `fetchFromOpenAI` function handles the API request and response.

```javascript
// scholarship_app/server.js
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

Sources: [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

### 3. Scholarship Generation

The `generateText` function is responsible for generating the scholarship list using the user's input as a prompt for the GPT-4 model.

```javascript
// scholarship_app/server.js
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

Sources: [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

### 4. Request Handling

The backend listens for POST requests to the `/submit-application` endpoint, where it processes the user input, generates the scholarship list using GPT-4, and sends the response back to the frontend.

```javascript
// scholarship_app/server.js
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    const output = await generateText(`...`);

    // Modify the output and send the response
    const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);
    res.send(`...`);
});
```

Sources: [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

## Data Flow

The data flow in the FastFa! application follows these steps:

```mermaid
sequenceDiagram
    participant Frontend
    participant Backend
    participant OpenAI API
    participant Starknet
    participant Kintone

    Frontend->>Backend: POST /submit-application (user input)
    Backend->>OpenAI API: Request scholarship list (user input)
    OpenAI API-->>Backend: Scholarship list
    Backend-->>Frontend: HTML response (scholarship list)
    Frontend->>Starknet: Secure payment (scholarship)
    Starknet-->>Frontend: Payment confirmation
    Frontend->>Kintone: POST feedback
    Kintone-->>Frontend: Feedback confirmation

    Note over Frontend: Renders scholarship list and handles user interactions
    Note over Backend: Processes user input and generates scholarship list
    Note over OpenAI API: Generates scholarship list using GPT-4 model
    Note over Starknet: Facilitates secure payment for scholarships
    Note over Kintone: Stores user feedback for analysis and improvements
```

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md), [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)

## Starknet Integration

FastFa! integrates with Starknet to provide a secure payment method for students to receive scholarships directly from institutions. However, the specific implementation details of the Starknet integration are not available in the provided source files.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md)

## Kintone Database

FastFa! utilizes the Kintone database system to store user feedback responses. The feedback form is hosted on a separate platform (Google Forms), and the responses are likely stored in the Kintone database for future analysis and improvements. The implementation details of the Kintone integration are not available in the provided source files.

Sources: [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md)

## Conclusion

FastFa! follows a client-server architecture with a Node.js backend and a frontend built with HTML, CSS, and JavaScript. The application leverages the OpenAI GPT-4 language model to generate personalized scholarship lists based on user input. It also integrates with Starknet for secure payment methods and the Kintone database system for storing user feedback. The architecture is designed to provide a seamless and user-friendly experience for students seeking scholarship opportunities.