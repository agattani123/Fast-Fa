<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# OpenAI Integration

## Introduction

The "OpenAI Integration" feature within this project provides a set of utility functions to interact with the OpenAI APIs, specifically for generating text using GPT-4 and generating images using DALL-E 2. These functions can be used throughout the application to leverage the capabilities of OpenAI's language and image generation models.

Sources: [scholarship_app/AiHelper.js]()

## OpenAI API Interaction

The `fetchFromOpenAI` function is a utility function responsible for making API requests to the OpenAI servers. It takes two arguments: the API endpoint URL and the payload data to be sent in the request body.

```javascript
async function fetchFromOpenAI(url, payload) {
  // ...
}
```

The function performs the following steps:

1. Sends a POST request to the provided `url` with the `payload` data in the request body.
2. Includes the necessary headers, including the OpenAI API key for authentication and the `Content-Type` header.
3. Returns the response data as a JSON object.
4. Handles any errors that occur during the request and throws an appropriate error message.

Sources: [scholarship_app/AiHelper.js:1-16]()

## Text Generation with GPT-4

The `generateText` function utilizes the OpenAI GPT-4 model to generate text based on a given prompt.

```javascript
async function generateText(prompt) {
  // ...
}
```

Here's how it works:

1. Defines the API endpoint URL for the OpenAI chat completions API.
2. Constructs the payload object with the `gpt-4` model and the provided `prompt` as the initial user message.
3. Calls the `fetchFromOpenAI` function with the API endpoint URL and the payload.
4. Returns the generated text content from the API response.

Sources: [scholarship_app/AiHelper.js:18-28]()

## Image Generation with DALL-E 2

The `generateImage` function allows generating images using the OpenAI DALL-E 2 model based on a given text prompt.

```javascript
async function generateImage(prompt) {
  // ...
}
```

The function follows these steps:

1. Defines the API endpoint URL for the OpenAI image generations API.
2. Constructs the payload object with the `dall-e-2` model, the provided `prompt`, and additional parameters like the number of images to generate and the image size.
3. Calls the `fetchFromOpenAI` function with the API endpoint URL and the payload.
4. Returns the URL of the generated image from the API response.

Sources: [scholarship_app/AiHelper.js:30-39]()

## Example Usage

The provided code includes an example usage of the `generateText` and `generateImage` functions within an asynchronous IIFE (Immediately Invoked Function Expression).

```javascript
(async () => {
  try {
    const textPrompt = "Explain quantum mechanics in simple terms";
    const imagePrompt = "Picture of a cute cat";

    const textResponse = await generateText(textPrompt);
    console.log("Text Response:", textResponse);

    const imageUrl = await generateImage(imagePrompt);
    console.log("Image URL:", imageUrl);
  } catch (error) {
    console.log(error.message);
  }
})();
```

This example demonstrates how to call the functions with different prompts and log the generated text and image URL to the console.

Sources: [scholarship_app/AiHelper.js:41-54]()

## Configuration

The OpenAI API key is imported from the `creds.js` file and used for authentication in the `fetchFromOpenAI` function.

```javascript
import { openAiKey } from "./creds.js";
```

The `creds.js` file likely contains the actual API key value, which should be kept secure and not committed to version control.

Sources: [scholarship_app/AiHelper.js:3](), [scholarship_app/creds.js]()

## Conclusion

The "OpenAI Integration" feature provides a convenient way to leverage the powerful language and image generation capabilities of OpenAI's GPT-4 and DALL-E 2 models within the application. The provided utility functions handle the API interactions, allowing developers to easily generate text or images based on prompts throughout the codebase.