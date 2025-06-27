## Inspiration

We built FastFa!—because FAFSA, but fast (and not soul-crushing). The idea came from how absurdly painful it is to find and apply for scholarships. Between the clunky forms, random document uploads, and niche scholarships hidden in internet corners, it felt like applying for money cost more time than it saved.

FastFa! is a web app that uses generative AI to make that process suck less. You put in some info, and it spits out a list of scholarships tailored to your background, interests, and financial situation—no hours of Reddit scrolling required. We even pulled in obscure, local scholarships that most people would never find.

We ended up winning the hackathon, which was great, but honestly, the real win was not having to touch the actual FAFSA form.

## What it does

FastFa! is a web application that uses AI to generate a list of specific scholarships based on a student's personal information and financial needs. It takes the user's input, processes it through OpenAI's GPT-4 model, and returns a list of scholarships that are tailored to the user's specific circumstances. It then has a secured payment method utilizing Starknet which allows students to receive these scholarships directly from the institutions. 

## How we built it

FastFa! is built using JavaScript, with Node.js and Express.js for the backend. We used the fetch API to make requests to the OpenAI API, and the responses are processed and displayed on the frontend. The frontend is built with HTML, CSS, and JavaScript. The payment method is built through Startknet, and our feedback responses are stored within the Kinstone database system.

## Challenges we ran into

One of the main challenges we faced was integrating the OpenAI API and ensuring that the responses were accurate and relevant. We also had to ensure that the application was user-friendly and intuitive, which required careful design and planning. 

## Accomplishments that we're proud of

We're proud of creating a tool that can potentially help many students find scholarships that they may not have been aware of. We're also proud of the AI integration, which allows for a high degree of personalization and accuracy in the results. Also, the beautiful UI gradient and feedback page integrated with the KinTone backend were extra features that we are happy we added.

## What we learned

Through this project, we learned more about working with AI and how tailoring it to certain use cases such as education can be extremely beneficial for society. We also learned about the complexities of financial aid and scholarship applications, and how technology can be used to simplify these processes.

## What's next for FastFa!


In the future, we plan to expand FastFa! to include more features, such as a more detailed breakdown of each scholarship and a feature that allows users to track their applications. We also plan to improve the AI model to ensure more accurate and personalized results.

## Prizes

Category Winner at Hack Dartmouth 2024 for Best Use of Kintone

## Devpost

[Devpost Link](https://devpost.com/software/fastfa)

## Note:
All API Keys shown do not work and have been deactivated.
