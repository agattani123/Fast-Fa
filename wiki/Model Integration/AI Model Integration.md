<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/creds.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/creds.js)

</details>

# AI Model Integration

## Introduction

The "AI Model Integration" feature in this project provides a set of functions to interact with OpenAI's language and image generation models, specifically GPT-4 and DALL-E 2. It allows developers to generate text and images based on user-provided prompts, leveraging the powerful capabilities of these AI models.

The integration is implemented in the `AiHelper.js` module, which encapsulates the logic for making API requests to OpenAI and handling the responses. The module exports two main functions: `generateText` and `generateImage`.

Sources: [scholarship_app/AiHelper.js]()

## Text Generation with GPT-4

The `generateText` function is responsible for generating text using the GPT-4 language model from OpenAI. It takes a prompt string as input and returns the generated text response.

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

1. The function constructs the API endpoint URL for the OpenAI chat completions API.
2. It creates a payload object with the `gpt-4` model specified and the user's prompt as the initial message.
3. The `fetchFromOpenAI` function (not shown) is called with the API URL and payload, which sends a POST request to the OpenAI API.
4. The response from the API is processed, and the generated text content is extracted from the `choices` array and returned.

Sources: [scholarship_app/AiHelper.js:8-17]()

## Image Generation with DALL-E 2

The `generateImage` function is responsible for generating images using the DALL-E 2 image generation model from OpenAI. It takes a prompt string as input and returns the URL of the generated image.

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

1. The function constructs the API endpoint URL for the OpenAI image generations API.
2. It creates a payload object with the `dall-e-2` model specified, the user's prompt, the number of images to generate (1), and the desired image size (256x256 pixels).
3. The `fetchFromOpenAI` function (not shown) is called with the API URL and payload, which sends a POST request to the OpenAI API.
4. The response from the API is processed, and the URL of the generated image is extracted from the `data` array and returned.

Sources: [scholarship_app/AiHelper.js:19-28]()

## API Key Management

The project uses an API key to authenticate with the OpenAI APIs. The key is stored in the `creds.js` file and imported into the `AiHelper.js` module.

```javascript
// creds.js
export default {
    openAiKey: APIKEY,
};
```

The `fetchFromOpenAI` function (not shown) likely includes the API key in the `Authorization` header when making requests to the OpenAI APIs.

Sources: [scholarship_app/creds.js]()

## Example Usage

The `AiHelper.js` module provides an example usage of the `generateText` and `generateImage` functions within an asynchronous IIFE (Immediately Invoked Function Expression).

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

1. The IIFE is an asynchronous function that runs immediately upon execution.
2. It defines prompts for text generation (`textPrompt`) and image generation (`imagePrompt`).
3. The `generateText` function is called with the `textPrompt`, and the generated text response is logged to the console.
4. The `generateImage` function is called with the `imagePrompt`, and the URL of the generated image is logged to the console.
5. Any errors that occur during the process are caught and logged to the console.

Sources: [scholarship_app/AiHelper.js:31-44]()

## Conclusion

The "AI Model Integration" feature in this project provides a straightforward way to leverage the capabilities of OpenAI's GPT-4 and DALL-E 2 models for text and image generation, respectively. The `AiHelper.js` module encapsulates the logic for making API requests and handling responses, while the `creds.js` file manages the API key for authentication. Developers can easily integrate these functionalities into their applications by importing and using the `generateText` and `generateImage` functions from the `AiHelper.js` module.