const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

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

// Function to generate text using OpenAI GPT-4
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

// Function to generate images using OpenAI DALL-E 2
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

// Example usage of the functions
(async () => {
  try {
    const textPrompt = "Explain quantum mechanics in simple terms";
    const imagePrompt = "Gay indian girl";

    const textResponse = await generateText(textPrompt);
    console.log("Text Response:", textResponse);

    const imageUrl = await generateImage(imagePrompt);
    console.log("Image URL:", imageUrl);
  } catch (error) {
    console.log(error.message);
  }
})();

app.post('/submit-application', async (req, res) => {
    const { name, email, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`"Take a prompt and give me a list and URLs to specific scholarships that would specifically give me access to opportunities." + 
    "I do not want any opportunity that are generalized to a big group of students and rather want opportunities as specific to the prompt as possible." +
    "Each opportunity should include a description of what that student specifically a good fit.  Facets include age, race, gender, location, future occupation, interests, and future plans." + 
    "Also, the complete list should have addressed at least each facet provided in the prompt. For example, if the student wants to study in Hawaii then at least one opportunity in that area and please write that out explicitly." +
    "If a student is from a certain area, you must provide at least one opportunity that is specific to that area and please write this our explicitly." +
    "Please be VERY specific as to which part of the prompt this opportunity addresses. If it is not in the prompt, absolutely do not include that opportunity. Only include opportunities DIRECTLY applicable to the prompt." +
    "It must be very specific to the prompt and tailored directly to it. Give me at least 10 distinct results. Structure the output as follows: I want an HTML list with each opportunity having the fields" +
    "\"Scholarship\" (Opportunity name), \"Why me?\" (Description of why I am a good fit and what Facets it addresses), \"How much?\" (Prize Amount), and \"Where?\" (URL). I just want the html do not include any other text before and after." +
    "The prompt is follows: ${financial_info}`);

    console.log('Application Received:', name, email, financial_info, output);

    // Send back HTML content
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    text-align: center;
                    background: #f0f0f0;
                }
                .container {
                    background: white;
                    border-radius: 10px;
                    padding: 20px;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                    font-size: 2.5em;
                }
                p {
                    color: #666;
                    font-size: 1.2em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Application Submitted Successfully!</h1>
                <p>Your output: ${output}</p>
            </div>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

