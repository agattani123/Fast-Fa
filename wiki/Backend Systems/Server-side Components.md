<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# Server-side Components

## Introduction

The server-side components of this project are responsible for handling incoming HTTP requests, generating personalized scholarship recommendations using the OpenAI GPT-4 language model, and rendering dynamic HTML responses. The main server file, `server.js`, sets up an Express.js server and defines the necessary routes and handlers. The `creds.js` file contains the OpenAI API key required for making requests to the GPT-4 model.

Sources: [scholarship_app/server.js](), [scholarship_app/creds.js]()

## Server Setup and Configuration

### Express.js Server Initialization

The server is initialized using the Express.js framework. The necessary modules (`express`, `body-parser`) are imported, and an instance of the Express application is created.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
```

The server is configured to use JSON and URL-encoded request bodies and serve static files from the `public` directory.

```javascript
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
```

Sources: [scholarship_app/server.js:1-7]()

### Route Handlers

#### Root Route

The root route (`/`) is defined to respond with a simple "Hello World" message.

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

Sources: [scholarship_app/server.js:9-11]()

#### Scholarship Application Submission Route

The `/submit-application` route is a POST route that handles the submission of a scholarship application. It extracts the `firstName`, `lastName`, and `financial_info` from the request body and uses the `financial_info` as the prompt for the `generateText` function.

```javascript
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`...`);

    // ...
});
```

The generated output is then modified to replace the "APPLY" string with an HTML button element, and the final HTML response is sent back to the client.

```javascript
const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);

res.send(`
    <!DOCTYPE html>
    <html>
    <!-- HTML response with scholarship list and styling -->
    </html>
`);
```

Sources: [scholarship_app/server.js:58-123]()

## OpenAI Integration

### Fetching from OpenAI API

The `fetchOpenAI` function is an asynchronous function that sends a POST request to the specified OpenAI API URL with the provided payload. It includes the necessary headers, including the OpenAI API key from the `creds.js` file.

```javascript
async function fetchOpenAI(url, payload) {
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

Sources: [scholarship_app/server.js:13-26](), [scholarship_app/creds.js]()

### Generating Text with GPT-4

The `generateText` function is responsible for generating text using the OpenAI GPT-4 language model. It constructs the payload with the provided prompt and sends a request to the OpenAI chat completions API using the `fetchOpenAI` function.

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

The prompt for the `generateText` function is constructed within the `/submit-application` route handler, incorporating the `financial_info` provided in the request body.

```javascript
const output = await generateText(`"
    Making this prompt super simplistic. 
    Take a prompt and give me a list and URLs to specific scholarships that would specifically give me access to opportunities." + 
    // ... (prompt construction)
    "The prompt is follows: ${financial_info}`);
```

Sources: [scholarship_app/server.js:28-43, 62-63]()

## Server Startup

Finally, the server starts listening on the specified `PORT` (3000 by default), and a log message is printed to the console.

```javascript
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Sources: [scholarship_app/server.js:125-127]()

## Mermaid Diagrams

### Server Architecture

```mermaid
graph TD
    Client[Client] -->|HTTP Request| Server[Express.js Server]
    Server -->|Serve Static Files| Public[Public Directory]
    Server -->|Generate Text| GPT4[OpenAI GPT-4 API]
    GPT4 -->|Generated Text| Server
    Server -->|HTML Response| Client
```

This diagram illustrates the high-level architecture of the server-side components. The client sends HTTP requests to the Express.js server, which can serve static files from the `public` directory. For scholarship application submissions, the server interacts with the OpenAI GPT-4 API to generate personalized scholarship recommendations based on the provided financial information. The generated text is then incorporated into an HTML response and sent back to the client.

Sources: [scholarship_app/server.js]()

### Request Handling Flow

```mermaid
graph TD
    Client[Client] -->|POST /submit-application| Server[Express.js Server]
    Server -->|Extract Request Body| RequestBody["firstName, lastName, financial_info"]
    RequestBody -->|financial_info| GenerateText["generateText(prompt)"]
    GenerateText -->|Prompt| GPT4["OpenAI GPT-4 API"]
    GPT4 -->|Generated Text| GenerateText
    GenerateText -->|Output| Server
    Server -->|Modify Output| ModifiedOutput["Replace 'APPLY' with Button"]
    ModifiedOutput -->|HTML Response| Server
    Server -->|Send Response| Client
```

This flow diagram illustrates the request handling process for the `/submit-application` route. The client sends a POST request with the `firstName`, `lastName`, and `financial_info` in the request body. The server extracts the `financial_info` and uses it as the prompt for the `generateText` function, which interacts with the OpenAI GPT-4 API to generate personalized scholarship recommendations. The generated text is then modified to replace the "APPLY" string with an HTML button element, and the final HTML response is sent back to the client.

Sources: [scholarship_app/server.js:58-123]()

### Sequence Diagram: Generating Text with GPT-4

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant GPT4API
    Client->>Server: POST /submit-application
    Server->>Server: Extract request body
    Server->>GPT4API: POST /v1/chat/completions
    Note right of GPT4API: Construct payload with prompt
    GPT4API-->>Server: Generated text response
    Server->>Server: Modify output
    Server-->>Client: HTML response with scholarship list
```

This sequence diagram illustrates the interaction between the client, the server, and the OpenAI GPT-4 API when generating personalized scholarship recommendations. The client sends a POST request to the `/submit-application` route, and the server extracts the necessary information from the request body. The server then constructs a payload with the prompt and sends a POST request to the OpenAI chat completions API. The API generates the text response, which is sent back to the server. The server modifies the output to include an HTML button element and sends the final HTML response with the scholarship list back to the client.

Sources: [scholarship_app/server.js:28-43, 58-123]()

## Key Components and Features

| Component | Description |
| --- | --- |
| Express.js Server | Handles incoming HTTP requests and serves static files from the `public` directory. |
| OpenAI GPT-4 Integration | Generates personalized scholarship recommendations using the OpenAI GPT-4 language model. |
| Dynamic HTML Rendering | Constructs and sends HTML responses with the generated scholarship list and styling. |

Sources: [scholarship_app/server.js]()

## Conclusion

The server-side components of this project provide a robust foundation for handling scholarship application submissions and generating personalized recommendations using the powerful OpenAI GPT-4 language model. The Express.js server handles incoming requests, interacts with the OpenAI API, and renders dynamic HTML responses with the generated scholarship list. The modular design and clear separation of concerns facilitate maintainability and future enhancements.