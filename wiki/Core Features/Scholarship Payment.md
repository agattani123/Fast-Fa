<details>
<summary>Relevant source files</summary>

The following files were used as context for generating this wiki page:

- [scholarship_app/transferTokens.js](https://github.com/agattani123/Fast-Fa/blob/master/scholarship_app/transferTokens.js)

</details>

# Scholarship Payment

## Introduction

The "Scholarship Payment" feature is a crucial component of the project, facilitating the transfer of tokens from a designated scholarship address to student recipients. This functionality enables the seamless distribution of scholarship funds, ensuring that eligible students receive their entitled token amounts. The feature leverages the Google Gemini API, a text generation service, to generate the text content for the token transfers.

## Architecture Overview

The "Scholarship Payment" feature is implemented within the `transferTokens.js` file, which serves as the main entry point for initiating text generation and token transfers. The file imports the necessary dependencies, including the `fetch` library, which provides the core functionality for interacting with the Google Gemini API.

## Configuration

The feature relies on several configuration settings defined at the beginning of the `transferTokens.js` file:

```javascript
const API_ENDPOINT = 'https://google.gemini.com/v1/chat/completions';
const MODEL = 'gemini';
```

1. `API_ENDPOINT`: This constant holds the URL of the Google Gemini API endpoint for text generation.

2. `MODEL`: This constant specifies the name of the text generation model to be used by the Google Gemini API.

Sources: [scholarship_app/transferTokens.js:3-4]()

## API Setup

```javascript
const provider = new Provider({ sequencer: { network: 'goerli-alpha' } });
```

The code creates a new instance of the `Provider` class from the `starknet` library, which acts as a gateway to the StarkNet network. The `goerli-alpha` network is specified as the target network for the provider.

Sources: [scholarship_app/transferTokens.js:9]()

## Text Generation Function

The core functionality of the "Scholarship Payment" feature is encapsulated within the `fetchFromOpenAI` async function:

```javascript
async function fetchFromOpenAI(prompt) {
  const payload = {
    model: MODEL,
    messages: [{ role: 'user', content: prompt }]
  };

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
```

This function takes the following parameter:

- `prompt`: The prompt or input text for which the text generation should be performed.

The function constructs a payload object with the specified `MODEL` and the user's `prompt` as the input message. It then sends a POST request to the `API_ENDPOINT` with the payload in the request body. The response from the API is parsed, and the generated text content is returned.

Sources: [scholarship_app/transferTokens.js:11-24]()

## Token Transfer Function

The "Scholarship Payment" feature also includes the `transferTokens` async function, which remains unchanged from the previous version:

```javascript
async function transferTokens(senderPrivateKey, senderAddress, recipientAddress, amount) {
  // ...
}
```

This function takes the following parameters:

- `senderPrivateKey`: The private key of the scholarship address, used for authentication and signing transactions.
- `senderAddress`: The address of the scholarship account from which tokens will be transferred.
- `recipientAddress`: The address of the student recipient to whom tokens will be sent.
- `amount`: The amount of tokens to be transferred.

The function loads the contract, connects the sender account, invokes the `transfer` method on the contract, and waits for the transaction to be confirmed.

Sources: [scholarship_app/transferTokens.js:26-45]()

## Example Usage

The example usage section at the end of the file demonstrates how to call the `transferTokens` function with the required parameters:

```javascript
const senderPrivateKey = 'SCHOLARSHIP_PRIVATE_KEY';
const senderAddress = 'SCHOLARSHIP_ADDRESS';
const recipientAddress = 'STUDENT_ADDRESS';
const amount = '100';  // Amount of tokens to transfer

transferTokens(senderPrivateKey, senderAddress, recipientAddress, amount);
```

In this example, the `transferTokens` function is called with a `senderPrivateKey`, `senderAddress`, `recipientAddress`, and `amount` of tokens to be transferred.

Sources: [scholarship_app/transferTokens.js:47-51]()