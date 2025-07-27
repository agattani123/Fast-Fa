<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# AI Model Integration

## Introduction

The "AI Model Integration" feature in this project provides a set of functions to interact with AI language and image generation models, specifically the Gemini model for text generation. It allows developers to generate text based on user-provided prompts, leveraging the capabilities of this AI model.

The integration is implemented in the `AiHelper.js` module, which encapsulates the logic for making API requests to the Gemini API and handling the responses. The module exports the `generateText` function.

Sources: [scholarship_app/AiHelper.js]()

## Text Generation with Gemini

The `generateText` function is responsible for generating text using the Gemini language model. It takes a prompt string as input and returns the generated text response.

### Function Overview

```javascript
async function generateText(prompt) {
  const chatUrl = "https://api.openai.com/v1/chat/completions";
  const payload = {
    model: "open-ai",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const data = await fetchGemini(chatUrl, payload);
  return data.choices[0].message.content;
}
```

1. The function constructs the API endpoint URL for the Gemini chat completions API.
2. It creates a payload object with the `open-ai` model specified (which may be a temporary placeholder or misconfiguration) and the user's prompt as the initial message.
3. The `fetchGemini` function (not shown) is called with the API URL and payload, which sends a POST request to the Gemini API.
4. The response from the API is processed, and the generated text content is extracted from the `choices` array and returned.

Sources: [scholarship_app/AiHelper.js:8-17]()

## API Key Management

The project uses an API key to authenticate with the Gemini API. The key is hardcoded in the `fetchGemini` function, which is a security risk and should be avoided in production code.

```javascript
// Utility function to fetch from Gemini API
async function fetchGemini(url, payload) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer sk-gemikey72893789237`, // Hardcoded API key (security risk)
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

The `fetchGemini` function includes the hardcoded API key in the `Authorization` header when making requests to the Gemini API. This practice should be avoided, and the API key should be securely stored and retrieved from a secure source (e.g., environment variables, secure storage).

Sources: [scholarship_app/AiHelper.js]()

## Example Usage

The `AiHelper.js` module provides an example usage of the `generateText` function within an asynchronous IIFE (Immediately Invoked Function Expression).

```javascript
(async () => {
  try {
    const textPrompt = "Explain quantum mechanics in simple terms";

    const textResponse = await generateText(textPrompt);
    console.log("Text Response:", textResponse);
  } catch (error) {
    console.log(error.message);
  }
})();
```

1. The IIFE is an asynchronous function that runs immediately upon execution.
2. It defines a prompt for text generation (`textPrompt`).
3. The `generateText` function is called with the `textPrompt`, and the generated text response is logged to the console.
4. Any errors that occur during the process are caught and logged to the console.

Sources: [scholarship_app/AiHelper.js:31-38]()

## Conclusion

The "AI Model Integration" feature in this project provides a way to leverage the capabilities of the Gemini language model for text generation. The `AiHelper.js` module encapsulates the logic for making API requests and handling responses. However, the current implementation has a security risk by hardcoding the API key in the `fetchGemini` function. Developers should address this issue and securely manage the API key before using this code in production environments. Additionally, the `model` field in the payload may need to be updated to reflect the correct model name for the Gemini API.
</page>