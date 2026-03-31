<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# OpenAI Integration

## Introduction

The OpenAI Integration module provides functionality to interact with OpenAI's language model and image generation APIs. It allows generating text responses using the GPT-4 model and generating images using the DALL-E 2 model. This module serves as a utility for leveraging OpenAI's AI capabilities within the project.

## Text Generation with GPT-4

The `generateText` function is responsible for generating text responses using the OpenAI GPT-4 language model. It utilizes the OpenAI Chat Completions API to generate text based on a given prompt.

### Function Overview

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

1. The function takes a `prompt` string as input, which represents the text prompt for the GPT-4 model.
2. It constructs a `payload` object with the `gpt-4` model and the provided `prompt` as the user message.
3. The `fetchFromOpenAI` function is called with the Chat Completions API endpoint URL and the `payload` object.
4. The response from the API is processed, and the generated text content is extracted from the first choice in the response.
5. The generated text content is returned.

Sources: [scholarship_app/AiHelper.js:8-17]()

## Image Generation with DALL-E 2

The `generateImage` function is responsible for generating images using the OpenAI DALL-E 2 image generation model. It utilizes the OpenAI Images Generations API to generate an image based on a given text prompt.

### Function Overview

```javascript
async function generateImage(prompt) {
  const dalleUrl = "https://api.openai.com/v1/images/generations";
  const payload = {
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "256x256",
  };

  const data = await fetchFromOpenAI(dalleUrl, payload);
  return data.data[0].url;
}
```

1. The function takes a `prompt` string as input, which represents the text prompt for the DALL-E 2 model.
2. It constructs a `payload` object with the `dall-e-2` model, the provided `prompt`, the number of images to generate (`n=1`), and the image size (`256x256`).
3. The `fetchFromOpenAI` function is called with the Images Generations API endpoint URL and the `payload` object.
4. The response from the API is processed, and the URL of the generated image is extracted from the first item in the `data` array.
5. The URL of the generated image is returned.

Sources: [scholarship_app/AiHelper.js:19-27]()

## OpenAI API Utility Function

The `fetchFromOpenAI` function is a utility function used to make requests to the OpenAI APIs. It handles the API authentication and request payload formatting.

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

1. The function takes two parameters: `url` (the API endpoint URL) and `payload` (the request payload object).
2. It sends a POST request to the provided `url` with the `payload` as the request body and the appropriate headers, including the OpenAI API key for authentication.
3. If the request is successful, it returns the response data as a JSON object.
4. If an error occurs during the request, it logs the error and throws a new error with a descriptive message.

Sources: [scholarship_app/AiHelper.js:1-15]()

## API Key Configuration

The OpenAI API key is stored in the `creds.js` file and exported as an object.

```javascript
export default {
    openAiKey: APIKEY,
};
```

This file likely contains the actual API key value, which is not shown in the provided code snippet for security reasons.

Sources: [scholarship_app/creds.js]()

## Example Usage

The `AiHelper.js` file includes an example usage of the `generateText` and `generateImage` functions.

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

1. The example code defines two prompts: `textPrompt` for text generation and `imagePrompt` for image generation.
2. It calls the `generateText` function with the `textPrompt` and logs the generated text response to the console.
3. It calls the `generateImage` function with the `imagePrompt` and logs the URL of the generated image to the console.
4. If any errors occur during the process, it logs the error message to the console.

Sources: [scholarship_app/AiHelper.js:30-43]()

## Conclusion

The OpenAI Integration module provides a convenient way to leverage OpenAI's language model and image generation capabilities within the project. It abstracts away the complexities of interacting with the OpenAI APIs and provides a simple interface for generating text and images based on user-provided prompts. This module can be integrated into various parts of the project to enhance functionality with AI-powered text generation and image creation.