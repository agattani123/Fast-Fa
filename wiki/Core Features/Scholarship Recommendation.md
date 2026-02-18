<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/AiHelper.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/AiHelper.js)
- [scholarship_app/public/form.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/form.js)
- [scholarship_app/public/script.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/public/script.js)

</details>

# Scholarship Recommendation

## Introduction

The "Scholarship Recommendation" feature is a part of a web application that assists users in applying for scholarships. It leverages the OpenAI GPT-4 language model to generate personalized recommendations for scholarship opportunities based on the user's financial information and other relevant details provided in the application form.

The feature consists of two main components: a client-side form submission handler and a server-side AI helper module that interacts with the OpenAI API to generate the recommendations.

Sources: [scholarship_app/public/form.js](), [scholarship_app/public/script.js](), [scholarship_app/AiHelper.js]()

## Client-Side Form Handling

The client-side form handling is implemented using JavaScript and is responsible for capturing user input and submitting the application data to the server.

### Form Submission

The `scholarshipForm` event listener in `form.js` and `script.js` handles the form submission process:

```javascript
document.getElementById('scholarshipForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // ...
});
```

Sources: [scholarship_app/public/form.js:1-6](), [scholarship_app/public/script.js:11-22]()

#### Form Data Submission

The `form.js` file uses the `FormData` object to submit the form data to the server:

```javascript
const formData = new FormData(this);
fetch('/submit-application', {
    method: 'POST',
    body: formData
})
.then(response => response.text())
.then(data => alert(data));
```

Sources: [scholarship_app/public/form.js:3-8]()

On the other hand, `script.js` sends the form data as a JSON object:

```javascript
fetch('/submit-application', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, financial_info }),
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch((error) => {
    console.error('Error:', error);
});
```

Sources: [scholarship_app/public/script.js:14-22]()

### UI Enhancements

The `script.js` file also includes some basic UI enhancements for the "Download" button:

```javascript
document.getElementById('download-button').addEventListener('mouseover', function() {
    this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
});

document.getElementById('download-button').addEventListener('mouseout', function() {
    this.style.boxShadow = 'none';
});
```

This code adds a box shadow effect when the user hovers over the "Download" button and removes it when the user moves the cursor away.

Sources: [scholarship_app/public/script.js:1-6]()

## Server-Side AI Helper

The server-side AI helper module, implemented in `AiHelper.js`, provides functionality to interact with the OpenAI API and generate text or image content based on user prompts.

### OpenAI API Interaction

The `fetchFromOpenAI` function is a utility function that handles the communication with the OpenAI API:

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

This function sends a POST request to the specified OpenAI API endpoint with the provided payload and returns the JSON response.

Sources: [scholarship_app/AiHelper.js:2-16]()

### Text Generation

The `generateText` function uses the OpenAI GPT-4 model to generate text based on a given prompt:

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

It constructs a payload with the user's prompt and sends it to the OpenAI API's chat completion endpoint. The function then returns the generated text response.

Sources: [scholarship_app/AiHelper.js:18-30]()

### Image Generation

The `generateImage` function uses the OpenAI DALL-E 2 model to generate an image based on a given prompt:

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

It constructs a payload with the user's prompt and sends it to the OpenAI API's image generation endpoint. The function then returns the URL of the generated image.

Sources: [scholarship_app/AiHelper.js:32-41]()

### Example Usage

The `AiHelper.js` file includes an example usage of the `generateText` and `generateImage` functions:

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

This code demonstrates how to call the functions with different prompts and log the generated text and image URL to the console.

Sources: [scholarship_app/AiHelper.js:43-56]()

## Conclusion

The "Scholarship Recommendation" feature combines client-side form handling and server-side AI integration to provide personalized scholarship recommendations to users. The client-side code captures user input and submits it to the server, while the server-side AI helper module leverages the OpenAI GPT-4 and DALL-E 2 models to generate text and image content based on the user's information.