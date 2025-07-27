<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [README.md](https://github.com/agattani123/Fast-Fa/blob/master/README.md)
- [scholarship_app/package.json](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/package.json)
- [scholarship_app/server.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/server.js)
</details>

# Getting Started

## Introduction

FastFa! is a web application designed to simplify the process of finding and applying for scholarships. It utilizes OpenAI's GPT-4 language model to generate a personalized list of scholarship opportunities tailored to the user's background, interests, and financial situation. The application aims to streamline the often tedious and time-consuming task of searching for relevant scholarships, making it easier for students to access financial aid opportunities.

## Application Architecture

The FastFa! application follows a client-server architecture, with the frontend built using HTML, CSS, and JavaScript, and the backend implemented using Node.js and Express.js. The application flow can be represented by the following diagram:

```mermaid
graph TD
    Client[Client Browser] -->|HTTP Request| Server[Express.js Server]
    Server -->|Fetch Request| OpenAI[OpenAI API]
    OpenAI -->|Response| Server
    Server -->|HTML Response| Client
```

Sources: [scholarship_app/server.js:1-29](), [README.md]()

### Frontend

The frontend of the application is responsible for rendering the user interface and collecting user input. It consists of HTML, CSS, and JavaScript files served from the `public` directory by the Express.js server.

```mermaid
graph TD
    index.html[index.html] --> styles.css[styles.css]
    index.html --> app.js[app.js]
    app.js --> |Fetch Request| server.js[Express.js Server]
    server.js --> |Response| app.js
```

Sources: [scholarship_app/server.js:12](), [README.md]()

### Backend

The backend of the application is built using Node.js and Express.js. It handles incoming HTTP requests, processes user input, interacts with the OpenAI API, and generates the scholarship list response.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant OpenAI

    Client->>Server: HTTP POST /submit-application
    Server->>OpenAI: Fetch Request (GPT-4 API)
    OpenAI-->>Server: Response (Scholarship List)
    Server-->>Client: HTML Response (Scholarship List)
```

Sources: [scholarship_app/server.js:36-99](), [README.md]()

The key components of the backend are:

1. **Express.js Server**: Handles incoming HTTP requests and serves static files from the `public` directory.
2. **OpenAI API Integration**: The `fetchOpenAI` function is responsible for making requests to the OpenAI API using the provided API key.
3. **Text Generation**: The `generateText` function utilizes the OpenAI GPT-4 model to generate a list of scholarships based on the user's input.
4. **Scholarship List Rendering**: The server generates an HTML response containing the scholarship list and sends it back to the client.

## Data Flow

The data flow within the FastFa! application can be summarized as follows:

1. The user enters their personal information and financial details on the frontend.
2. The frontend sends an HTTP POST request to the `/submit-application` endpoint on the server.
3. The server receives the request and extracts the user input data.
4. The server constructs a prompt based on the user input and sends it to the OpenAI API using the `generateText` function.
5. The OpenAI API processes the prompt and returns a list of scholarships tailored to the user's input.
6. The server receives the scholarship list and generates an HTML response containing the list.
7. The HTML response is sent back to the client and rendered in the browser.

## Configuration

The FastFa! application requires the following configuration:

| Configuration | Type | Description | Default Value |
| --- | --- | --- | --- |
| `PORT` | Number | The port number on which the Express.js server listens | `3000` |
| `OpenAI API Key` | String | The API key for authenticating with the OpenAI API | `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` (Deactivated) |

Sources: [scholarship_app/server.js:4](), [scholarship_app/server.js:24]()

## Deployment

To deploy the FastFa! application, follow these steps:

1. Install the required dependencies by running `npm install` in the project directory.
2. Start the server by running `npm start`.
3. Access the application by navigating to `http://localhost:3000` in a web browser.

Note: The provided API key has been deactivated for security reasons. You will need to obtain a valid API key from OpenAI and update the code accordingly.

Sources: [scholarship_app/package.json](), [scholarship_app/server.js:4](), [scholarship_app/server.js:24](), [README.md]()

## Conclusion

FastFa! is a user-friendly web application that leverages the power of OpenAI's GPT-4 language model to provide personalized scholarship recommendations to students. By streamlining the scholarship search process, FastFa! aims to make it easier for students to access financial aid opportunities and alleviate the burden of navigating through numerous scholarship listings.