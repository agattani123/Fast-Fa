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

// async function fetchOpenAI(url, payload) {
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer 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`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });
//     return response.json();
//   } catch (error) {
//     console.error("Error fetching from OpenAI:", error);
//     throw new Error("Failed to fetch from OpenAI API");
//   }
// }

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
    const output = await generateText(`"

    Making this prompt super simplistic. 
    Take a prompt and give me a list and URLs to specific scholarships that would specifically give me access to opportunities." + 
    "I do not want any opportunity that are generalized to a big group of students and rather want opportunities as specific to the prompt as possible." +
    "Each opportunity should include a description of what that student specifically a good fit.  Facets include age, race, gender, location, future occupation, interests, and future plans." + 
    "Also, the complete list should have addressed at least each facet provided in the prompt. For example, if the student wants to study in Hawaii then at least one opportunity in that area and please write that out explicitly." +
    "If a student is from a certain area, you must provide at least one opportunity that is specific to that area and please write this our explicitly." +
    "Please be VERY specific as to which part of the prompt this opportunity addresses. If it is not in the prompt, absolutely do not include that opportunity. Only include opportunities DIRECTLY applicable to the prompt." +
    "It must be very specific to the prompt and tailored directly to it. Give me at least 10 distinct results. Structure the output as follows: I want an HTML list with each opportunity having the fields" +
    "\"Scholarship\" (Opportunity name), \"Why me?\" (Description of why I am a good fit and what Facets it addresses), \"How much?\" (Prize Amount), and \"Deadline\" (around when should you apply by), and \"APPLY\" (a URL of where to apply, have the link hyperlinked to APPLY and not in front of a colon). I just want the html do not include any other text before and after (include any quotation marks, i just want the html)" +
    
    
    "The prompt is follows: ${financial_info}`);

    console.log('Application Received:', firstName, lastName, financial_info, output);
// Replace "APPLY" with a button
const modifiedOutput = output.replace(/APPLY/g, `<button class="apply-btn">Apply</button>`);

res.send(`
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(-45deg, #3d7ec7, #7f91a9, #4b7c86, #ecf0ef);
            background-size: 400% 400%;
            margin: 0
            padding: 0
            animation: gradient 10s ease infinite;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333;
            padding-top: 400px;  /* Increase top padding */
        }
        .container {
            background: white;
            border-radius: 8px;
            padding: 20px;
            max-width: 600px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            text-align: center;
            margin-top: 400px;  /* Additional top margin can also help */
        }
        h1 {
            color: #5b3c88;
            font-size: 2.5em;
        }
        ul.scholarship-list {
            list-style-type: none;
            padding: 0;
        }
        .scholarship-list li {
            list-style-type: none;
            background: #f8f8f8;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            color: midnightblue;
            opacity: 0.75;
        }
        .apply-btn {
            width: auto;
            padding: 10px 20px;
            background-color: #5b3c88;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        .apply-btn:hover {
            background-color: rgb(25, 25, 112);
            transform: scale(1.05);
        }
        .button-nav:hover {
          background-color: rgb(25, 25, 112);
          transform: scale(1.05);
      }
        .button-nav {
            position: fixed; /* Fixed position relative to the viewport */
            padding: 10px 20px;
            background-color: rgb(46, 99, 122);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            text-align: center;
        }
        .home-button {
            left: 20px; /* Position from the left side */
            bottom: 20px;
        }
        .feedback-button {
            right: 20px; /* Position from the right side */
            top: 20px;
        }
        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    </style>
</head>
<body>
    <button class="button-nav home-button" onclick="location.href='index.html';">Home</button>
    <button class="button-nav feedback-button" onclick="window.open('https://forms.gle/2KvT9ztjWGgbKuGX9', '_blank');">Feedback</button>
    <div class="container">
        <h1>we got you, ${firstName} :)</h1>
        <ul class="scholarship-list">${modifiedOutput}</ul>
    </div>
</body>
</html>
`);

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


