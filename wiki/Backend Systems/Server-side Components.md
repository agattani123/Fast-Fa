<page>
# Server-side Components

This section covers the server-side components of the application, which handle the processing of user input and generation of scholarship recommendations using the OpenAI API.

## Server Setup

The server is built using the Express.js framework for Node.js. It listens for incoming requests on `http://localhost:3000`.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## API Integration

The application integrates with the OpenAI API (`https://open-ai.com/v1/chat/completions`) for generating text based on user prompts.

### Fetch Helper Function

A helper function `fetchFromOpenAI` is used to make API requests to the OpenAI endpoint:

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

### Text Generation

The `generateText` function is responsible for generating text based on a given prompt using the OpenAI API:

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

  const data = await fetchFromOpenAI(chatUrl, payload);
  return data.choices[0].message.content;
}
```

The function constructs a payload object with the prompt and sends it to the OpenAI API endpoint using the `fetchFromOpenAI` helper function. The generated text is then returned.

## Scholarship Application Handling

The `/submit-application` route handles incoming scholarship application submissions:

```javascript
app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`...`);

    // Replace "APPLY" with a button
    const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);

    // Send the response with the generated scholarship recommendations
    res.send(`...`);
});
```

The route extracts the `firstName`, `lastName`, and `financial_info` from the request body. The `financial_info` is used as the prompt for the `generateText` function, which generates a list of scholarship recommendations based on the user's provided information.

The generated output is then modified to replace the "APPLY" text with a button element (`<button class="apply-btn">Apply</button>`). Finally, the server sends an HTML response containing the scholarship recommendations.

</page>