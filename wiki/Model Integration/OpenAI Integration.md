Here is the updated markdown content for the "OpenAI Integration" wiki page, based on the provided changelog and source files:

<page>
This code provides functionality to interact with the OpenAI APIs for text generation and image generation. Here's a breakdown of the code:

1. **Utility Function: `fetchFromOpenAI`**
   - This function is responsible for making a POST request to the OpenAI APIs.
   - It takes two arguments: `url` (the API endpoint URL) and `payload` (the request payload).
   - The function sends the request with the appropriate headers (including the API key) and the payload as the request body.
   - If the request is successful, it returns the JSON response data. Otherwise, it throws an error.

2. **Text Generation: `generateText`**
   - This function generates text using the OpenAI GPT-4 model.
   - It takes a `prompt` as an argument, which is the input text for the model.
   - It constructs the payload with the provided `prompt` and the `messages` field as an array containing the prompt as an object with `role` and `content` fields.
   - It calls the `fetchFromOpenAI` function with the appropriate URL (`https://api.openai.com/v1/chat/completions`) and payload.
   - The function returns the generated text response from the API.

3. **Image Generation: `generateImage`**
   - This function generates an image using the OpenAI DALL-E 2 model.
   - It takes a `prompt` as an argument, which is the input text for the model.
   - It constructs the payload with the provided `prompt`, the `dall-e-2` model, the number of images to generate (`n: 1`), and the image size (`256x256`).
   - It calls the `fetchFromOpenAI` function with the appropriate URL (`https://api.openai.com/v1/images/generations`) and payload.
   - The function returns the URL of the generated image from the API.

4. **Example Usage**
   - The code includes an example usage of the `generateText` and `generateImage` functions.
   - It defines a text prompt and an image prompt.
   - It calls the `generateText` function with the text prompt and logs the generated text response.
   - It calls the `generateImage` function with the image prompt and logs the generated image URL.
   - The example usage is wrapped in an async IIFE (Immediately Invoked Function Expression) to handle asynchronous operations.

5. **Module Exports**
   - The `generateText` function is exported as a module, allowing it to be imported and used in other parts of the application.

6. **API Key Import**
   - The `creds.js` file exports an object with an `openAiKey` property, which holds the API key for the OpenAI APIs.
   - The API key value is not provided in the code snippet for security reasons.

To use this code, you need to provide a valid API key in the `creds.js` file. Additionally, you may need to install any required dependencies (e.g., `node-fetch` for making HTTP requests) if they are not already installed in your project.
</page>