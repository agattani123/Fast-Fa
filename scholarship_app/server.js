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

app.post('/submit-application', async (req, res) => {
    const { firstName, lastName, financial_info } = req.body;

    // Use the financial_info as the prompt for the generateText function
    const output = await generateText(`"Take a prompt and give me a list and URLs to specific scholarships that would specifically give me access to opportunities." + 
    "I do not want any opportunity that are generalized to a big group of students and rather want opportunities as specific to the prompt as possible." +
    "Each opportunity should include a description of what that student specifically a good fit.  Facets include age, race, gender, location, future occupation, interests, and future plans." + 
    "Also, the complete list should have addressed at least each facet provided in the prompt. For example, if the student wants to study in Hawaii then at least one opportunity in that area and please write that out explicitly." +
    "If a student is from a certain area, you must provide at least one opportunity that is specific to that area and please write this our explicitly." +
    "Please be VERY specific as to which part of the prompt this opportunity addresses. If it is not in the prompt, absolutely do not include that opportunity. Only include opportunities DIRECTLY applicable to the prompt." +
    "It must be very specific to the prompt and tailored directly to it. Give me at least 10 distinct results. Structure the output as follows: I want an HTML list with each opportunity having the fields" +
    "\"Scholarship\" (Opportunity name), \"Why me?\" (Description of why I am a good fit and what Facets it addresses), \"How much?\" (Prize Amount), and \"Deadline\" (around when should you apply by), and \"APPLY\" (a URL of where to apply). I just want the html do not include any other text before and after (include any quotation marks, i just want the html)" +
    "The prompt is follows: ${financial_info}`);

    console.log('Application Received:', firstName, lastName, financial_info, output);

    // Send back HTML content
    res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Scholarship Application Results</title>
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
          ul.scholarship-list {
              list-style-type: none; /* Ensures no bullet points are shown */
              padding: 0;
              margin: 0;
          }
          .scholarship-list li {
              list-style-type: none;
              background: #f8f8f8;
              margin: 10px 0;
              padding: 15px;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
              transition: transform 0.2s ease-in-out;
          }
          .scholarship-list li:hover {
              transform: scale(1.03); /* Slight scale effect on hover */
              box-shadow: 0 4px 8px rgba(0,0,0,0.15);
          }
          button.apply-btn {
              padding: 8px 16px;
              background-color: #4CAF50; /* Green background */
              color: white; /* White text color */
              border: none;
              border-radius: 5px;
              cursor: pointer;
              text-decoration: none;
              font-size: 16px;
          }
          button.apply-btn:hover {
              background-color: #45a049; /* Darker green background on hover */
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>We got you, ${firstName} :)</h1>
          <ul class="scholarship-list">${output}</ul>
      </div>
  </body>
  </html>
`);
  

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


