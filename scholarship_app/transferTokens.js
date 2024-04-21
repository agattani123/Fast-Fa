const { Contract, Provider, defaultProvider } = require('starknet');

// Configuration
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS_HERE';  // Replace with your contract's address
const ABI_PATH = './path_to_your_ABI.json';  // Path to your contract's ABI

// Provider setup
const provider = new Provider({ sequencer: { network: 'goerli-alpha' } });

// Main function to transfer tokens
async function transferTokens(senderPrivateKey, senderAddress, recipientAddress, amount) {
  try {
    // Load contract
    const abi = require(ABI_PATH);
    const contract = new Contract(abi, CONTRACT_ADDRESS, provider);

    // Connect sender account
    const senderAccount = new Contract(abi, CONTRACT_ADDRESS, {
      address: senderAddress,
      privateKey: senderPrivateKey,
      provider
    });

    // Call the transfer method
    const { transaction_hash } = await senderAccount.invoke('transfer', [recipientAddress, amount]);
    console.log(`Transfer initiated. Transaction hash: ${transaction_hash}`);

    // Wait for the transaction to be confirmed
    await provider.waitForTransaction(transaction_hash);
    console.log('Transfer completed successfully.');

  } catch (error) {
    console.error('Failed to transfer tokens:', error);
  }
}

// Example usage
const senderPrivateKey = 'SCHOLARSHIP_PRIVATE_KEY';
const senderAddress = 'SCHOLARSHIP_ADDRESS';
const recipientAddress = 'STUDENT_ADDRESS';
const amount = '100';  // Amount of tokens to transfer

transferTokens(senderPrivateKey, senderAddress, recipientAddress, amount);
