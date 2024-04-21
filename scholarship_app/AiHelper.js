const { openAiKey } = require("./creds");

async function OpenAIFetchAPI(prompt) {
  console.log("Connecting to Open Ai Chat Gpt 4...");
  var chatUrl = "https://api.openai.com/v1/chat/completions";
  var bearer = "Bearer " + openAiKey;
  try {
    const response = await fetch(chatUrl, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "user",
            content:
            "Take a prompt and give me a list and URLs to specific scholarships that would specifically give me access to opportunities." + 
            "I do not want any opportunity that are generalized to a big group of students and rather want opportunities as specific to the prompt as possible." +
            "Each opportunity should include a description of what that student specifically a good fit.  Facets include age, race, gender, location, future occupation, interests, and future plans." + 
            "Also, the complete list should have addressed at least each facet provided in the prompt. For example, if the student wants to study in Hawaii then at least one opportunity in that area and please write that out explicitly." +
            "If a student is from a certain area, you must provide at least one opportunity that is specific to that area and please write this our explicitly." +
            "Please be VERY specific as to which part of the prompt this opportunity addresses. If it is not in the prompt, absolutely do not include that opportunity. Only include opportunities DIRECTLY applicable to the prompt." +
            "It must be very specific to the prompt and tailored directly to it. Give me at least 10 distinct results. Structure the output as follows: I want an HTML list with each opportunity having the fields" +
            "\"Scholarship\" (Opportunity name), \"Why me?\" (Description of why I am a good fit and what Facets it addresses), \"How much?\" (Prize Amount), and \"Where?\" (URL). I just want the html do not include any other text before and after." +
            "The prompt is follows: "
              + prompt,
          },
        ],
        temperature: 0.5,
      }),
    });
    const data = response.json();
    const { message } = data.choices[0];
    console.log(data);
    console.log(message);
    return message;
  } catch (error) {
    console.log("Something bad happened " + error);
  }
}


module.exports = { OpenAIFetchAPI };

