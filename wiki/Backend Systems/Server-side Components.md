<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# Server-side Components

## Introduction

The server-side components of this project handle the core functionality of generating personalized scholarship recommendations based on user-provided financial information. The server is built using Node.js and the Express.js framework, serving as the backend for the application. It interacts with the OpenAI GPT-4 language model to generate tailored scholarship opportunities based on the user's input.

The server-side components consist of several key elements, including API endpoints, data processing, and integration with external services (OpenAI API). The main server file, `server.js`, sets up the Express server, defines routes, and handles the application logic. The `creds.js` file contains the OpenAI API key required for authentication with the OpenAI service.

## Server Setup and Configuration

The server is initialized using the Express.js framework, and the server port is set to `3000`. The server uses the following middleware:

1. `express.json()`: Parses incoming JSON request bodies.
2. `express.static('public')`: Serves static files from the `public` directory.
3. `bodyParser.urlencoded({ extended: true })`: Parses URL-encoded request bodies.

Sources: [server.js:3-8]()

## Routes and Endpoints

### Root Route (`/`)

The root route (`/`) is a simple GET endpoint that responds with the string "Hello World".

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```

Sources: [server.js:10-12]()

### Submit Application Route (`/submit-application`)

The `/submit-application` route is a POST endpoint that handles the submission of a scholarship application. It receives the user's first name, last name, and financial information in the request body.

```javascript
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`...`);

    console.log('Application Received:', firstName, lastName, financial_info, output);

    // Replace "APPLY" with a button
    const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);

    res.send(`...`);
});
```

The endpoint performs the following steps:

1. Extracts the `firstName`, `lastName`, and `financial_info` from the request body.
2. Calls the `generateText` function, passing the `financial_info` as the prompt.
3. Logs the received application data and the generated output to the console.
4. Replaces the string "APPLY" in the output with an HTML button element.
5. Sends an HTML response containing the generated scholarship recommendations.

Sources: [server.js:35-83]()

## OpenAI Integration

The server integrates with the OpenAI GPT-4 language model to generate personalized scholarship recommendations based on the user's financial information.

### Fetch from OpenAI

The `fetchFromOpenAI` function is an asynchronous function that sends a POST request to the OpenAI API with the provided payload. It returns the response data as JSON.

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

The function takes two arguments:

1. `url`: The URL of the OpenAI API endpoint.
2. `payload`: The request payload as an object.

It sends a POST request to the provided URL with the payload in the request body and the appropriate headers, including the OpenAI API key for authentication. The response is returned as JSON data.

Sources: [server.js:14-27]()

### Generate Text

The `generateText` function is an asynchronous function that generates text using the OpenAI GPT-4 language model based on the provided prompt.

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

The function takes a `prompt` argument, which is the input text for the language model. It constructs a payload object with the `gpt-4` model and the provided prompt as the user message. The `fetchFromOpenAI` function is called with the OpenAI chat completions API endpoint and the payload. The generated text is extracted from the response data and returned.

Sources: [server.js:29-43]()

## Data Flow

The data flow for generating personalized scholarship recommendations can be represented using the following sequence diagram:

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant OpenAI

    Client->>Server: POST /submit-application
    Note right of Client: Sends first name, last name, and financial information

    Server->>OpenAI: POST https://api.openai.com/v1/chat/completions
    Note right of Server: Sends financial information as prompt to OpenAI GPT-4

    OpenAI-->>Server: Response with generated text
    Note left of OpenAI: Generates personalized scholarship recommendations

    Server-->>Client: HTML response with recommendations
    Note right of Server: Replaces "APPLY" with button, sends HTML response
```

1. The client sends a POST request to the `/submit-application` endpoint on the server, including the user's first name, last name, and financial information in the request body.
2. The server constructs a prompt based on the financial information and sends a POST request to the OpenAI chat completions API endpoint with the prompt and the `gpt-4` model.
3. The OpenAI API generates personalized scholarship recommendations based on the provided prompt and sends the generated text back to the server.
4. The server replaces the string "APPLY" in the generated text with an HTML button element and sends an HTML response containing the scholarship recommendations to the client.

Sources: [server.js:35-83](), [server.js:14-27](), [server.js:29-43]()

## Configuration

The server uses the `creds.js` file to store the OpenAI API key required for authentication with the OpenAI service.

```javascript
export default {
    openAiKey: APIKEY,
};
```

The `openAiKey` property should be set to the actual OpenAI API key value for the application to function correctly.

Sources: [creds.js]()

## Conclusion

The server-side components of this project play a crucial role in generating personalized scholarship recommendations based on user-provided financial information. The server integrates with the OpenAI GPT-4 language model to generate tailored scholarship opportunities and serves the recommendations to the client in an HTML response. The server setup, routes, OpenAI integration, and data flow are all implemented in the `server.js` file, while the OpenAI API key is stored in the `creds.js` file for configuration purposes.