<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# Server-side Components

## Introduction

The server-side components of this project are responsible for handling incoming requests, generating personalized scholarship recommendations using the OpenAI GPT-4 language model, and rendering dynamic HTML responses. The core functionality is implemented in the `server.js` file, which sets up an Express.js server and defines the necessary routes and handlers.

The server utilizes the `fetchFromOpenAI` function to interact with the OpenAI API, leveraging the API key stored in the `creds.js` file. The main route `/submit-application` accepts POST requests containing user information, including their financial details, which are then used as a prompt for the `generateText` function to generate a list of tailored scholarship opportunities.

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

Sources: [server.js:1-6]()

The server listens for incoming requests on port 3000:

```javascript
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

Sources: [server.js:92-94]()

## Route Handlers

### Root Route (`/`)

The root route (`/`) is a simple GET route that responds with the string "Hello World":

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

Sources: [server.js:8-10]()

### Submit Application Route (`/submit-application`)

The `/submit-application` route is a POST route that handles the submission of user information for generating personalized scholarship recommendations:

```javascript
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`...`);

    console.log('Application Received:', firstName, lastName, financial_info, output);

    // Replace "APPLY" with a button
    const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);

    res.send(`
        <!DOCTYPE html>
        <html>
        ...
    `);
});
```

Sources: [server.js:12-85]()

The route extracts the `firstName`, `lastName`, and `financial_info` from the request body. The `financial_info` is then used as a prompt for the `generateText` function, which generates a list of tailored scholarship opportunities using the OpenAI GPT-4 language model.

The generated output is then modified to replace the string "APPLY" with an HTML button element (`<button class="apply-btn">Apply</button>`). Finally, the server responds with an HTML page that displays the personalized scholarship recommendations, along with some styling and navigation buttons.

## OpenAI API Integration

The project integrates with the OpenAI API to generate personalized scholarship recommendations using the GPT-4 language model.

### `fetchFromOpenAI` Function

The `fetchFromOpenAI` function is responsible for making API requests to the OpenAI API:

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

Sources: [server.js:12-25]()

It takes the API endpoint URL and the request payload as arguments, and sends a POST request to the specified URL with the provided payload. The function includes the necessary headers, including the OpenAI API key for authentication.

### `generateText` Function

The `generateText` function is responsible for generating text using the OpenAI GPT-4 language model:

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

Sources: [server.js:27-41]()

It takes a prompt as input and constructs a payload object with the prompt and the desired model (`gpt-4`). The function then calls the `fetchFromOpenAI` function with the appropriate API endpoint URL and the constructed payload. The response from the API is processed, and the generated text is returned.

## Configuration

The project uses the `creds.js` file to store the OpenAI API key:

```javascript
export default {
    openAiKey: APIKEY,
};
```

Sources: [creds.js]()

The API key is imported and used in the `fetchFromOpenAI` function for authentication with the OpenAI API.

## Mermaid Diagrams

### Server Request Flow

```mermaid
graph TD
    Client[Client] -->|HTTP Request| Server[Express.js Server]
    Server -->|Parse Request Body| BodyParser[Body Parser Middleware]
    BodyParser -->|Parsed Data| RouteHandler["/submit-application" Route Handler]
    RouteHandler -->|Prompt| GenerateText[generateText Function]
    GenerateText -->|OpenAI API Request| FetchFromOpenAI[fetchFromOpenAI Function]
    FetchFromOpenAI -->|OpenAI API Response| GenerateText
    GenerateText -->|Generated Text| RouteHandler
    RouteHandler -->|HTML Response| Server
    Server -->|HTTP Response| Client
```

Sources: [server.js:12-85]()

The above diagram illustrates the flow of a request to the `/submit-application` route:

1. The client sends an HTTP POST request to the server.
2. The Express.js server receives the request and passes it through the Body Parser middleware to parse the request body.
3. The `/submit-application` route handler is invoked with the parsed request data.
4. The route handler extracts the `financial_info` from the request body and uses it as a prompt for the `generateText` function.
5. The `generateText` function constructs a payload and calls the `fetchFromOpenAI` function to make a request to the OpenAI API.
6. The `fetchFromOpenAI` function sends the request to the OpenAI API and receives the response.
7. The generated text is returned to the route handler.
8. The route handler modifies the generated text and sends an HTML response back to the client.

### OpenAI API Request Sequence

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant OpenAI API

    Client->>Server: HTTP POST /submit-application
    Server->>Server: Parse request body
    Server->>Server: Extract financial_info
    Server->>Server: Construct prompt
    Server->>OpenAI API: POST /v1/chat/completions
    activate OpenAI API
    OpenAI API-->>Server: Generated text response
    deactivate OpenAI API
    Server->>Server: Modify generated text
    Server-->>Client: HTML response with recommendations
```

Sources: [server.js:12-85]()

The above sequence diagram illustrates the interaction between the client, the server, and the OpenAI API:

1. The client sends an HTTP POST request to the `/submit-application` route on the server.
2. The server parses the request body and extracts the `financial_info`.
3. The server constructs a prompt using the `financial_info`.
4. The server sends a POST request to the OpenAI API's `/v1/chat/completions` endpoint with the constructed prompt.
5. The OpenAI API generates text based on the provided prompt and sends the response back to the server.
6. The server modifies the generated text, replacing "APPLY" with an HTML button element.
7. The server sends an HTML response back to the client, containing the personalized scholarship recommendations.

## Tables

### API Endpoint

| Endpoint | Method | Description |
| --- | --- | --- |
| `/submit-application` | POST | Handles the submission of user information and generates personalized scholarship recommendations. |

Sources: [server.js:12-85]()

### OpenAI API Request Payload

| Field | Type | Description |
| --- | --- | --- |
| `model` | string | The OpenAI language model to use (e.g., `"gpt-4"`). |
| `messages` | array | An array containing the prompt message object. |
| `messages[].role` | string | The role of the message (e.g., `"user"`). |
| `messages[].content` | string | The content of the prompt message. |

Sources: [server.js:34-39]()

## Code Snippets

### Express.js Server Setup

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
```

Sources: [server.js:1-6]()

This code snippet sets up the Express.js server and configures the necessary middleware, including the Body Parser middleware for parsing request bodies.

### OpenAI API Request

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

Sources: [server.js:12-25]()

This code snippet defines the `fetchFromOpenAI` function, which is responsible for making API requests to the OpenAI API. It takes the API endpoint URL and the request payload as arguments, and sends a POST request with the necessary headers and payload.

## Source Citations

Throughout the wiki page, relevant source files and line numbers have been cited using the format `Sources: [filename.ext:start_line-end_line]()` or `Sources: [filename.ext:line_number]()`.

## Conclusion

The server-side components of this project play a crucial role in handling incoming requests, integrating with the OpenAI API to generate personalized scholarship recommendations, and rendering dynamic HTML responses. The Express.js server, along with the OpenAI API integration and the `generateText` function, work together to provide a seamless experience for users seeking tailored scholarship opportunities based on their financial information.